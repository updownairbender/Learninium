<script lang="ts">
  let { data } = $props();
  const course = $derived(data.course);
</script>

<section>
  <a href="/search" class="mb-6 inline-block text-sm text-text-muted transition-colors hover:text-primary">
    &larr; Back to courses
  </a>

  <div class="rounded-card border border-border bg-surface p-8">
    <span class="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      {course.difficulty}
    </span>
    <h1 class="mt-4 text-4xl font-bold text-text">{course.title}</h1>
    <p class="mt-2 text-text-muted">by {course.teacher_name}</p>
    <p class="mt-6 text-lg leading-relaxed text-text">{course.description}</p>

    <div class="mt-8 rounded-button bg-surface-alt px-6 py-4">
      <p class="text-sm text-text-muted">Category</p>
      <p class="font-medium text-text">{course.category}</p>
    </div>
  </div>
</section>
