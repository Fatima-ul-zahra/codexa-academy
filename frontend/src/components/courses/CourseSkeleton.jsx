function CourseSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="h-52 animate-pulse bg-slate-200 dark:bg-slate-800" />

      <div className="space-y-4 p-6">
        <div className="h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

        <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

        <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

        <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

        <div className="h-10 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}

export default CourseSkeleton;