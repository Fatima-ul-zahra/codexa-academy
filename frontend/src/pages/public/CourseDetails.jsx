import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Code2,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  User,
  X,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const WHATSAPP_NUMBER = "923197226369";
const DISPLAY_PHONE = "03197226369";

function CourseDetails() {
  const { slug } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

  // Enrollment state
  const [showEnrollment, setShowEnrollment] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [enrollmentSuccess, setEnrollmentSuccess] =
    useState(false);

  const [enrollmentError, setEnrollmentError] =
    useState("");

  const [formData, setFormData] = useState({
    studentName: "",
    phone: "",
    email: "",
    education: "",
    city: "",
    message: "",
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError("");
        setImageError(false);

        const response = await fetch(
          `${API_URL}/courses/slug/${encodeURIComponent(slug)}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Unable to load course."
          );
        }

        setCourse(result.data);
      } catch (err) {
        console.error(
          "Course details error:",
          err
        );

        setError(
          err.message ||
            "Unable to load course."
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCourse();
    }
  }, [slug]);

  useEffect(() => {
    if (!showEnrollment) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !submitting) {
        closeEnrollmentForm();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showEnrollment, submitting]);

  /*
  |--------------------------------------------------------------------------
  | Enrollment helpers
  |--------------------------------------------------------------------------
  */

  const openEnrollmentForm = () => {
    setEnrollmentError("");
    setEnrollmentSuccess(false);
    setShowEnrollment(true);
  };

  const closeEnrollmentForm = () => {
    if (submitting) {
      return;
    }

    setShowEnrollment(false);
    setEnrollmentError("");
    setEnrollmentSuccess(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (enrollmentError) {
      setEnrollmentError("");
    }
  };

  const handleEnrollmentSubmit = async (
    event
  ) => {
    event.preventDefault();

    setEnrollmentError("");

    const studentName =
      formData.studentName.trim();

    const phone =
      formData.phone.trim();

    const email =
      formData.email.trim();

    const education =
      formData.education.trim();

    const city =
      formData.city.trim();

    const message =
      formData.message.trim();

    if (!studentName) {
      setEnrollmentError(
        "Please enter your full name."
      );
      return;
    }

    if (!phone) {
      setEnrollmentError(
        "Please enter your phone number."
      );
      return;
    }

    if (!email) {
      setEnrollmentError(
        "Please enter your email address."
      );
      return;
    }

    if (!education) {
      setEnrollmentError(
        "Please enter your education/class."
      );
      return;
    }

    if (!city) {
      setEnrollmentError(
        "Please enter your city."
      );
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `${API_URL}/enrollments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentName,
            phone,
            email,
            education,
            city,
            message,
            course: course._id,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to submit enrollment."
        );
      }

      setEnrollmentSuccess(true);

      setFormData({
        studentName: "",
        phone: "",
        email: "",
        education: "",
        city: "",
        message: "",
      });
    } catch (err) {
      console.error(
        "Enrollment error:",
        err
      );

      setEnrollmentError(
        err.message ||
          "Unable to submit enrollment. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Codexa Academy, I am interested in the "${course.name}" course.`
    );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <main
        className="min-h-[70vh] bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 sm:py-16"
        aria-busy="true"
        aria-label="Loading course details"
      >
        <div className="mx-auto max-w-7xl animate-pulse motion-reduce:animate-none">
          <div className="h-5 w-32 rounded bg-slate-200 dark:bg-slate-800" />

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="aspect-video rounded-2xl bg-slate-200 dark:bg-slate-800" />

            <div className="space-y-5">
              <div className="flex gap-2">
                <div className="h-7 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="h-7 w-28 rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-12 w-4/5 rounded-lg bg-slate-200 dark:bg-slate-800" />
              <div className="h-6 w-full rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="h-14 rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-14 rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-12 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Error / Course not found
  |--------------------------------------------------------------------------
  */

  if (error || !course) {
    return (
      <main className="min-h-[70vh] bg-slate-50 px-4 py-20 dark:bg-slate-950">
        <div className="mx-auto flex min-h-[500px] max-w-7xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-900">
              <BookOpen
                size={34}
                className="text-slate-300 dark:text-slate-600"
              />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
              Course not found
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-slate-500 dark:text-slate-400">
              The course you are looking for
              doesn't exist or is no longer
              available.
            </p>

            {error && (
              <p className="mx-auto mt-3 max-w-lg text-sm text-red-500">
                {error}
              </p>
            )}

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 motion-reduce:transform-none"
              >
                Try Again
              </button>

              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <ArrowLeft size={18} />
                Back to Courses
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Helpers
  |--------------------------------------------------------------------------
  */

  const learningOutcomes = Array.isArray(
    course.learningOutcomes
  )
    ? course.learningOutcomes
    : [];

  const syllabus = Array.isArray(
    course.syllabus
  )
    ? course.syllabus
    : [];

  const technologies = Array.isArray(
    course.technologies
  )
    ? course.technologies
    : [];

  const prerequisites = Array.isArray(
    course.prerequisites
  )
    ? course.prerequisites
    : [];

  /*
  |--------------------------------------------------------------------------
  | Page
  |--------------------------------------------------------------------------
  */

  return (
    <>
      <main className="bg-slate-50 dark:bg-slate-950">
        {/* Hero */}

        <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <Link
              to="/courses"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
            >
              <ArrowLeft size={17} />
              Back to Courses
            </Link>

            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              {/* Course Image */}

              <div className="overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                {course.image && !imageError ? (
                  <img
                    src={course.image}
                    alt={`${course.name} course`}
                    loading="eager"
                    onError={() => setImageError(true)}
                    className="aspect-video w-full object-cover transition duration-500 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-slate-100 via-white to-blue-50 dark:from-slate-800 dark:via-slate-900 dark:to-blue-950/40">
                    <BookOpen
                      size={70}
                      className="text-slate-300 dark:text-slate-600"
                    />
                  </div>
                )}
              </div>

              {/* Course Information */}

              <div>
                <div className="flex flex-wrap gap-2">
                  {course.category && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                      {course.category}
                    </span>
                  )}

                  {course.level && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {course.level}
                    </span>
                  )}

                  {course.featured && (
                    <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-600 dark:bg-purple-950 dark:text-purple-400">
                      Featured
                    </span>
                  )}
                </div>

                <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                  {course.name}
                </h1>

                {course.shortDescription && (
                  <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                    {course.shortDescription}
                  </p>
                )}

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {course.duration && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                        <Clock size={20} />
                      </div>

                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Duration
                        </p>

                        <p className="font-medium text-slate-900 dark:text-white">
                          {course.duration}
                        </p>
                      </div>
                    </div>
                  )}

                  {course.level && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
                        <GraduationCap
                          size={20}
                        />
                      </div>

                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Level
                        </p>

                        <p className="font-medium text-slate-900 dark:text-white">
                          {course.level}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {course.fee !== undefined && (
                  <div className="mt-8">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Course Fee
                    </p>

                    <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                      PKR{" "}
                      {Number(
                        course.fee
                      ).toLocaleString()}
                    </p>
                  </div>
                )}

                {/* Enrollment Actions */}

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={
                      openEnrollmentForm
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 motion-reduce:transform-none"
                  >
                    <Send size={18} />
                    Enroll Now
                  </button>

                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-6 py-3.5 font-semibold text-green-700 transition hover:-translate-y-0.5 hover:bg-green-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-500/30 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400 dark:hover:bg-green-950/50 motion-reduce:transform-none"
                  >
                    <MessageCircle
                      size={18}
                    />
                    WhatsApp Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            {/* Left */}

            <div className="space-y-8">
              {/* Description */}

              {course.description && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    About This Course
                  </h2>

                  <div className="mt-5 whitespace-pre-line leading-8 text-slate-600 dark:text-slate-300">
                    {course.description}
                  </div>
                </section>
              )}

              {/* Learning Outcomes */}

              {learningOutcomes.length >
                0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400">
                      <CheckCircle2
                        size={21}
                      />
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      What You'll Learn
                    </h2>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {learningOutcomes.map(
                      (
                        outcome,
                        index
                      ) => (
                        <div
                          key={index}
                          className="flex gap-3"
                        >
                          <CheckCircle2
                            size={19}
                            className="mt-1 shrink-0 text-green-500"
                          />

                          <span className="text-slate-600 dark:text-slate-300">
                            {outcome}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </section>
              )}

              {/* Syllabus */}

              {syllabus.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                      <BookOpen
                        size={21}
                      />
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Course Syllabus
                    </h2>
                  </div>

                  <div className="mt-6 space-y-5">
                    {syllabus.map(
                      (
                        module,
                        moduleIndex
                      ) => (
                        <div
                          key={
                            moduleIndex
                          }
                          className="rounded-xl border border-slate-200 p-5 dark:border-slate-700"
                        >
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            {module.title ||
                              module.name ||
                              `Module ${
                                moduleIndex +
                                1
                              }`}
                          </h3>

                          {Array.isArray(
                            module.topics
                          ) &&
                            module.topics
                              .length >
                              0 && (
                              <ul className="mt-4 space-y-2">
                                {module.topics.map(
                                  (
                                    topic,
                                    topicIndex
                                  ) => (
                                    <li
                                      key={
                                        topicIndex
                                      }
                                      className="flex gap-2 text-sm text-slate-600 dark:text-slate-300"
                                    >
                                      <span className="text-blue-600">
                                        •
                                      </span>

                                      {topic}
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                        </div>
                      )
                    )}
                  </div>
                </section>
              )}

              {/* Technologies */}

              {technologies.length >
                0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
                      <Code2
                        size={21}
                      />
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Technologies
                    </h2>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {technologies.map(
                      (
                        technology,
                        index
                      ) => (
                        <span
                          key={index}
                          className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {technology}
                        </span>
                      )
                    )}
                  </div>
                </section>
              )}

              {/* Prerequisites */}

              {prerequisites.length >
                0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Prerequisites
                  </h2>

                  <ul className="mt-5 space-y-3">
                    {prerequisites.map(
                      (
                        item,
                        index
                      ) => (
                        <li
                          key={index}
                          className="flex gap-3 text-slate-600 dark:text-slate-300"
                        >
                          <CheckCircle2
                            size={18}
                            className="mt-1 shrink-0 text-blue-500"
                          />

                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </section>
              )}
            </div>

            {/* Right Sidebar */}

            <aside>
              <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Course Summary
                </h3>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Level
                    </span>

                    <span className="font-medium text-slate-900 dark:text-white">
                      {course.level ||
                        "—"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Duration
                    </span>

                    <span className="font-medium text-slate-900 dark:text-white">
                      {course.duration ||
                        "—"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Category
                    </span>

                    <span className="font-medium text-slate-900 dark:text-white">
                      {course.category ||
                        "—"}
                    </span>
                  </div>

                  {course.certificate && (
                    <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3 dark:bg-green-950">
                      <Award
                        size={20}
                        className="text-green-600 dark:text-green-400"
                      />

                      <span className="text-sm font-medium text-green-700 dark:text-green-400">
                        Certificate Available
                      </span>
                    </div>
                  )}

                  {/* Sidebar CTA */}

                  <button
                    type="button"
                    onClick={
                      openEnrollmentForm
                    }
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Send size={18} />
                    Enroll Now
                  </button>

                  <a
                    href={`tel:${DISPLAY_PHONE}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <Phone size={17} />
                    Call {DISPLAY_PHONE}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* ================================================================= */}
      {/* ENROLLMENT MODAL */}
      {/* ================================================================= */}

      {showEnrollment && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeEnrollmentForm();
            }
          }}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
            role="dialog"
            aria-modal="true"
            aria-labelledby="enrollment-modal-title"
          >
            {/* Modal header */}

            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white px-5 py-5 dark:border-slate-800 dark:bg-slate-900 sm:px-7">
              <div>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Course Enrollment
                </p>

                <h2 id="enrollment-modal-title" className="mt-1 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                  {enrollmentSuccess
                    ? "Enrollment Submitted"
                    : "Enroll in This Course"}
                </h2>

                {!enrollmentSuccess && (
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {course.name}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={
                  closeEnrollmentForm
                }
                disabled={submitting}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label="Close enrollment form"
              >
                <X size={20} />
              </button>
            </div>

            {/* Success */}

            {enrollmentSuccess ? (
              <div className="px-5 py-12 text-center sm:px-8" role="status" aria-live="polite">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400">
                  <CheckCircle2
                    size={34}
                  />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                  Thank You!
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Your enrollment request for{" "}
                  <strong>
                    {course.name}
                  </strong>{" "}
                  has been submitted successfully.
                </p>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Our academy team will contact
                  you on your provided phone number
                  to discuss the course and
                  enrollment process.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
                  >
                    <MessageCircle
                      size={18}
                    />
                    Contact on WhatsApp
                  </button>

                  <a
                    href={`tel:${DISPLAY_PHONE}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
                  >
                    <Phone size={18} />
                    Call Academy
                  </a>
                </div>

                <button
                  type="button"
                  onClick={
                    closeEnrollmentForm
                  }
                  className="mt-5 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  Close
                </button>
              </div>
            ) : (
              /* Form */

              <form
                onSubmit={
                  handleEnrollmentSubmit
                }
                className="px-5 py-6 sm:px-7"
              >
                {/* Course selected */}

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    Selected Course
                  </p>

                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                    {course.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {course.duration ||
                      "Flexible duration"}{" "}
                    •{" "}
                    {course.fee !==
                    undefined
                      ? `PKR ${Number(
                          course.fee
                        ).toLocaleString()}`
                      : "Contact for fee"}
                  </p>
                </div>

                {/* Error */}

                {enrollmentError && (
                  <div
                    className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/20"
                    role="alert"
                    aria-live="assertive"
                  >
                    <p className="text-sm font-medium text-red-700 dark:text-red-400">
                      {enrollmentError}
                    </p>
                  </div>
                )}

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {/* Name */}

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="studentName"
                      className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Full Name{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="studentName"
                        name="studentName"
                        type="text"
                        value={
                          formData.studentName
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="Enter your full name"
                        autoComplete="name"
                        className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Phone Number{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={
                          formData.phone
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="03XXXXXXXXX"
                        autoComplete="tel"
                        className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Email Address{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={
                          formData.email
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Education */}

                  <div>
                    <label
                      htmlFor="education"
                      className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Education / Class{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <input
                      id="education"
                      name="education"
                      type="text"
                      value={
                        formData.education
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. Intermediate, BSCS"
                      autoComplete="organization-title"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      required
                    />
                  </div>

                  {/* City */}

                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                      City{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={
                          formData.city
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="e.g. Multan"
                        autoComplete="address-level2"
                        className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Message{" "}
                      <span className="font-normal text-slate-400">
                        (Optional)
                      </span>
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={
                        formData.message
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="Tell us anything you'd like to know about this course..."
                      className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                </div>

                {/* Notice */}

                <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                  <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                    By submitting this form, you
                    are requesting information and
                    enrollment assistance for this
                    course. Our academy team will
                    contact you using the provided
                    information.
                  </p>
                </div>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none"
                >
                  {submitting ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Enrollment
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs text-slate-400">
                  Or contact us directly at{" "}
                  <a
                    href={`tel:${DISPLAY_PHONE}`}
                    className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {DISPLAY_PHONE}
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CourseDetails;