import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Code2,
  GraduationCap,
  Laptop,
  Target,
  Users,
} from "lucide-react";

import Button from "../../components/common/Button";

const values = [
  {
    icon: Laptop,
    title: "Practical Learning",
    description:
      "We focus on learning through practical examples, exercises, assignments, and projects.",
  },
  {
    icon: Target,
    title: "Career Focus",
    description:
      "Our approach emphasizes useful technology skills that can be applied beyond the classroom.",
  },
  {
    icon: Users,
    title: "Student Friendly",
    description:
      "We aim to create a supportive environment where students can learn, ask questions, and practice confidently.",
  },
  {
    icon: Brain,
    title: "Modern Skills",
    description:
      "Our learning direction stays focused on relevant digital and technology skills.",
  },
];

const approach = [
  "Understand the concept",
  "Practice with guided examples",
  "Apply the skill through exercises",
  "Build practical projects",
  "Develop confidence through repetition",
];

function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              <Code2 size={16} />
              About Codexa Academy
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Building practical skills for the{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                digital world.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Codexa Academy is a modern IT academy focused on practical,
              career-oriented technology education. We help students develop
              real-world digital skills through structured courses, hands-on
              projects, and practical learning.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white py-24 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Who We Are
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Education designed around doing.
            </h2>

            <p className="mt-6 leading-8 text-slate-600 dark:text-slate-400">
              Codexa Academy is built around a simple idea: technology skills
              become more valuable when learners can actually apply them.
            </p>

            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-400">
              Our learning philosophy combines structured education with
              practical exercises, projects, assignments, and real-world
              scenarios so students can gradually move from understanding
              concepts to using them confidently.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <GraduationCap size={28} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                Where Skills Become Possibilities.
              </h3>

              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                We want learners to leave their learning journey with more
                than theoretical knowledge. The goal is practical confidence,
                useful digital skills, and the ability to continue learning
                in a changing technology landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-y border-slate-200 bg-slate-50 py-24 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                <Target size={24} />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Our Mission
              </p>

              <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                Make technology education practical and accessible.
              </h2>

              <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                To provide practical, accessible, and career-focused IT
                education that helps students build valuable digital skills
                and turn their knowledge into real-world opportunities.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
                <ArrowRight size={24} />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Our Vision
              </p>

              <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                Empower learners for an evolving digital world.
              </h2>

              <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                To become a trusted technology education platform that
                empowers students with modern IT skills and prepares them for
                the evolving digital world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Why Choose Us
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              What makes our approach different
            </h2>

            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
              We focus on creating a learning experience that is practical,
              supportive, and relevant to today's technology environment.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 text-blue-600 dark:text-blue-400">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-6 font-bold text-slate-900 dark:text-white">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teaching Approach */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-purple-400">
              Teaching Approach
            </span>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Learn. Practice. Build.
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-slate-400">
              We focus on learning by doing. Students learn concepts through
              practical examples, hands-on exercises, projects, assignments,
              and real-world scenarios rather than relying only on theory.
            </p>
          </div>

          <div className="space-y-3">
            {approach.map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-sm font-bold">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <span className="font-medium text-slate-200">
                  {item}
                </span>

                <CheckCircle2
                  size={18}
                  className="ml-auto shrink-0 text-emerald-400"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-4 py-20 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to start learning?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-50">
            Explore the courses available at Codexa Academy or contact us to
            discuss your learning goals.
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

export default About;