import { createServerClient } from '@supabase/ssr';
import { type Handle, type HandleServerError } from '@sveltejs/kit';
import { logger } from '$lib/server/logging/logger';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => event.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            event.cookies.set(name, value, { ...options, path: '/' });
          });
        }
      }
    }
  );

  event.locals.safeGetSession = async () => {
    const { data: { session } } = await event.locals.supabase.auth.getSession();
    return session;
  };

  return resolve(event);
};

export const handleError: HandleServerError = ({ error, event }) => {
  logger.error('Server error', {
    path: event.url.pathname,
    error: error instanceof Error ? error.message : String(error)
  });
};
