import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Laptop,
  Rocket,
  Sparkles,
  Users,
} from "lucide-react";

import Button from "../../components/common/Button";
import demoCourses from "../../utils/demoCourses";
import CourseCard from "../../components/courses/CourseCard";

const benefits = [
  {
    icon: Laptop,
    title: "Practical Learning",
    description:
      "Learn through hands-on exercises, practical examples, assignments, and real-world scenarios.",
  },
  {
    icon: Code2,
    title: "Industry-Relevant Skills",
    description:
      "Build technology skills designed around today's digital and professional environment.",
  },
  {
    icon: Rocket,
    title: "Career-Focused",
    description:
      "Develop practical abilities that can help you move from learning toward real opportunities.",
  },
  {
    icon: Users,
    title: "Supportive Environment",
    description:
      "Learn in a student-friendly environment where questions, practice, and experimentation are encouraged.",
  },
];

const learningPoints = [
  "Hands-on exercises and practical examples",
  "Project-based learning",
  "Beginner-friendly approach",
  "Real-world technology scenarios",
  "Structured learning paths",
  "Focus on valuable digital skills",
];

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300">
              <Sparkles size={16} />
              Practical IT Education
            </div>

            <h1 className="mt-7 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
              Where Skills Become{" "}
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Possibilities.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-400">
              Codexa Academy is a modern IT academy focused on practical,
              career-oriented technology education. Build real-world digital
              skills through structured learning, hands-on practice, and
              meaningful projects.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Button to="/courses">
                Explore Courses
                <ArrowRight size={18} />
              </Button>

              <Button to="/contact" variant="outline">
                Contact Us
              </Button>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-blue-600" />
                Practical learning
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-blue-600" />
                Career-focused
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-blue-600" />
                Student-friendly
              </span>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-5 shadow-2xl dark:border-slate-800">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                      <Code2 size={21} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        Codexa Academy
                      </p>
                      <p className="text-xs text-slate-500">
                        Learn • Build • Grow
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                    Learning
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-gradient-to-br from-blue-600/20 via-slate-900 to-purple-600/20 p-6">
                  <p className="text-sm font-medium text-blue-300">
                    Your next skill
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-white">
                    Build. Practice. Create.
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Turn technology concepts into practical skills through
                    projects and hands-on learning.
                  </p>

                  <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                    <BookOpen className="text-blue-400" size={21} />
                    <p className="mt-3 text-sm font-semibold text-white">
                      Structured
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Learning paths
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                    <Rocket className="text-purple-400" size={21} />
                    <p className="mt-3 text-sm font-semibold text-white">
                      Practical
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Real-world skills
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Learn by Doing
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Practice matters
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Learn With Purpose
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Technology education built around practical skills
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
              We believe technology becomes valuable when you can actually use
              it. Our approach focuses on understanding concepts, practicing
              them, and applying them to meaningful tasks and projects.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Why Codexa
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              A better way to build technology skills
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
              Learn in an environment designed to make technology easier to
              understand, practice, and apply.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/50 dark:text-blue-400">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Approach */}
      <section className="overflow-hidden bg-slate-950 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Our Learning Approach
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Learn by doing, not just by watching.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              We focus on practical learning. Students explore concepts
              through examples, exercises, projects, assignments, and
              real-world scenarios.
            </p>

            <div className="mt-8">
              <Button to="/about" variant="secondary">
                Discover Our Approach
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {learningPoints.map((point, index) => (
              <div
                key={point}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-sm font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="pt-1 text-sm font-medium leading-6 text-slate-200">
                    {point}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Placeholder */}
      {/* Courses */}
          <section className="bg-white py-24 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div className="max-w-2xl">
                  <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Featured Learning
                  </span>

                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                    Start building skills that matter
                  </h2>

                  <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                    Explore practical technology courses designed around real-world
                    skills and hands-on learning.
                  </p>
                </div>

                <Button to="/courses" variant="outline">
                  View All Courses
                  <ArrowRight size={17} />
                </Button>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {demoCourses
                  .filter((course) => course.featured)
                  .slice(0, 3)
                  .map((course) => (
                    <CourseCard key={course._id} course={course} />
                  ))}
              </div>
            </div>
          </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-14 text-center shadow-xl sm:px-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to build your next skill?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-50">
            Explore our upcoming technology courses or contact Codexa Academy
            to learn more about available learning opportunities.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              to="/courses"
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              Explore Courses
              <ArrowRight size={18} />
            </Button>

            <Button
              to="/contact"
              className="border border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;