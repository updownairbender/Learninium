<script lang="ts">
  let { data } = $props();
  const teacher = $derived(data.teacher);
  const courses = $derived(data.courses);
</script>

<section>
  <div class="rounded-card border border-border bg-surface p-8">
    <h1 class="text-4xl font-bold text-text">{teacher.name}</h1>
    {#if teacher.bio}
      <p class="mt-4 text-text">{teacher.bio}</p>
    {/if}
  </div>

  {#if courses.length > 0}
    <h2 class="mt-10 text-2xl font-bold text-text">Courses</h2>
    <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each courses as course}
        <a
          href="/course/{course.id}"
          class="rounded-card border border-border bg-surface p-6 transition-all duration-200 hover:shadow-md"
        >
          <span class="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {course.difficulty}
          </span>
          <h3 class="mt-3 font-semibold text-text">{course.title}</h3>
          <p class="mt-1 text-sm text-text-muted">{course.category}</p>
        </a>
      {/each}
    </div>
  {:else}
    <p class="mt-8 text-text-muted">No courses yet.</p>
  {/if}
</section>
