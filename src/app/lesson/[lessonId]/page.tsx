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

  return (
    <main className="min-h-screen bg-slate-950 text-white">
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