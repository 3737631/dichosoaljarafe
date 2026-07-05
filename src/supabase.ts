const SUPABASE_URL = "https://xdcqzrpjnhnezeezqgxo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_UfYMnymwWZ0l9sX9slMzYg_ufGhVXWA";

async function fetchSlots(date: string): Promise<string[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/slots?select=time&date=eq.${encodeURIComponent(date)}`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Accept: "application/json",
        },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data || []).map((r: any) => r.time);
  } catch {
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
    await fetch(`${SUPABASE_URL}/rest/v1/slots`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...row, created_at: new Date().toISOString() }),
    });
  } catch {
    // silent
  }
}

export const supabase = { fetchSlots, insertSlot };
