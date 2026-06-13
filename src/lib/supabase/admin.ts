import { createClient } from '@supabase/supabase-js'

// Service-role client for trusted server-side writes (e.g. Stripe webhook updating a
// user's subscription). Bypasses RLS — NEVER import this into client code.
// Requires SUPABASE_SERVICE_ROLE_KEY (Supabase → Settings → API → service_role secret).
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set')
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
