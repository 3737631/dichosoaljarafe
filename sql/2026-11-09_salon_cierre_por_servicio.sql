-- Dichoso: cerrar el salon por servicio (comida / cena) en vez de solo el dia completo.
--
-- Va DESPUES de 2026-10-25_salon_terraza.sql. Aplicar ANTES de publicar la web y el panel nuevos.
--
-- La fila de cierre (name = '__SALON_CERRADO__', zone = 'salon') ahora usa su hora para saber que cierra:
--   time = '00:00'  -> dia completo (los cierres que ya existen; siguen funcionando igual)
--   time = '00:01'  -> solo la comida
--   time = '23:59'  -> solo la cena
--
-- No toca ninguna reserva ni ningun cierre existente.

begin;

-- Antes solo podia haber un cierre por dia; ahora puede haber uno por servicio.
drop index if exists public.slots_salon_cerrado_uq;
create unique index if not exists slots_salon_cerrado_uq
  on public.slots (date, time)
  where name = '__SALON_CERRADO__';

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

  -- Cerrado ese servicio, o el dia completo ('00:00').
  if exists (
    select 1 from public.slots
    where date = new.date
      and zone = 'salon'
      and name = '__SALON_CERRADO__'
      and (time = '00:00' or (case when time < '17:00' then 'comida' else 'cena' end) = v_service)
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

commit;

-- ---------------------------------------------------------------------------
-- DESHACER (vuelve al comportamiento anterior: un cierre por dia):
--   -- 1) quita antes los cierres por servicio, si los hubiera:
--   --    delete from public.slots where name = '__SALON_CERRADO__' and time in ('00:01', '23:59');
--   -- 2) restaura el indice y la funcion de 2026-10-25_salon_terraza.sql.
-- ---------------------------------------------------------------------------
