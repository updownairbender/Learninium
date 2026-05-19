<script lang="ts">
  import type { Snippet } from 'svelte';

  let { href, variant = 'primary', class: className = '', children }: {
    href: string;
    variant?: 'primary' | 'outline';
    class?: string;
    children: Snippet;
  } = $props();
</script>

<a
  {href}
  class="inline-flex items-center justify-center rounded-button px-6 py-3 text-base font-medium transition-all duration-200 hover:scale-105 active:scale-95 {variant === 'outline'
    ? 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
    : 'bg-primary text-white hover:bg-primary-hover'} {className}"
>
  {@render children()}
</a>
