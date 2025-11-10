import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl === 'your_supabase_url_here') {
  console.warn('⚠️  Warning: VITE_SUPABASE_URL not configured in client/.env');
}

export const supabase = supabaseUrl && supabaseUrl !== 'your_supabase_url_here'
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
