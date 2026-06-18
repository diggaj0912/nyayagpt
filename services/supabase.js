// ═══════════════════════════════════════════════════════════════
// NyayaGPT — Supabase Client Setup (Client-Side)
// ═══════════════════════════════════════════════════════════════

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem('supabase_url') || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem('supabase_anon_key') || '';

export let supabase = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('🟢 Supabase client initialized on frontend.');
  } catch (e) {
    console.warn('❌ Failed to initialize Supabase client on frontend:', e);
  }
} else {
  console.log('⚠️ Supabase client running in offline/mock mode on frontend. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}
