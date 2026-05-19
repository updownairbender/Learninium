<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children, data }: { children: Snippet; data: { session: import('@supabase/supabase-js').Session } } = $props();

  const role = $derived(data.session?.user?.user_metadata?.role ?? 'student');
  const nav = $derived(role === 'admin'
    ? [{ label: 'Overview', href: '/dashboard/admin' }, { label: 'Users', href: '/dashboard/admin' }]
    : role === 'teacher'
    ? [{ label: 'My Courses', href: '/dashboard/teacher' }, { label: 'Students', href: '/dashboard/teacher' }]
    : [{ label: 'My Courses', href: '/dashboard/student' }, { label: 'Progress', href: '/dashboard/student' }]
  );
</script>

<div class="mx-auto max-w-7xl px-4 py-8">
  <nav class="mb-8 flex items-center gap-2 border-b border-border pb-4">
    {#each nav as item}
      <a
        href={item.href}
        class="rounded-button px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-surface-alt hover:text-text"
      >
        {item.label}
      </a>
    {/each}
    <span class="flex-1"></span>
    <form method="POST" action="/auth/logout">
      <button type="submit" class="cursor-pointer rounded-button px-4 py-2 text-sm font-medium text-error transition-colors hover:bg-error/10">
        Sign out
      </button>
    </form>
  </nav>
  <main>
    {@render children()}
  </main>
</div>
