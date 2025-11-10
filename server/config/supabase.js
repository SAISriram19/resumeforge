const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || supabaseUrl === 'your_supabase_url_here') {
  console.warn('Warning: SUPABASE_URL not configured in server/.env');
}

if (!supabaseKey || supabaseKey === 'your_supabase_service_key_here') {
  console.warn('Warning: SUPABASE_SERVICE_KEY not configured in server/.env');
}

const supabase = supabaseUrl && supabaseUrl !== 'your_supabase_url_here' && supabaseKey && supabaseKey !== 'your_supabase_service_key_here'
  ? createClient(supabaseUrl, supabaseKey)
  : null;

module.exports = { supabase };
