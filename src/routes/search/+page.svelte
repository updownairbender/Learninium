<script lang="ts">
  let { data } = $props();
</script>

<section>
  <h1 class="text-4xl font-bold text-text">Browse Courses</h1>

  <form method="GET" action="/search" class="mt-6 flex flex-wrap gap-4">
    <input
      name="q"
      type="text"
      value={data.q}
      placeholder="Search courses..."
      class="min-w-0 flex-1 rounded-button border border-border bg-surface px-4 py-3 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
    />
    <select
      name="category"
      value={data.category}
      class="rounded-button border border-border bg-surface px-4 py-3 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
    >
      <option value="">All categories</option>
      {#each data.categories as cat}
        <option value={cat}>{cat}</option>
      {/each}
    </select>
    <button
      type="submit"
      class="rounded-button bg-primary px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-primary-hover"
    >
      Search
    </button>
  </form>

  {#if data.courses.length > 0}
    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each data.courses as course}
        <a
          href="/course/{course.id}"
          class="rounded-card border border-border bg-surface p-6 transition-all duration-200 hover:shadow-md"
        >
          <span class="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {course.difficulty}
          </span>
          <h3 class="mt-3 text-lg font-semibold text-text">{course.title}</h3>
          <p class="mt-1 text-sm text-text-muted">{course.category}</p>
        </a>
      {/each}
    </div>
  {:else}
    <p class="mt-12 text-center text-text-muted">
      {data.q ? 'No courses match your search.' : 'No courses available yet.'}
    </p>
  {/if}
</section>
