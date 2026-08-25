import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://lfnenhsijsvysmluvllx.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_WuLU41ncfLY_sp48UtV4LA_O0hQ-qUp";
const KVDB_BUCKET = "dichoso-aljarafe-reservas-2025";
const KVDB_BASE = `https://kvdb.io/${KVDB_BUCKET}`;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fetchSlotsKVDB(date: string): Promise<string[] | null> {
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

async function fetchSlotsSupabase(date: string): Promise<string[] | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/slots?select=time&date=eq.${encodeURIComponent(date)}`,
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
    return data.map((r: any) => r.time).filter(Boolean);
  } catch (e) {
    console.warn("fetchSlots Supabase exception", e);
    return null;
  }
}

async function fetchSlots(date: string): Promise<string[] | null> {
  const sb = await fetchSlotsSupabase(date);
  if (sb !== null) return sb;
  return fetchSlotsKVDB(date);
}

async function insertSlotKVDB(row: { date: string; time: string; name: string; phone: string; persons: string; note: string }) {
  try {
    const current = (await fetchSlotsKVDB(row.date)) || [];
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

async function insertSlotSupabase(row: { date: string; time: string; name: string; phone: string; persons: string; note: string }) {
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
      return false;
    }
    console.log("insertSlot Supabase success", row.date, row.time);
    return true;
  } catch (e) {
    console.warn("insertSlot Supabase exception", e);
    return false;
  }
}

async function insertSlot(row: { date: string; time: string; name: string; phone: string; persons: string; note: string }) {
  const sbOk = await insertSlotSupabase(row);
  insertSlotKVDB(row).catch(() => {});
  return sbOk;
}

function subscribeSlots(date: string, callback: (times: string[]) => void) {
  const channel = supabaseClient
    .channel(`slots-${date}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "slots", filter: `date=eq.${date}` }, async () => {
      const times = await fetchSlots(date);
      if (times !== null) callback(times);
    })
    .subscribe();
  return () => {
    supabaseClient.removeChannel(channel);
  };
}

export const supabase = { fetchSlots, insertSlot, subscribeSlots };
