import type { Session, SupabaseClient } from '@supabase/supabase-js';
declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient;
      safeGetSession: () => Promise<Session | null>;
    }
    interface PageData {
      session: Session | null;
    }
  }
}

export {};
