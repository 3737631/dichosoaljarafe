import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://lfnenhsijsvysmluvllx.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_WuLU41ncfLY_sp48UtV4LA_O0hQ-qUp";
const KVDB_BUCKET = "dichoso-aljarafe-reservas-2025";
const KVDB_BASE = `https://kvdb.io/${KVDB_BUCKET}`;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type Zone = "terraza" | "salon";

export type SlotRow = { time: string; zone: Zone | null; name: string | null };

export type InsertResult = { ok: boolean; reason?: "SALON_COMPLETO" | "SALON_CERRADO" | "ERROR" };

export const SALON_CERRADO = "__SALON_CERRADO__";
export const BLOQUEO = "__BLOQUEO__";

async function fetchSlotsKVDB(date: string): Promise<SlotRow[] | null> {
  const times = await fetchTimesKVDB(date);
  return times === null ? null : times.map((time) => ({ time, zone: null, name: null }));
}

async function fetchTimesKVDB(date: string): Promise<string[] | null> {
  try {
    const bust = Date.now();
    const res = await fetch(`${KVDB_BASE}/slots_${date}?_=${bust}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
    });
    if (res.status === 404) return [];
    if (!res.ok) {
      console.warn("fetchSlots KVDB failed", res.status, await res.text());
      return null;
    }
    const text = await res.text();
    if (!text) return [];
    try {
      const data = JSON.parse(text);
      return Array.isArray(data) ? data.filter(Boolean) : [];
    } catch {
      return [];
    }
  } catch (e) {
    console.warn("fetchSlots KVDB exception", e);
    return null;
  }
}

async function fetchSlotsSupabase(date: string): Promise<SlotRow[] | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/slots?select=time,zone,name&date=eq.${encodeURIComponent(date)}`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Accept: "application/json",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        cache: "no-store",
      }
    );
    if (!res.ok) {
      const txt = await res.text();
      console.warn("fetchSlots Supabase failed", res.status, txt);
      return null;
    }
    const data = await res.json();
    if (!Array.isArray(data)) {
      console.warn("fetchSlots unexpected data", data);
      return null;
    }
    return data
      .filter((r: any) => r && r.time)
      .map((r: any) => ({ time: r.time, zone: r.zone === "salon" || r.zone === "terraza" ? r.zone : null, name: r.name ?? null }));
  } catch (e) {
    console.warn("fetchSlots Supabase exception", e);
    return null;
  }
}

async function fetchSlots(date: string): Promise<SlotRow[] | null> {
  const sb = await fetchSlotsSupabase(date);
  if (sb !== null) return sb;
  return fetchSlotsKVDB(date);
}

type NewSlot = { date: string; time: string; name: string; phone: string; persons: string; note: string; zone: Zone };

async function insertSlotKVDB(row: NewSlot) {
  try {
    const current = (await fetchTimesKVDB(row.date)) || [];
    if (current.includes(row.time)) return true;
    const updated = [...current, row.time];
    const res = await fetch(`${KVDB_BASE}/slots_${row.date}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (!res.ok) {
      console.warn("insertSlot KVDB failed", res.status, await res.text());
      return false;
    }
    console.log("insertSlot KVDB success", row.date, row.time);
    return true;
  } catch (e) {
    console.warn("insertSlot KVDB exception", e);
    return false;
  }
}

async function insertSlotSupabase(row: NewSlot): Promise<InsertResult> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/slots`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ ...row, created_at: new Date().toISOString() }),
    });
    if (!res.ok) {
      const txt = await res.text();
      console.warn("insertSlot Supabase failed", res.status, txt);
      if (txt.includes("SALON_COMPLETO")) return { ok: false, reason: "SALON_COMPLETO" };
      if (txt.includes("SALON_CERRADO")) return { ok: false, reason: "SALON_CERRADO" };
      return { ok: false, reason: "ERROR" };
    }
    console.log("insertSlot Supabase success", row.date, row.time);
    return { ok: true };
  } catch (e) {
    console.warn("insertSlot Supabase exception", e);
    return { ok: false, reason: "ERROR" };
  }
}

async function insertSlot(row: NewSlot): Promise<InsertResult> {
  const result = await insertSlotSupabase(row);
  // La copia de respaldo solo guarda horas, sin zona: el salon no se copia para no inflar la terraza.
  if (row.zone !== "salon") insertSlotKVDB(row).catch(() => {});
  return result;
}

function subscribeSlots(date: string, callback: (rows: SlotRow[]) => void) {
  const channel = supabaseClient
    .channel(`slots-${date}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "slots", filter: `date=eq.${date}` }, async () => {
      const rows = await fetchSlots(date);
      if (rows !== null) callback(rows);
    })
    .subscribe();
  return () => {
    supabaseClient.removeChannel(channel);
  };
}

export const supabase = { fetchSlots, insertSlot, subscribeSlots };
