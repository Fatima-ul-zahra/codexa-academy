import { ArrowLeft } from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CourseForm from "../../components/admin/CourseForm";
import { createCourse } from "../../services/courseService";

function AddCourse() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [submitting, setSubmitting] =
    useState(false);

  const handleSubmit = async (courseData) => {
    try {
      setSubmitting(true);
      setError("");

      await createCourse(courseData);

      navigate("/admin/courses", {
        replace: true,
      });
    } catch (courseError) {
      setError(
        courseError.message ||
          "Unable to create course."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/admin/courses"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          <ArrowLeft size={16} />
          Back to Courses
        </Link>

        <div className="mt-5">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            Course Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            Add New Course
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Create a complete course for Codexa Academy.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/20">
            <p className="font-semibold text-red-700 dark:text-red-400">
              Course could not be created
            </p>

            <p className="mt-1 text-sm text-red-600 dark:text-red-400/80">
              {error}
            </p>
          </div>
        )}

        <div className="mt-8">
          <CourseForm
            onSubmit={handleSubmit}
            submitting={submitting}
            submitLabel="Create Course"
            onCancel={() =>
              navigate("/admin/courses")
            }
          />
        </div>
      </div>
    </div>
  );
}

export default AddCourse;