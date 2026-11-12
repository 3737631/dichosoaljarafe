-- Dichoso: aviso automatico por Telegram cuando entra una reserva nueva.
--
-- ESTADO: preparado, NO aplicado. Ver sql/LEEME-aviso-telegram.md para el orden de despliegue.
--
-- Como funciona:
--  * Al insertarse una fila en public.slots, un disparador manda un mensaje al Telegram del dueño
--    usando pg_net (peticion HTTP asincrona: no frena ni puede romper la reserva).
--  * El token del bot y el chat del dueño NO estan en este archivo ni en el codigo: viven en el
--    almacen de secretos de Supabase (vault), con los nombres 'telegram_bot_token' y 'telegram_chat_id'.
--  * Si faltan los secretos, o Telegram falla, la reserva se guarda igual y simplemente no hay aviso.
--  * No avisa de: horas cerradas (__BLOQUEO__), cierres de salon (__SALON_CERRADO__), reservas que el
--    propio panel marca con origen = 'panel' (las que el dueño apunta por telefono) ni fechas de prueba
--    (año 2090 en adelante).
--  * Es aditivo: añade una columna que admite NULL, funciones y un disparador AFTER INSERT. No cambia
--    ninguna reserva ni los disparadores actuales, y la web y el panel actuales siguen funcionando igual.

begin;

create extension if not exists pg_net;

-- 'panel' = reserva apuntada desde el panel (no genera aviso). La web no envia nada (NULL) y si avisa.
alter table public.slots add column if not exists origen text;
alter table public.slots drop constraint if exists slots_origen_check;
alter table public.slots
  add constraint slots_origen_check check (origen is null or origen in ('web', 'panel'));

-- Escapa los caracteres especiales para que un nombre como "<b>" no rompa el mensaje de Telegram.
create or replace function public.slots_html(t text)
returns text
language sql
immutable
set search_path = public
as $$
  select replace(replace(replace(coalesce(t, ''), '&', '&amp;'), '<', '&lt;'), '>', '&gt;')
$$;

-- Texto del aviso. Funcion aparte para poder probarla sin enviar nada.
create or replace function public.slots_telegram_texto(s public.slots)
returns text
language sql
stable
set search_path = public
as $$
  select
    '🆕 <b>Nueva reserva</b>' || E'\n' ||
    '📅 ' || (array['domingo','lunes','martes','miércoles','jueves','viernes','sábado'])[extract(dow from s.date::date)::int + 1]
          || ' ' || to_char(s.date::date, 'DD/MM/YYYY') || ' · <b>' || public.slots_html(s.time) || '</b>' || E'\n' ||
    '📍 ' || case when s.zone = 'salon' then 'Salón' else 'Terraza' end || E'\n' ||
    '👥 ' || public.slots_html(s.persons) || case when s.persons = '1' then ' persona' else ' personas' end || E'\n' ||
    '👤 ' || public.slots_html(s.name) || E'\n' ||
    '📞 ' || public.slots_html(s.phone) ||
    case when btrim(coalesce(s.note, '')) <> '' then E'\n' || '📝 ' || public.slots_html(s.note) else '' end
$$;

create or replace function public.slots_notify_telegram()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, net, vault
as $$
declare
  v_token text;
  v_chat  text;
begin
  -- Pase lo que pase aqui dentro, la reserva se guarda: cualquier error se convierte en aviso en el log.
  begin
    if new.name in ('__BLOQUEO__', '__SALON_CERRADO__')
       or new.origen = 'panel'
       or new.date >= '2090-01-01' then
      return new;
    end if;

    select decrypted_secret into v_token from vault.decrypted_secrets where name = 'telegram_bot_token' limit 1;
    select decrypted_secret into v_chat  from vault.decrypted_secrets where name = 'telegram_chat_id'   limit 1;

    if coalesce(v_token, '') = '' or coalesce(v_chat, '') = '' then
      return new; -- avisos aun sin configurar
    end if;

    perform net.http_post(
      url     := 'https://api.telegram.org/bot' || v_token || '/sendMessage',
      body    := jsonb_build_object(
                   'chat_id', v_chat,
                   'text', public.slots_telegram_texto(new),
                   'parse_mode', 'HTML',
                   'disable_web_page_preview', true),
      headers := '{"Content-Type": "application/json"}'::jsonb,
      timeout_milliseconds := 5000
    );
  exception when others then
    raise warning 'slots_notify_telegram: %', sqlerrm;
  end;

  return new;
end;
$$;

-- Nadie desde fuera necesita llamar a estas funciones.
revoke all on function public.slots_notify_telegram() from public, anon, authenticated;
revoke all on function public.slots_telegram_texto(public.slots) from public, anon, authenticated;
revoke all on function public.slots_html(text) from public, anon, authenticated;

drop trigger if exists slots_notify_telegram on public.slots;
create trigger slots_notify_telegram
  after insert on public.slots
  for each row execute function public.slots_notify_telegram();

commit;

-- ---------------------------------------------------------------------------
-- DESHACER (deja de avisar; no toca ninguna reserva):
--   drop trigger if exists slots_notify_telegram on public.slots;
--   drop function if exists public.slots_notify_telegram();
--   drop function if exists public.slots_telegram_texto(public.slots);
--   drop function if exists public.slots_html(text);
--   alter table public.slots drop constraint if exists slots_origen_check;
--   alter table public.slots drop column if exists origen;
--   -- opcional: borrar los secretos
--   delete from vault.secrets where name in ('telegram_bot_token', 'telegram_chat_id');
-- ---------------------------------------------------------------------------
