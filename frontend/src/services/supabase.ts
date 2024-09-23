import { createClient } from '@supabase/supabase-js';

const SUPABASE = {
  PROJECT_URL: import.meta.env.VITE_SUPABASE_PROJECT_URL as string,
  ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
};

export const supaclient = createClient(SUPABASE.PROJECT_URL, SUPABASE.ANON_KEY);
