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
    <nav class="flex items-center gap-4">
      {#if session}
        <a href="/dashboard/{role}" class="text-sm text-text-muted transition-colors hover:text-text">
          {email}
        </a>
        <form method="POST" action="/auth/logout">
          <button type="submit" class="cursor-pointer rounded-button border border-border px-3 py-1.5 text-sm font-medium text-text-muted transition-colors hover:bg-surface-alt hover:text-text">
            Sign out
          </button>
        </form>
      {:else}
        <a href="/auth/login" class="text-sm text-text-muted transition-colors hover:text-text">Sign in</a>
        <Button href="/auth/register">Get Started</Button>
      {/if}
      <a href="/search" class="rounded-button bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20">
        Browse
      </a>
    </nav>
  </div>
</header>
