import type { Metadata } from "next";
import Link from "next/link";

import TudenMark from "@/components/TudenMark";
import {
  courses,
  languages,
  learningPaths,
  modules,
  lessons,
} from "@/features/learning/catalog";

export const metadata: Metadata = {
  title: "Learn English for Real Life",
  description:
    "English Từ Đến is a practical English learning platform with structured courses, real-life lessons, speaking practice, vocabulary, listening, and activities.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    title: "Learn English for Real Life | English Từ Đến",
    description:
      "Learn practical English through structured courses, real-life lessons, speaking practice, vocabulary, and activities.",
    url: "/",
    siteName: "English Từ Đến",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const BASE_URL = "https://english.tudencafe.com";

export default function Home() {
  const english = languages.find(
    (language) => language.id === "english",
  );

  const path = learningPaths.find(
    (learningPath) =>
      learningPath.id === "english-singapore-cafe-owner",
  );

  const course = courses.find(
    (item) => item.id === "english-cafe-beginner",
  );

  const courseModules = modules
    .filter((module) => module.courseId === course?.id)
    .sort((a, b) => a.order - b.order);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "English Từ Đến",
        url: BASE_URL,
        description:
          "A practical English learning platform for real-life communication.",
        inLanguage: "en",
      },
      {
        "@type": "Organization",
        name: "English Từ Đến",
        url: BASE_URL,
        description:
          "A practical English learning platform with structured courses and real-life lessons.",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <TudenMark />

      {/* HEADER */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-medium text-emerald-400">
              LEARNING PLATFORM
            </p>

            <h1 className="mt-1 text-xl font-semibold">
              Learning English
            </h1>
          </div>

          <div className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70">
            {english?.name}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
            Your learning journey
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {path?.title}
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/60">
            {path?.description}
          </p>
        </div>

        {/* COURSE CARD */}
        {course && (
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm text-emerald-400">
                  {course.level}
                </p>

                <h3 className="mt-2 text-2xl font-semibold">
                  {course.title}
                </h3>

                <p className="mt-3 max-w-2xl text-white/60">
                  {course.description}
                </p>
              </div>

              <Link
                href={`/course/${course.id}`}
                className="rounded-xl bg-emerald-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Start learning
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* MODULES */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-8">
          <p className="text-sm font-medium text-white/40">
            COURSE CONTENT
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            {course?.title}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {courseModules.map((module) => {
            const moduleLessons = lessons
              .filter(
                (lesson) => lesson.moduleId === module.id,
              )
              .sort((a, b) => a.order - b.order);

            return (
              <article
                key={module.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-emerald-400">
                      Module{" "}
                      {String(module.order).padStart(2, "0")}
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      {module.title}
                    </h3>
                  </div>

                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/50">
                    {moduleLessons.length} lesson
                    {moduleLessons.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/50">
                  {module.description}
                </p>

                {moduleLessons.length > 0 && (
                  <div className="mt-6 space-y-2">
                    {moduleLessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="rounded-xl border border-white/10 bg-black/10 px-4 py-3"
                      >
                        <p className="text-sm font-medium">
                          {lesson.title}
                        </p>

                        <p className="mt-1 text-xs text-white/40">
                          {lesson.activities.join(" · ")}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-white/30">
          Learning Platform · Built for practical language learning
        </div>
      </footer>
    </main>
  );
}