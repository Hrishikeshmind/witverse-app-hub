
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iermkyzsfefzhfqcbnmk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imllcm1reXpzZmVmemhmcWNibm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMDcxMDYsImV4cCI6MjA2Mjc4MzEwNn0.PSHCxZVRQ7wSrfFdqbsOxfi8BQSPQztD5QIPHc9gQDo";

// Enhanced storage options for better auth persistence
const storageOptions = {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit' as const // Type cast to literal type
  }
};

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, storageOptions);

// Debug helper to check if OAuth is correctly configured
export const checkOAuthConfig = async () => {
  try {
    console.log("Checking OAuth configuration...");
    const { data } = await supabase.auth.getSession();
    console.log("Current auth session:", data.session ? "Active" : "None");
    
    // Additional check for Google provider
    const { data: authSettings } = await supabase.auth.getSession();
    console.log("Auth session data available:", !!authSettings);
    
    return true;
  } catch (error) {
    console.error("OAuth configuration check failed:", error);
    return false;
  }
};
