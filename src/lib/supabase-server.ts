import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the Service Role key.
 * Use ONLY in server components, API routes, or middleware.
 * Never expose SUPABASE_SERVICE_ROLE_KEY to the browser.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
