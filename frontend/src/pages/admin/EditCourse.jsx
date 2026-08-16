import {
  AlertCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import CourseForm from "../../components/admin/CourseForm";

import {
  getCourseById,
  updateCourse,
} from "../../services/courseService";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadCourse = async () => {
      try {
        setLoading(true);
        setError("");

        const result =
          await getCourseById(id);

        if (mounted) {
          setCourse(result.data);
        }
      } catch (courseError) {
        if (mounted) {
          setError(
            courseError.message ||
              "Unable to load course."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadCourse();

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleSubmit = async (
    courseData
  ) => {
    try {
      setSubmitting(true);
      setError("");

      await updateCourse(
        id,
        courseData
      );

      navigate("/admin/courses", {
        replace: true,
      });
    } catch (courseError) {
      setError(
        courseError.message ||
          "Unable to update course."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <Loader2
            size={32}
            className="mx-auto animate-spin text-blue-600"
          />

          <p className="mt-4 text-sm text-slate-500">
            Loading course...
          </p>
        </div>
      </div>
    );
  }

  if (error && !course) {
    return (
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20">
          <AlertCircle
            size={40}
            className="mx-auto text-red-500"
          />

          <h1 className="mt-5 text-xl font-bold text-red-700 dark:text-red-400">
            Unable to load course
          </h1>

          <p className="mt-2 text-sm text-red-600 dark:text-red-400/80">
            {error}
          </p>

          <Link
            to="/admin/courses"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft size={17} />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

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
            Edit Course
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Update course information and settings.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/20">
            <p className="font-semibold text-red-700 dark:text-red-400">
              Course could not be updated
            </p>

            <p className="mt-1 text-sm text-red-600 dark:text-red-400/80">
              {error}
            </p>
          </div>
        )}

        <div className="mt-8">
          <CourseForm
            initialData={course}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitLabel="Update Course"
            onCancel={() =>
              navigate("/admin/courses")
            }
          />
        </div>
      </div>
    </div>
  );
}

export default EditCourse;