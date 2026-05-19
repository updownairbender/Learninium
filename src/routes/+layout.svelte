<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/layout/Header.svelte';

  let { children, data } = $props();
</script>

<Header session={data.session} />
<main class="mx-auto max-w-7xl px-4 py-8">
  {@render children()}
</main>
