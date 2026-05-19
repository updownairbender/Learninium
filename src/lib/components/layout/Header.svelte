<script lang="ts">
  import type { Session } from '@supabase/supabase-js';
  import Button from '$lib/components/ui/Button.svelte';

  let { session = null }: { session: Session | null } = $props();

  const role = $derived(session?.user?.user_metadata?.role ?? null);
  const email = $derived(session?.user?.email ?? '');
</script>

<header class="border-b border-border bg-white/80 backdrop-blur-md sticky top-0 z-50">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
    <a href="/" class="text-2xl font-bold text-text">
      Learn<span class="text-primary">inium</span>
    </a>
    <nav class="flex items-center gap-6">
      <a href="/search" class="text-text-muted transition-colors hover:text-text">
        Browse
      </a>
      {#if session}
        <a
          href="/dashboard/{role}"
          class="text-text-muted transition-colors hover:text-text"
        >
          {email}
        </a>
        <form method="POST" action="/auth/logout">
          <button type="submit" class="rounded-button border border-border px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-surface-alt hover:text-text">
            Sign out
          </button>
        </form>
      {:else}
        <Button href="/auth/login" variant="outline">Sign In</Button>
      {/if}
    </nav>
  </div>
</header>
