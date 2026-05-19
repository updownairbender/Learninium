<script lang="ts">
  let { form } = $props();
</script>

<section class="mx-auto mt-8 max-w-md rounded-card border border-border bg-surface p-8">
  <div class="mb-6 text-center">
    <h1 class="text-3xl font-bold text-text">Create account</h1>
    <p class="mt-1 text-sm text-text-muted">Join Learninium and start learning today.</p>
  </div>

  {#if form?.success}
    <div class="text-center">
      <p class="text-lg font-semibold text-text">Account created!</p>
      <p class="mt-2 text-sm text-text-muted">Check your email for a confirmation link, then sign in.</p>
      <a href="/auth/login" class="mt-4 inline-block rounded-button bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-primary-hover">
        Sign in
      </a>
    </div>
  {:else}
    <form method="POST" class="space-y-4">
      {#if form?.error}
        <p class="rounded-button bg-error/10 px-4 py-3 text-sm text-error">{form.error}</p>
      {/if}

      <div>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form?.email ?? ''}
          class="w-full rounded-button border border-border bg-surface-alt px-4 py-3 text-text outline-none transition-colors placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="you@school.edu"
        />
      </div>

      <div>
        <input
          id="password"
          name="password"
          type="password"
          required
          minlength={6}
          class="w-full rounded-button border border-border bg-surface-alt px-4 py-3 text-text outline-none transition-colors placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="At least 6 characters"
        />
      </div>

      <button
        type="submit"
        class="w-full cursor-pointer rounded-button bg-primary px-6 py-3 text-base font-medium text-white shadow-lg transition-all duration-200 hover:bg-primary-hover hover:shadow-xl active:scale-95"
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
