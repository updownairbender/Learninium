<script lang="ts">
  let { form } = $props();
</script>

<section class="mx-auto mt-16 max-w-md">
  <h1 class="text-4xl font-bold text-text">Welcome back</h1>
  <p class="mt-2 text-text-muted">Sign in to continue your learning journey.</p>

  <form method="POST" class="mt-6 space-y-5">
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
        class="w-full rounded-button border border-border bg-surface px-4 py-3 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        placeholder="Your password"
      />
    </div>

    <button
      type="submit"
      class="w-full cursor-pointer rounded-button bg-primary px-6 py-3 text-base font-medium text-white shadow-lg transition-all duration-200 hover:bg-primary-hover hover:shadow-xl active:scale-95"
    >
      Sign in
    </button>
  </form>

  <p class="mt-6 text-center text-sm text-text-muted">
    Don't have an account?
    <a href="/auth/register" class="font-medium text-primary hover:underline">Create one</a>
  </p>
</section>
