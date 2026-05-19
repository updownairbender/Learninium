<script lang="ts">
  import { page } from '$app/stores';
</script>

<section class="flex min-h-[60dvh] flex-col items-center justify-center text-center">
  <h1 class="text-6xl font-bold text-error">{$page.status}</h1>
  <p class="mt-4 text-xl text-text-muted">
    {$page.error?.message ?? 'Something went wrong.'}
  </p>
  <a
    href="/"
    class="mt-8 inline-flex items-center justify-center rounded-button bg-primary px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-primary-hover"
  >
    Go home
  </a>
</section>
