import { createClient } from '@supabase/supabase-js';

// NOTE: In a real environment, these would be process.env.NEXT_PUBLIC_SUPABASE_URL
// For this demo, we will check for environment variables or default to empty to prevent crash
// Users must provide their own keys to make the DB features work.

const supabaseUrl = process.env.SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper to check if supabase is actually configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://xyzcompany.supabase.co';
};