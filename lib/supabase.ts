import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing env vars:', { URL: !!supabaseUrl, KEY: !!supabaseAnonKey });
    throw new Error('Missing Supabase configuration');
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase: SupabaseClient = createSupabaseClient();

export function createSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}