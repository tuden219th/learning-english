import type { Metadata } from "next";
import Link from "next/link";

import {
  courses,
  getLessonActivities,
  lessons,
  modules,
} from "@/features/learning/catalog";

import LessonClient from "@/features/learning/LessonClient";

type LessonPageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { lessonId } = await params;

  const lesson = lessons.find((item) => item.id === lessonId);

  if (!lesson) {
    return {
      title: "Lesson Not Found",
      description: "The requested English lesson could not be found.",
    };
  }

  const module = modules.find(
    (item) => item.id === lesson.moduleId,
  );

  const course = courses.find(
    (item) => item.id === module?.courseId,
  );

  const title = `${lesson.title} — ${course?.title ?? "English Từ Đến"}`;

  return {
    title,
    description: lesson.description,

    alternates: {
      canonical: `/lesson/${lesson.id}`,
    },

    openGraph: {
      type: "article",
      title,
      description: lesson.description,
      url: `/lesson/${lesson.id}`,
      siteName: "English Từ Đến",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LessonPage({
  params,
}: LessonPageProps) {
  const { lessonId } = await params;

  const lesson = lessons.find((item) => item.id === lessonId);

  if (!lesson) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <h1 className="text-2xl font-bold">
          Lesson not found
        </h1>
      </main>
    );
  }

  const module = modules.find(
    (item) => item.id === lesson.moduleId,
  );

  const course = courses.find(
    (item) => item.id === module?.courseId,
  );

  const lessonActivities = getLessonActivities(lesson.id);

  const lessonUrl =
    `https://english.tudencafe.com/lesson/${lesson.id}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    description: lesson.description,
    url: lessonUrl,
    inLanguage: "en",
    educationalLevel: "Beginner",
    learningResourceType: "Lesson",
    isPartOf: {
      "@type": "Course",
      name: course?.title ?? "English Từ Đến",
      url: course
        ? `https://english.tudencafe.com/course/${course.id}`
        : "https://english.tudencafe.com",
    },
    teaches: lesson.title,
    provider: {
      "@type": "Organization",
      name: "English Từ Đến",
      url: "https://english.tudencafe.com",
    },
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link
          href={`/module/${module?.id}`}
          className="text-sm text-emerald-400 hover:text-emerald-300"
        >
          ← Back to Module
        </Link>

        <div className="mt-12">
          <p className="text-sm text-emerald-400">
            {course?.title}
          </p>

          <p className="mt-2 text-sm text-white/40">
            {module?.title}
          </p>

          <h1 className="mt-6 text-4xl font-bold">
            {lesson.title}
          </h1>

          <p className="mt-4 text-lg leading-8 text-white/60">
            {lesson.description}
          </p>
        </div>

        <LessonClient activities={lessonActivities} />
      </div>
    </main>
  );
}