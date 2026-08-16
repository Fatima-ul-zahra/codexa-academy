import {
  Edit3,
  ExternalLink,
  Filter,
  Plus,
  RefreshCw,
  Search,
  Star,
  Trash2,
} from "lucide-react";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  deleteCourse,
  getCourses,
} from "../../services/courseService";

function Courses() {
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [status, setStatus] = useState("All");

  const loadCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getCourses({
        limit: 50,
      });

      setCourses(result.data || []);
    } catch (courseError) {
      setError(
        courseError.message ||
          "Unable to load courses."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const filteredCourses = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return courses.filter((course) => {
      const matchesSearch =
        !searchValue ||
        course.name
          .toLowerCase()
          .includes(searchValue) ||
        course.category
          .toLowerCase()
          .includes(searchValue);

      const matchesLevel =
        level === "All" ||
        course.level === level;

      const matchesStatus =
        status === "All" ||
        (status === "Active" && course.isActive) ||
        (status === "Inactive" &&
          !course.isActive);

      return (
        matchesSearch &&
        matchesLevel &&
        matchesStatus
      );
    });
  }, [courses, search, level, status]);

  const handleDelete = async (course) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${course.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCourse(course._id);

      setCourses((current) =>
        current.filter(
          (item) => item._id !== course._id
        )
      );
    } catch (deleteError) {
      window.alert(
        deleteError.message ||
          "Unable to delete course."
      );
    }
  };

  const clearFilters = () => {
    setSearch("");
    setLevel("All");
    setStatus("All");
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Course Management
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Courses
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Create, edit and manage your academy courses.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={loadCourses}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <RefreshCw
                size={17}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />
              Refresh
            </button>

            <Link
              to="/admin/courses/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Course
            </Link>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/20">
            <p className="font-semibold text-red-700 dark:text-red-400">
              Unable to load courses
            </p>

            <p className="mt-1 text-sm text-red-600 dark:text-red-400/80">
              {error}
            </p>
          </div>
        )}

        {/* Filters */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px_auto]">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search courses..."
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <select
              value={level}
              onChange={(event) =>
                setLevel(event.target.value)
              }
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="All">
                All Levels
              </option>
              <option value="Beginner">
                Beginner
              </option>
              <option value="Intermediate">
                Intermediate
              </option>
              <option value="Advanced">
                Advanced
              </option>
            </select>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="All">
                All Status
              </option>
              <option value="Active">
                Active
              </option>
              <option value="Inactive">
                Inactive
              </option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Filter size={16} />
              Clear
            </button>
          </div>
        </div>

        {/* Result count */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {filteredCourses.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {courses.length}
            </span>{" "}
            courses
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="space-y-4 p-6">
              {[1, 2, 3, 4, 5].map(
                (item) => (
                  <div
                    key={item}
                    className="flex gap-4"
                  >
                    <div className="h-14 w-14 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                      <div className="h-3 w-1/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <BookOpenIcon />

            <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              No courses found
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Try changing your filters or create a new course.
            </p>

            <Link
              to="/admin/courses/new"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Plus size={17} />
              Add Course
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block dark:border-slate-800 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                    <tr>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Course
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Category
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Fee
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Level
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredCourses.map(
                      (course) => (
                        <tr
                          key={course._id}
                          className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <CourseImage
                                course={course}
                              />

                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="max-w-[260px] truncate font-semibold text-slate-900 dark:text-white">
                                    {course.name}
                                  </p>

                                  {course.featured && (
                                    <Star
                                      size={15}
                                      className="shrink-0 fill-current text-amber-500"
                                    />
                                  )}
                                </div>

                                <p className="mt-1 text-xs text-slate-500">
                                  {course.duration}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                            {course.category}
                          </td>

                          <td className="px-5 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                            PKR{" "}
                            {Number(
                              course.fee
                            ).toLocaleString()}
                          </td>

                          <td className="px-5 py-4">
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                              {course.level}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <StatusBadge
                              active={
                                course.isActive
                              }
                            />
                          </td>

                          <td className="px-5 py-4">
                            <CourseActions
                              course={course}
                              onDelete={
                                handleDelete
                              }
                            />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile cards */}
            <div className="mt-5 space-y-4 lg:hidden">
              {filteredCourses.map(
                (course) => (
                  <div
                    key={course._id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex gap-4">
                      <CourseImage
                        course={course}
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">
                              {course.name}
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                              {course.category}
                            </p>
                          </div>

                          {course.featured && (
                            <Star
                              size={16}
                              className="shrink-0 fill-current text-amber-500"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                      <InfoItem
                        label="Fee"
                        value={`PKR ${Number(
                          course.fee
                        ).toLocaleString()}`}
                      />

                      <InfoItem
                        label="Duration"
                        value={
                          course.duration
                        }
                      />

                      <InfoItem
                        label="Level"
                        value={course.level}
                      />

                      <InfoItem
                        label="Status"
                        value={
                          course.isActive
                            ? "Active"
                            : "Inactive"
                        }
                      />
                    </div>

                    <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
                      <CourseActions
                        course={course}
                        onDelete={
                          handleDelete
                        }
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CourseImage({ course }) {
  return (
    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
      {course.image ? (
        <img
          src={course.image}
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-slate-400">
          <BookOpenIcon />
        </div>
      )}
    </div>
  );
}

function BookOpenIcon() {
  return (
    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
      <span className="text-lg">📚</span>
    </div>
  );
}

function StatusBadge({ active }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function CourseActions({
  course,
  onDelete,
}) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        to={`/courses/${course.slug}`}
        target="_blank"
        title="View"
        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400"
      >
        <ExternalLink size={17} />
      </Link>

      <Link
        to={`/admin/courses/${course._id}/edit`}
        title="Edit"
        className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
      >
        <Edit3 size={17} />
      </Link>

      <button
        type="button"
        onClick={() => onDelete(course)}
        title="Delete"
        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400"
      >
        <Trash2 size={17} />
      </button>
    </div>
  );
}

export default Courses;