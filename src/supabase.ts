const SUPABASE_URL = "https://xdcqzrpjnhnezeezqgxo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_UfYMnymwWZ0l9sX9slMzYg_ufGhVXWA";

async function fetchSlots(date: string): Promise<string[] | null> {
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
      console.warn("fetchSlots failed", res.status, txt);
      return null;
    }
    const data = await res.json();
    if (!Array.isArray(data)) {
      console.warn("fetchSlots unexpected data", data);
      return null;
    }
    return data.map((r: any) => r.time).filter(Boolean);
  } catch (e) {
    console.warn("fetchSlots exception", e);
    return null;
  }
}

async function insertSlot(row: {
  date: string;
  time: string;
  name: string;
  phone: string;
  persons: string;
  note: string;
}) {
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
      console.warn("insertSlot failed", res.status, txt);
      // Throw to let caller know it failed, so it can retry or show error
      // But for now just log
    } else {
      console.log("insertSlot success", row.date, row.time);
    }
  } catch (e) {
    console.warn("insertSlot exception", e);
  }
}

export const supabase = { fetchSlots, insertSlot };
