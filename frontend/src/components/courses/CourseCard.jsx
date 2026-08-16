import {
  ArrowRight,
  BookOpen,
  Clock3,
  GraduationCap,
} from "lucide-react";

import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      {/* Image */}
      <Link to={`/courses/${course.slug}`} className="block">
        <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={course.image}
            alt={course.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {course.featured && (
            <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
              Featured
            </span>
          )}

          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur dark:bg-slate-950/90 dark:text-slate-200">
            {course.level}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {course.category}
        </div>

        <Link to={`/courses/${course.slug}`}>
          <h2 className="mt-2 line-clamp-2 text-xl font-bold text-slate-900 transition hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
            {course.name}
          </h2>
        </Link>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {course.shortDescription}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Clock3 size={16} className="text-blue-600" />
            {course.duration}
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <GraduationCap size={16} className="text-purple-600" />
            {course.level}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Course Fee
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              {course.fee}
            </p>
          </div>

          <Link
            to={`/courses/${course.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;