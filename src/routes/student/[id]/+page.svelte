<script lang="ts">
  let { data } = $props();
</script>

<section>
  <div class="rounded-card border border-border bg-surface p-8">
    <h1 class="text-4xl font-bold text-text">{data.student.name}</h1>
    {#if data.student.bio}
      <p class="mt-4 text-text">{data.student.bio}</p>
    {/if}
  </div>

  {#if data.enrollments.length > 0}
    <h2 class="mt-10 text-2xl font-bold text-text">Enrolled Courses</h2>
    <div class="mt-4 space-y-3">
      {#each data.enrollments as enrollment}
        <div class="rounded-card border border-border bg-surface p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-semibold text-text">{enrollment.course_title}</p>
              <p class="text-sm text-text-muted">{Math.round(enrollment.progress)}% complete</p>
            </div>
            <div class="h-2 w-32 overflow-hidden rounded-full bg-surface-alt">
              <div
                class="h-full rounded-full bg-primary transition-all"
                style="width: {enrollment.progress}%"
              ></div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p class="mt-8 text-text-muted">No enrollments yet.</p>
  {/if}
</section>
