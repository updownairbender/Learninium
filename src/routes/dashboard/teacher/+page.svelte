<script lang="ts">
  let { data } = $props();
</script>

<h1 class="text-3xl font-bold text-text">Teacher Dashboard</h1>
<p class="mt-2 text-text-muted">Manage your courses and students.</p>

<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <div class="rounded-card border border-border bg-surface p-6">
    <p class="text-sm text-text-muted">My Courses</p>
    <p class="mt-1 text-3xl font-bold text-text">—</p>
  </div>
  <div class="rounded-card border border-border bg-surface p-6">
    <p class="text-sm text-text-muted">Total Students</p>
    <p class="mt-1 text-3xl font-bold text-text">—</p>
  </div>
  <div class="rounded-card border border-border bg-surface p-6">
    <p class="text-sm text-text-muted">Avg Rating</p>
    <p class="mt-1 text-3xl font-bold text-text">—</p>
  </div>
</div>
