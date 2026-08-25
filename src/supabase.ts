const SUPABASE_URL = "https://xdcqzrpjnhnezeezqgxo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_UfYMnymwWZ0l9sX9slMzYg_ufGhVXWA";
const KVDB_BUCKET = "dichoso-aljarafe-reservas-2025";
const KVDB_BASE = `https://kvdb.io/${KVDB_BUCKET}`;

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
    const bust = Date.now();
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/slots?select=time&date=eq.${encodeURIComponent(date)}&_=${bust}`,
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
  // Try KVDB first (works cross-device, DNS OK), fallback to Supabase
  const kv = await fetchSlotsKVDB(date);
  if (kv !== null) return kv;
  return fetchSlotsSupabase(date);
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
  const kvOk = await insertSlotKVDB(row);
  // Also try Supabase as secondary, don't block on it
  insertSlotSupabase(row).catch(() => {});
  return kvOk;
}

export const supabase = { fetchSlots, insertSlot };
