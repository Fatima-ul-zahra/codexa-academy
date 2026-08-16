import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Trash2,
  User,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  deleteEnrollment,
  getEnrollmentById,
  updateEnrollmentStatus,
} from "../../services/enrollmentService";

const STATUSES = [
  "Pending",
  "Contacted",
  "Enrolled",
  "Completed",
  "Cancelled",
];

function EnrollmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [enrollment, setEnrollment] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [updating, setUpdating] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    const loadEnrollment =
      async () => {
        try {
          setLoading(true);

          const result =
            await getEnrollmentById(
              id
            );

          if (mounted) {
            setEnrollment(
              result.data
            );
          }
        } catch (loadError) {
          if (mounted) {
            setError(
              loadError.message ||
                "Unable to load enrollment."
            );
          }
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

    loadEnrollment();

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleStatusChange =
    async (status) => {
      try {
        setUpdating(true);

        const result =
          await updateEnrollmentStatus(
            id,
            status
          );

        setEnrollment(
          result.data
        );
      } catch (statusError) {
        window.alert(
          statusError.message ||
            "Unable to update status."
        );
      } finally {
        setUpdating(false);
      }
    };

  const handleDelete = async () => {
    const confirmed =
      window.confirm(
        `Delete enrollment for ${enrollment.studentName}? This action cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await deleteEnrollment(id);

      navigate(
        "/admin/enrollments",
        {
          replace: true,
        }
      );
    } catch (deleteError) {
      window.alert(
        deleteError.message ||
          "Unable to delete enrollment."
      );

      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading enrollment...
          </p>
        </div>
      </div>
    );
  }

  if (error || !enrollment) {
    return (
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20">
          <h1 className="text-xl font-bold text-red-700 dark:text-red-400">
            Enrollment not found
          </h1>

          <p className="mt-2 text-sm text-red-600 dark:text-red-400/80">
            {error ||
              "This enrollment may have been deleted."}
          </p>

          <Link
            to="/admin/enrollments"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft size={17} />
            Back to Enrollments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/admin/enrollments"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          <ArrowLeft size={16} />
          Back to Enrollments
        </Link>

        {/* Header */}

        <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Enrollment Details
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
              {
                enrollment.studentName
              }
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Registered{" "}
              {formatDate(
                enrollment.createdAt
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50 dark:border-red-900/50 dark:hover:bg-red-950/30"
          >
            <Trash2 size={17} />
            {deleting
              ? "Deleting..."
              : "Delete Enrollment"}
          </button>
        </div>

        {/* Status */}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Enrollment Status
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Update the student's enrollment progress.
              </p>
            </div>

            <select
              value={
                enrollment.status ||
                "Pending"
              }
              onChange={(event) =>
                handleStatusChange(
                  event.target.value
                )
              }
              disabled={updating}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
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
          </div>
        </div>

        {/* Student information */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <InfoCard
            title="Student Information"
            icon={User}
          >
            <DetailRow
              icon={User}
              label="Full Name"
              value={
                enrollment.studentName
              }
            />

            <DetailRow
              icon={Phone}
              label="Phone"
              value={
                enrollment.phone
              }
            />

            <DetailRow
              icon={Mail}
              label="Email"
              value={
                enrollment.email
              }
            />

            <DetailRow
              icon={CalendarDays}
              label="Education"
              value={
                enrollment.education
              }
            />

            <DetailRow
              icon={MapPin}
              label="City"
              value={
                enrollment.city
              }
            />
          </InfoCard>

          {/* Course */}

          <InfoCard
            title="Course Information"
            icon={CheckCircle2}
          >
            <DetailRow
              icon={CheckCircle2}
              label="Course"
              value={
                enrollment.course
                  ?.name ||
                "Course removed"
              }
            />

            <DetailRow
              icon={Clock3}
              label="Duration"
              value={
                enrollment.course
                  ?.duration
              }
            />

            <DetailRow
              icon={CheckCircle2}
              label="Level"
              value={
                enrollment.course
                  ?.level
              }
            />

            <DetailRow
              icon={CheckCircle2}
              label="Course Fee"
              value={
                enrollment.course?.fee !==
                undefined
                  ? `PKR ${Number(
                      enrollment.course.fee
                    ).toLocaleString()}`
                  : "—"
              }
            />

            <DetailRow
              icon={CalendarDays}
              label="Registered"
              value={formatDate(
                enrollment.createdAt
              )}
            />
          </InfoCard>
        </div>

        {/* Message */}

        {enrollment.message && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-bold text-slate-900 dark:text-white">
              Student Message
            </h2>

            <div className="mt-4 rounded-xl bg-slate-50 p-5 dark:bg-slate-800/60">
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-300">
                {enrollment.message}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCard({
  title,
  icon: Icon,
  children,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          <Icon size={19} />
        </div>

        <h2 className="font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {children}
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex gap-4 py-4">
      <Icon
        size={17}
        className="mt-0.5 shrink-0 text-slate-400"
      />

      <div className="min-w-0">
        <p className="text-xs text-slate-500">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold text-slate-900 dark:text-white">
          {value || "—"}
        </p>
      </div>
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
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(new Date(date));
}

export default EnrollmentDetails;