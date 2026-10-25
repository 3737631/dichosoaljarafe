import { BLOQUEO, SALON_CERRADO, type SlotRow } from "./supabase";

/** Reservas de terraza (o sin zona) que caben en cada hora. */
export const TERRAZA_POR_HORA = 3;
/** Reservas de salon que caben en cada servicio (comida o cena) de un dia. */
export const SALON_POR_SERVICIO = 2;

export type Servicio = "comida" | "cena";

/** Comida hasta las 16:59, cena desde las 17:00. */
export const servicioDe = (time: string): Servicio => (time < "17:00" ? "comida" : "cena");

export type Disponibilidad = {
  terrazaCount: number;
  salonCount: number;
  salonCerradoDia: boolean;
  horaCerrada: boolean;
  terrazaLibre: boolean;
  salonLibre: boolean;
  motivoSalon: "cerrado" | "completo" | null;
};

/** Calcula que zonas se pueden reservar a una hora, dadas las filas de ese dia. */
export function disponibilidad(rows: SlotRow[], time: string): Disponibilidad {
  const salonCerradoDia = rows.some((r) => r.name === SALON_CERRADO);
  const horaCerrada = rows.some((r) => r.time === time && r.name === BLOQUEO);
  const terrazaCount = rows.filter((r) => r.time === time && r.zone !== "salon").length;
  const salonCount = rows.filter(
    (r) => r.zone === "salon" && r.name !== SALON_CERRADO && servicioDe(r.time) === servicioDe(time)
  ).length;

  const terrazaLibre = !horaCerrada && terrazaCount < TERRAZA_POR_HORA;
  const salonLibre = !horaCerrada && !salonCerradoDia && salonCount < SALON_POR_SERVICIO;
  const motivoSalon = salonCerradoDia ? "cerrado" : salonCount >= SALON_POR_SERVICIO ? "completo" : null;

  return { terrazaCount, salonCount, salonCerradoDia, horaCerrada, terrazaLibre, salonLibre, motivoSalon };
}
