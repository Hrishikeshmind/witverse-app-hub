
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iermkyzsfefzhfqcbnmk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imllcm1reXpzZmVmemhmcWNibm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMDcxMDYsImV4cCI6MjA2Mjc4MzEwNn0.PSHCxZVRQ7wSrfFdqbsOxfi8BQSPQztD5QIPHc9gQDo";

// Always include storage options when in browser environment
const storageOptions = {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
};

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, storageOptions);
