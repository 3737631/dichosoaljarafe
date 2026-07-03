import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xdcqzrpjnhnezeezqgxo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_UfYMnymwWZ0l9sX9slMzYg_ufGhVXWA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
