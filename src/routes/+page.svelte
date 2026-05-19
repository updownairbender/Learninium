<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
</script>

<section class="flex min-h-[80dvh] flex-col items-center justify-center text-center">
  <h1 class="text-6xl font-bold tracking-tight text-text">
    Learn<span class="text-primary">inium</span>
  </h1>
  <p class="mt-4 max-w-lg text-xl text-text-muted">
    Your modern learning platform. Explore courses, track progress, and grow your skills.
  </p>
  <div class="mt-8 flex gap-4">
    <Button href="/auth/login">Sign In</Button>
    <Button href="/auth/register" variant="outline">Get Started</Button>
  </div>
</section>
