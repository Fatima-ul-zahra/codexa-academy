import { ArrowUpRight } from "lucide-react";

function DashboardStatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName = "",
  loading = false,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon size={21} />
        </div>

        <ArrowUpRight
          size={18}
          className="text-slate-300 dark:text-slate-700"
        />
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </p>

        {loading ? (
          <div className="mt-2 h-9 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
        ) : (
          <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>
        )}

        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export default DashboardStatCard;