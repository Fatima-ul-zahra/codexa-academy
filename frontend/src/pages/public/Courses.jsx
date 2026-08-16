import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

import Button from "../../components/common/Button";
import CourseCard from "../../components/courses/CourseCard";
import CourseFilters from "../../components/courses/CourseFilters";
import { getCourses } from "../../services/courseService";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Load courses from MongoDB
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let cancelled = false;

    const loadCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getCourses();

        if (cancelled) {
          return;
        }

        setCourses(
          Array.isArray(result?.data)
            ? result.data
            : []
        );
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error("Failed to load courses:", error);

        setError(
          error.message ||
            "Unable to load courses right now."
        );

        setCourses([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadCourses();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Categories
  |--------------------------------------------------------------------------
  */

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        courses
          .map((course) => course.category)
          .filter(Boolean)
      ),
    ];
  }, [courses]);

  /*
  |--------------------------------------------------------------------------
  | Filter courses
  |--------------------------------------------------------------------------
  */

  const filteredCourses = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return courses.filter((course) => {
      const courseName = (
        course.name || ""
      ).toLowerCase();

      const shortDescription = (
        course.shortDescription || ""
      ).toLowerCase();

      const courseCategory = (
        course.category || ""
      ).toLowerCase();

      const matchesSearch =
        !searchValue ||
        courseName.includes(searchValue) ||
        shortDescription.includes(searchValue) ||
        courseCategory.includes(searchValue);

      const matchesCategory =
        category === "All" ||
        course.category === category;

      const matchesLevel =
        level === "All" ||
        course.level === level;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLevel
      );
    });
  }, [courses, search, category, level]);

  /*
  |--------------------------------------------------------------------------
  | Clear filters
  |--------------------------------------------------------------------------
  */

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setLevel("All");
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              <Sparkles size={16} />
              Learn. Practice. Build.
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Explore our{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                technology courses.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Build practical digital skills through
              structured learning, hands-on exercises,
              and real-world projects.
            </p>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="bg-slate-50 py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Filters */}
          <CourseFilters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            level={level}
            setLevel={setLevel}
            categories={categories}
            onClear={clearFilters}
          />

          {/* Results heading */}
          <div className="mt-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing
              </p>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {loading
                  ? "Loading..."
                  : `${filteredCourses.length} ${
                      filteredCourses.length === 1
                        ? "Course"
                        : "Courses"
                    }`}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <BookOpen size={17} />
              Practical technology education
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
              <BookOpen
                size={40}
                className="mx-auto animate-pulse text-slate-300 dark:text-slate-700"
              />

              <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                Loading courses...
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                Please wait while we load courses from
                Codexa Academy.
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 px-6 py-16 text-center dark:border-red-900/50 dark:bg-red-950/20">
              <h3 className="text-xl font-bold text-red-700 dark:text-red-400">
                Unable to load courses
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-red-600 dark:text-red-400">
                {error}
              </p>

              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* Courses */}
          {!loading &&
            !error &&
            filteredCourses.length > 0 && (
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                  />
                ))}
              </div>
            )}

          {/* No courses */}
          {!loading &&
            !error &&
            filteredCourses.length === 0 && (
              <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
                <BookOpen
                  size={40}
                  className="mx-auto text-slate-300 dark:text-slate-700"
                />

                <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                  No courses found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Try changing your search or filters.
                </p>

                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-4 py-20 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Not sure which course is right for you?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-50">
            Contact Codexa Academy and discuss your
            learning goals with us.
          </p>

          <div className="mt-8">
            <Button
              to="/contact"
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              Contact Us
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Courses;