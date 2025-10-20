import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // dev-time guard
  // eslint-disable-next-line no-console
  console.warn("Supabase ENV missing. Check .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
