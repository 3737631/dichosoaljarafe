-- Dichoso: zonas Salon / Terraza en las reservas.
--
-- ORDEN DE DESPLIEGUE: aplicar este SQL ANTES de publicar la web y el panel nuevos.
-- Es compatible hacia atras: la columna nueva admite NULL, asi que la web y el panel
-- actuales (sin zona) siguen funcionando igual tras aplicarlo.
--
-- Reglas:
--  * zone = 'terraza' | 'salon' | NULL (reservas antiguas, cuentan como terraza).
--  * Salon: maximo 2 reservas por servicio y dia (comida = antes de las 17:00, cena = desde las 17:00).
--  * El dueño puede cerrar el salon de un dia entero con una fila especial
--    (name = '__SALON_CERRADO__', zone = 'salon', time = '00:00'). Esa fila no es una reserva.
--  * Terraza: se mantienen las 3 reservas por hora que ya existian (lo controla la web/panel).
--  * No se toca ninguna reserva existente.

begin;

alter table public.slots add column if not exists zone text;

alter table public.slots drop constraint if exists slots_zone_check;
alter table public.slots
  add constraint slots_zone_check check (zone is null or zone in ('terraza', 'salon'));

-- Solo puede haber una fila de "salon cerrado" por dia.
create unique index if not exists slots_salon_cerrado_uq
  on public.slots (date)
  where name = '__SALON_CERRADO__';

create index if not exists slots_date_zone_idx on public.slots (date, zone);

-- Limite del salon en el servidor: evita pasarse aunque dos personas reserven a la vez.
create or replace function public.slots_enforce_salon()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_service text;
  v_count   int;
begin
  -- Solo afecta a reservas de salon; la fila de cierre no es una reserva.
  if new.zone is distinct from 'salon' or new.name = '__SALON_CERRADO__' then
    return new;
  end if;

  v_service := case when new.time < '17:00' then 'comida' else 'cena' end;

  -- Al editar datos sin cambiar dia, servicio ni zona (nombre, telefono...), no se vuelve a comprobar.
  if tg_op = 'UPDATE'
     and old.date = new.date
     and old.zone is not distinct from new.zone
     and (case when old.time < '17:00' then 'comida' else 'cena' end) = v_service then
    return new;
  end if;

  -- Serializa las reservas de salon del mismo dia y servicio.
  perform pg_advisory_xact_lock(hashtext(new.date || '|' || v_service));

  if exists (
    select 1 from public.slots
    where date = new.date and zone = 'salon' and name = '__SALON_CERRADO__'
  ) then
    raise exception 'SALON_CERRADO';
  end if;

  select count(*) into v_count
  from public.slots
  where date = new.date
    and zone = 'salon'
    and name is distinct from '__SALON_CERRADO__'
    and (case when time < '17:00' then 'comida' else 'cena' end) = v_service
    and id is distinct from new.id;

  if v_count >= 2 then
    raise exception 'SALON_COMPLETO';
  end if;

  return new;
end;
$$;

drop trigger if exists slots_enforce_salon on public.slots;
create trigger slots_enforce_salon
  before insert or update on public.slots
  for each row execute function public.slots_enforce_salon();

commit;

-- ---------------------------------------------------------------------------
-- DESHACER (solo si hiciera falta; no borra ninguna reserva, solo la zona):
--   drop trigger if exists slots_enforce_salon on public.slots;
--   drop function if exists public.slots_enforce_salon();
--   drop index if exists public.slots_salon_cerrado_uq;
--   drop index if exists public.slots_date_zone_idx;
--   alter table public.slots drop constraint if exists slots_zone_check;
--   alter table public.slots drop column if exists zone;
-- ---------------------------------------------------------------------------
