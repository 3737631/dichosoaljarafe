const SUPABASE_URL = "https://xdcqzrpjnhnezeezqgxo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_UfYMnymwWZ0l9sX9slMzYg_ufGhVXWA";

async function fetchSlots(date: string): Promise<string[]> {
  try {
    // Cache busting to ensure fresh data across devices
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
      console.warn("fetchSlots not ok", res.status, await res.text());
      return [];
    }
    const data = await res.json();
    return (data || []).map((r: any) => r.time);
  } catch (e) {
    console.warn("fetchSlots error", e);
    return [];
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
      console.warn("insertSlot not ok", res.status, txt);
      // If conflict (409) it means already booked, which is fine
    }
  } catch (e) {
    console.warn("insertSlot error", e);
  }
}

export const supabase = { fetchSlots, insertSlot };
