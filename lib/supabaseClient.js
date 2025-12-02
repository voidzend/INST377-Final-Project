// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("⚠️ Missing Supabase env variables in Vercel");
}

export const supabase = createClient(
  supabaseUrl ?? "",
  supabaseServiceKey ?? "",
  { auth: { persistSession: false }}
);
);



