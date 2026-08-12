import Link from "next/link";
import {
  courses,
  modules,
} from "@/features/learning/catalog";

type CoursePageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export default async function CoursePage({
  params,
}: CoursePageProps) {
  const { courseId } = await params;

  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <h1 className="text-2xl font-bold">Course not found</h1>
      </main>
    );
  }

  const courseModules = modules
    .filter((module) => module.courseId === course.id)
    .sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/"
          className="text-sm text-emerald-400 hover:text-emerald-300"
        >
          ← Back to Home
        </Link>

        <p className="mt-10 text-sm text-emerald-400">
          {course.level}
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          {course.title}
        </h1>

        <p className="mt-4 text-white/60">
          {course.description}
        </p>

        <div className="mt-10 space-y-4">
          {courseModules.map((module) => (
            <Link
              key={module.id}
              href={`/module/${module.id}`}
              className="block rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400/40 hover:bg-white/10"
            >
              <p className="text-sm text-emerald-400">
                Module {String(module.order).padStart(2, "0")}
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                {module.title}
              </h2>

              <p className="mt-2 text-sm text-white/50">
                {module.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}