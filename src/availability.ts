import { BLOQUEO, SALON_CERRADO, type SlotRow } from "./supabase";

/** Reservas de terraza (o sin zona) que caben en cada hora. */
export const TERRAZA_POR_HORA = 3;
/** Reservas de salon que caben en cada servicio (comida o cena) de un dia. */
export const SALON_POR_SERVICIO = 2;

export type Servicio = "comida" | "cena";

/** Comida hasta las 16:59, cena desde las 17:00. */
export const servicioDe = (time: string): Servicio => (time < "17:00" ? "comida" : "cena");

/**
 * Hora con la que se guarda el cierre del salon (fila con name = SALON_CERRADO):
 *  - "00:00": dia completo (cierres antiguos, anteriores a poder cerrar por servicio).
 *  - "00:01": solo la comida.
 *  - "23:59": solo la cena.
 */
export const CIERRE_DIA = "00:00";
export const CIERRE_COMIDA = "00:01";
export const CIERRE_CENA = "23:59";

/** True si el panel ha cerrado el salon en ese servicio (o el dia completo). */
export function salonCerradoEn(rows: SlotRow[], servicio: Servicio): boolean {
  return rows.some((r) => r.name === SALON_CERRADO && (r.time === CIERRE_DIA || servicioDe(r.time) === servicio));
}

export type Disponibilidad = {
  terrazaCount: number;
  salonCount: number;
  /** El salon esta cerrado en el servicio de esa hora (comida o cena). */
  salonCerrado: boolean;
  horaCerrada: boolean;
  terrazaLibre: boolean;
  salonLibre: boolean;
  motivoSalon: "cerrado" | "completo" | null;
};

/** Calcula que zonas se pueden reservar a una hora, dadas las filas de ese dia. */
export function disponibilidad(rows: SlotRow[], time: string): Disponibilidad {
  const salonCerrado = salonCerradoEn(rows, servicioDe(time));
  const horaCerrada = rows.some((r) => r.time === time && r.name === BLOQUEO);
  const terrazaCount = rows.filter((r) => r.time === time && r.zone !== "salon").length;
  const salonCount = rows.filter(
    (r) => r.zone === "salon" && r.name !== SALON_CERRADO && servicioDe(r.time) === servicioDe(time)
  ).length;

  const terrazaLibre = !horaCerrada && terrazaCount < TERRAZA_POR_HORA;
  const salonLibre = !horaCerrada && !salonCerrado && salonCount < SALON_POR_SERVICIO;
  const motivoSalon = salonCerrado ? "cerrado" : salonCount >= SALON_POR_SERVICIO ? "completo" : null;

  return { terrazaCount, salonCount, salonCerrado, horaCerrada, terrazaLibre, salonLibre, motivoSalon };
}
