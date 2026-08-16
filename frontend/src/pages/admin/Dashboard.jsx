import {
  Activity,
  BookOpen,
  CheckCircle2,
  Plus,
  Star,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { getDashboardStats } from "../../services/dashboardServices";

import DashboardStatCard from "../../components/admin/DashboardStatCard";
import RecentCourses from "../../components/admin/RecentCourses";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getDashboardStats();

        setStats(data);
      } catch (dashboardError) {
        setError(
          dashboardError.message ||
            "Unable to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const safeStats = stats || {
    totalCourses: 0,
    activeCourses: 0,
    inactiveCourses: 0,
    featuredCourses: 0,
    totalEnrollments: 0,
    recentCourses: [],
    recentEnrollments: [],
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Overview
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Dashboard
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Monitor Codexa Academy courses and manage
              your academy content from one place.
            </p>
          </div>

          <Link
            to="/admin/courses/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Course
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-red-900/50 dark:bg-red-950/20">
            <div>
              <p className="font-semibold text-red-700 dark:text-red-400">
                Dashboard couldn't be loaded
              </p>

              <p className="mt-1 text-sm text-red-600 dark:text-red-400/80">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={loadDashboard}
              className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardStatCard
            title="Total Courses"
            value={safeStats.totalCourses}
            description="All courses in your database"
            icon={BookOpen}
            iconClassName="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
            loading={loading}
          />

          <DashboardStatCard
            title="Active Courses"
            value={safeStats.activeCourses}
            description="Currently visible publicly"
            icon={CheckCircle2}
            iconClassName="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
            loading={loading}
          />

          <DashboardStatCard
            title="Featured Courses"
            value={safeStats.featuredCourses}
            description="Featured on the academy"
            icon={Star}
            iconClassName="bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400"
            loading={loading}
          />

          <DashboardStatCard
            title="Inactive Courses"
            value={safeStats.inactiveCourses}
            description="Hidden from public website"
            icon={XCircle}
            iconClassName="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
            loading={loading}
          />
        </div>

        {/* Enrollment placeholder */}
<div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
        <Users size={21} />
      </div>

      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Total Enrollments
        </p>

        <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
          {loading
            ? "..."
            : safeStats.totalEnrollments}
        </p>
      </div>
    </div>

    <Link
      to="/admin/enrollments"
      className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
    >
      Manage Enrollments
    </Link>
  </div>
</div>

        {/* Recent courses */}
        <div className="mt-8">
          <RecentCourses
            courses={safeStats.recentCourses}
            loading={loading}
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <Link
            to="/admin/courses/new"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <Plus size={21} />
            </div>

            <h3 className="mt-5 font-bold text-slate-900 dark:text-white">
              Add New Course
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Create a new course with its fee, syllabus,
              technologies and learning outcomes.
            </p>
          </Link>

          <Link
            to="/admin/courses"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-purple-900"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
              <BookOpen size={21} />
            </div>

            <h3 className="mt-5 font-bold text-slate-900 dark:text-white">
              Manage Courses
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              View, edit, activate, deactivate and manage
              your academy courses.
            </p>
          </Link>

          <Link
            to="/courses"
            target="_blank"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-900"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              <TrendingUp size={21} />
            </div>

            <h3 className="mt-5 font-bold text-slate-900 dark:text-white">
              View Public Website
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Preview how your courses and academy appear
              to students.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;