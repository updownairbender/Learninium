<script lang="ts">
  import type { Snippet } from 'svelte';
  import Button from '$lib/components/ui/Button.svelte';

  let { children, data }: { children: Snippet; data: { session: import('@supabase/supabase-js').Session } } = $props();

  const role = $derived(data.session?.user?.user_metadata?.role ?? 'student');
  const nav = $derived(role === 'admin'
    ? [{ label: 'Overview', href: '/dashboard/admin' }, { label: 'Users', href: '/dashboard/admin' }]
    : role === 'teacher'
    ? [{ label: 'My Courses', href: '/dashboard/teacher' }, { label: 'Students', href: '/dashboard/teacher' }]
    : [{ label: 'My Courses', href: '/dashboard/student' }, { label: 'Progress', href: '/dashboard/student' }]
  );
</script>

<div class="mx-auto flex max-w-7xl gap-8 px-4 py-8">
  <aside class="hidden w-56 shrink-0 md:block">
    <nav class="space-y-1">
      {#each nav as item}
        <a
          href={item.href}
          class="block rounded-button px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-surface-alt hover:text-text"
        >
          {item.label}
        </a>
      {/each}
      <hr class="my-4 border-border" />
      <form method="POST" action="/auth/logout">
        <button type="submit" class="w-full rounded-button px-4 py-2 text-left text-sm font-medium text-error transition-colors hover:bg-error/10">
          Sign out
        </button>
      </form>
    </nav>
  </aside>
  <main class="min-w-0 flex-1">
    {@render children()}
  </main>
</div>
