<script lang="ts">
  import '../app.css';
  import { fly } from 'svelte/transition';
  import { page } from '$app/stores';
  import Header from '$lib/components/layout/Header.svelte';

  let { children, data } = $props();
</script>

<Header session={data.session} />
<main class="mx-auto max-w-7xl px-4 py-8">
  {#key $page.url.pathname}
    <div transition:fly={{ y: 12, duration: 250, opacity: 0 }}>
      {@render children()}
    </div>
  {/key}
</main>
