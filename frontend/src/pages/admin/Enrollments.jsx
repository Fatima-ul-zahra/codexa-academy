import {
  Eye,
  Filter,
  RefreshCw,
  Search,
  Trash2,
  Users,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  deleteEnrollment,
  getEnrollments,
} from "../../services/enrollmentService";

const STATUSES = [
  "Pending",
  "Contacted",
  "Enrolled",
  "Completed",
  "Cancelled",
];

function Enrollments() {
  const [enrollments, setEnrollments] =
    useState([]);

  const [courses, setCourses] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [courseFilter, setCourseFilter] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadEnrollments =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const result =
          await getEnrollments({
            search,
            course: courseFilter,
            status: statusFilter,
            page: 1,
            limit: 50,
          });

        const data =
          result.data || [];

        setEnrollments(data);

        const uniqueCourses = [];

        data.forEach((item) => {
          if (
            item.course &&
            !uniqueCourses.some(
              (course) =>
                course._id ===
                item.course._id
            )
          ) {
            uniqueCourses.push(
              item.course
            );
          }
        });

        setCourses(uniqueCourses);
      } catch (enrollmentError) {
        setError(
          enrollmentError.message ||
            "Unable to load enrollments."
        );
      } finally {
        setLoading(false);
      }
    }, [
      search,
      courseFilter,
      statusFilter,
    ]);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        loadEnrollments();
      },
      300
    );

    return () =>
      clearTimeout(timer);
  }, [loadEnrollments]);

  const handleDelete = async (
    enrollment
  ) => {
    const confirmed =
      window.confirm(
        `Delete enrollment for ${enrollment.studentName}? This action cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteEnrollment(
        enrollment._id
      );

      setEnrollments(
        (current) =>
          current.filter(
            (item) =>
              item._id !==
              enrollment._id
          )
      );
    } catch (deleteError) {
      window.alert(
        deleteError.message ||
          "Unable to delete enrollment."
      );
    }
  };

  const clearFilters = () => {
    setSearch("");
    setCourseFilter("");
    setStatusFilter("");
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Student Management
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Enrollments
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Manage private student enrollment
              information.
            </p>
          </div>

          <button
            type="button"
            onClick={loadEnrollments}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
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
        </div>

        {/* Privacy notice */}

        <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
          <div className="flex gap-3">
            <Users
              size={20}
              className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
            />

            <div>
              <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                Private student information
              </p>

              <p className="mt-1 text-xs leading-5 text-blue-700 dark:text-blue-400">
                Enrollment information is visible only
                to authenticated administrators.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-4 lg:grid-cols-[1fr_240px_220px_auto]">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search name, phone, email or city..."
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <select
              value={courseFilter}
              onChange={(event) =>
                setCourseFilter(
                  event.target.value
                )
              }
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="">
                All Courses
              </option>

              {courses.map((course) => (
                <option
                  key={course._id}
                  value={course._id}
                >
                  {course.name}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="">
                All Statuses
              </option>

              {STATUSES.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                )
              )}
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

        {/* Error */}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/20">
            <p className="font-semibold text-red-700 dark:text-red-400">
              Unable to load enrollments
            </p>

            <p className="mt-1 text-sm text-red-600 dark:text-red-400/80">
              {error}
            </p>
          </div>
        )}

        {/* Count */}

        <div className="mt-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {loading
              ? "Loading enrollments..."
              : `${enrollments.length} enrollment${
                  enrollments.length !==
                  1
                    ? "s"
                    : ""
                } found`}
          </p>
        </div>

        {/* Desktop */}

        {!loading &&
          enrollments.length > 0 && (
            <div className="mt-4 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block dark:border-slate-800 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                    <tr>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Student
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Contact
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Course
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        City
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Date
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
                    {enrollments.map(
                      (enrollment) => (
                        <tr
                          key={
                            enrollment._id
                          }
                          className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                        >
                          <td className="px-5 py-4">
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {
                                enrollment.studentName
                              }
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {
                                enrollment.education
                              }
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              {
                                enrollment.phone
                              }
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {
                                enrollment.email
                              }
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <p className="max-w-[220px] truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                              {enrollment
                                .course
                                ?.name ||
                                "Course removed"}
                            </p>
                          </td>

                          <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                            {
                              enrollment.city
                            }
                          </td>

                          <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                            {formatDate(
                              enrollment.createdAt
                            )}
                          </td>

                          <td className="px-5 py-4">
                            <StatusBadge
                              status={
                                enrollment.status
                              }
                            />
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-2">
                              <Link
                                to={`/admin/enrollments/${enrollment._id}`}
                                className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30"
                                title="View details"
                              >
                                <Eye
                                  size={17}
                                />
                              </Link>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    enrollment
                                  )
                                }
                                className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                                title="Delete"
                              >
                                <Trash2
                                  size={17}
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        {/* Mobile */}

        {!loading &&
          enrollments.length > 0 && (
            <div className="mt-4 space-y-4 lg:hidden">
              {enrollments.map(
                (enrollment) => (
                  <div
                    key={
                      enrollment._id
                    }
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">
                          {
                            enrollment.studentName
                          }
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {
                            enrollment.course
                              ?.name
                          }
                        </p>
                      </div>

                      <StatusBadge
                        status={
                          enrollment.status
                        }
                      />
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <InfoItem
                        label="Phone"
                        value={
                          enrollment.phone
                        }
                      />

                      <InfoItem
                        label="City"
                        value={
                          enrollment.city
                        }
                      />

                      <InfoItem
                        label="Education"
                        value={
                          enrollment.education
                        }
                      />

                      <InfoItem
                        label="Registered"
                        value={formatDate(
                          enrollment.createdAt
                        )}
                      />
                    </div>

                    <div className="mt-5 flex justify-end gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
                      <Link
                        to={`/admin/enrollments/${enrollment._id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        <Eye
                          size={16}
                        />
                        View
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            enrollment
                          )
                        }
                        className="rounded-xl border border-red-200 px-3 py-2.5 text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-950/30"
                      >
                        <Trash2
                          size={17}
                        />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

        {/* Empty */}

        {!loading &&
          enrollments.length === 0 && (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
              <Users
                size={42}
                className="mx-auto text-slate-300 dark:text-slate-700"
              />

              <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                No enrollments found
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Try changing your filters.
              </p>
            </div>
          )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Pending:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",

    Contacted:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",

    Enrolled:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",

    Completed:
      "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",

    Cancelled:
      "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      {status || "Pending"}
    </span>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-semibold text-slate-900 dark:text-white">
        {value || "—"}
      </p>
    </div>
  );
}

function formatDate(date) {
  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-PK",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(new Date(date));
}

export default Enrollments;