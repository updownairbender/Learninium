<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';

  let { form } = $props();
</script>

<section class="mx-auto mt-16 max-w-md">
  <h1 class="text-4xl font-bold text-text">Create account</h1>
  <p class="mt-2 text-text-muted">Join Learninium and start learning today.</p>

  {#if form?.success}
    <div class="mt-8 rounded-card border border-border bg-surface p-6 text-center">
      <p class="text-lg font-semibold text-text">Account created!</p>
      <p class="mt-2 text-sm text-text-muted">Check your email for a confirmation link, then sign in.</p>
      <a href="/auth/login" class="mt-4 inline-block rounded-button bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-primary-hover">
        Sign in
      </a>
    </div>
  {:else}
    <form method="POST" class="mt-8 space-y-5">
      {#if form?.error}
        <p class="rounded-button bg-error/10 px-4 py-3 text-sm text-error">{form.error}</p>
      {/if}

      <div>
        <label for="email" class="mb-2 block text-sm font-medium text-text">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form?.email ?? ''}
          class="w-full rounded-button border border-border bg-surface px-4 py-3 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="you@school.edu"
        />
      </div>

      <div>
        <label for="password" class="mb-2 block text-sm font-medium text-text">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minlength={6}
          class="w-full rounded-button border border-border bg-surface px-4 py-3 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="At least 6 characters"
        />
      </div>

      <button
        type="submit"
        class="w-full rounded-button bg-primary px-6 py-3 text-base font-medium text-white transition-all duration-200 hover:bg-primary-hover active:scale-95"
      >
        Create account
      </button>
    </form>

    <p class="mt-6 text-center text-sm text-text-muted">
      Already have an account?
      <a href="/auth/login" class="font-medium text-primary hover:underline">Sign in</a>
    </p>
  {/if}
</section>
