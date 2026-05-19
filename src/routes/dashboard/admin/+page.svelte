<script lang="ts">
  let { data } = $props();
</script>

<h1 class="text-3xl font-bold text-text">Admin Dashboard</h1>
<p class="mt-2 text-text-muted">Platform overview and user management.</p>

<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <div class="rounded-card border border-border bg-surface p-6">
    <p class="text-sm text-text-muted">Total Users</p>
    <p class="mt-1 text-3xl font-bold text-text">—</p>
  </div>
  <div class="rounded-card border border-border bg-surface p-6">
    <p class="text-sm text-text-muted">Courses</p>
    <p class="mt-1 text-3xl font-bold text-text">—</p>
  </div>
  <div class="rounded-card border border-border bg-surface p-6">
    <p class="text-sm text-text-muted">Active Today</p>
    <p class="mt-1 text-3xl font-bold text-text">—</p>
  </div>
</div>
