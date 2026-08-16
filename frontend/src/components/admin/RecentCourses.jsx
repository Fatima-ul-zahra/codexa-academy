import {
  ArrowRight,
  BookOpen,
  Clock3,
  ExternalLink,
} from "lucide-react";

import { Link } from "react-router-dom";

function RecentCourses({
  courses = [],
  loading = false,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 dark:border-slate-800">
        <div>
          <h2 className="font-bold text-slate-900 dark:text-white">
            Recent Courses
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Recently added courses
          </p>
        </div>

        <Link
          to="/admin/courses"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          View all
          <ArrowRight size={15} />
        </Link>
      </div>

      {loading ? (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 px-5 py-4"
            >
              <div className="h-12 w-12 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                <div className="h-3 w-1/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <BookOpen
            size={36}
            className="mx-auto text-slate-300 dark:text-slate-700"
          />

          <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
            No courses yet
          </h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Add your first course to see it here.
          </p>

          <Link
            to="/admin/courses/new"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Add Course
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {courses.map((course) => (
            <div
              key={course._id}
              className="flex flex-col gap-4 px-5 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center dark:hover:bg-slate-800/40"
            >
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                {course.image ? (
                  <img
                    src={course.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-400">
                    <BookOpen size={20} />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-slate-900 dark:text-white">
                  {course.name}
                </h3>

                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <span>{course.category}</span>

                  <span className="flex items-center gap-1">
                    <Clock3 size={13} />
                    {course.duration}
                  </span>

                  <span>{course.level}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    course.isActive
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {course.isActive
                    ? "Active"
                    : "Inactive"}
                </span>

                <Link
                  to={`/courses/${course.slug}`}
                  target="_blank"
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                  title="View public course"
                >
                  <ExternalLink size={17} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentCourses;