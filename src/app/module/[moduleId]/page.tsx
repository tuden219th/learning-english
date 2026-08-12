import Link from "next/link";
import {
  courses,
  getLessonActivities,
  lessons,
  modules,
} from "@/features/learning/catalog";

type ModulePageProps = {
  params: Promise<{
    moduleId: string;
  }>;
};

export default async function ModulePage({
  params,
}: ModulePageProps) {
  const { moduleId } = await params;

  const module = modules.find((item) => item.id === moduleId);

  if (!module) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <h1 className="text-2xl font-bold">Module not found</h1>
      </main>
    );
  }

  const course = courses.find(
    (item) => item.id === module.courseId,
  );

  const moduleLessons = lessons
    .filter((lesson) => lesson.moduleId === module.id)
    .sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href={`/course/${course?.id}`}
          className="text-sm text-emerald-400 hover:text-emerald-300"
        >
          ← Back to Course
        </Link>

        <p className="mt-10 text-sm text-emerald-400">
          Module {String(module.order).padStart(2, "0")}
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          {module.title}
        </h1>

        <p className="mt-4 text-white/60">
          {module.description}
        </p>

        <div className="mt-10 space-y-4">
          {moduleLessons.map((lesson) => {
            const lessonActivities = getLessonActivities(lesson.id);

            return (
              <Link
                key={lesson.id}
                href={`/lesson/${lesson.id}`}
                className="block rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400/40 hover:bg-white/10"
              >
                <p className="text-sm text-emerald-400">
                  Lesson {String(lesson.order).padStart(2, "0")}
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  {lesson.title}
                </h2>

                <p className="mt-2 text-sm text-white/50">
                  {lesson.description}
                </p>

                {lessonActivities.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {lessonActivities.map((activity) => (
                      <span
                        key={activity.id}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs capitalize text-white/50"
                      >
                        {activity.type.replace("-", " ")}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}