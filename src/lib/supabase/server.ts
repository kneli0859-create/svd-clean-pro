import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

let _cached: SupabaseClient<Database> | null = null;

/**
 * Server-only client — uses the SERVICE_ROLE key. Bypasses RLS, do NOT expose
 * to client code. Reused across requests (Postgres connection pooled by URL).
 */
export function getServiceClient(): SupabaseClient<Database> {
  if (_cached) return _cached;
  _cached = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { 'x-svd-source': 'next-server' } },
    },
  );
  return _cached;
}
