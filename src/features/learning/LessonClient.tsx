"use client";

import { useState } from "react";

import type { Activity } from "@/types/learning";

import LessonActivity from "./LessonActivity";

type LessonClientProps = {
  activities: Activity[];
};

export default function LessonClient({
  activities,
}: LessonClientProps) {
  const [completedActivities, setCompletedActivities] = useState<
    string[]
  >([]);

  function handleComplete(activityId: string) {
    setCompletedActivities((current) => {
      if (current.includes(activityId)) {
        return current;
      }

      return [...current, activityId];
    });
  }

  const total = activities.length;
  const completed = completedActivities.length;

  const progress =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <>
      {/* PROGRESS */}
      <div className="mt-10">
        <div className="flex justify-between text-sm">
          <span className="text-white/50">
            Lesson progress
          </span>

          <span className="text-emerald-400">
            {completed} / {total}
          </span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-2 text-right text-xs text-white/30">
          {progress}% complete
        </p>
      </div>

      {/* ACTIVITIES */}
      <section className="mt-12 space-y-6">
        {activities.map((activity) => (
          <LessonActivity
            key={activity.id}
            activity={activity}
            onComplete={handleComplete}
          />
        ))}
      </section>

      {/* COMPLETE */}
      {completed === total && total > 0 && (
        <div className="mt-10 rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-8 text-center">
          <p className="text-3xl">🎉</p>

          <h2 className="mt-3 text-2xl font-bold text-emerald-400">
            Lesson Complete!
          </h2>

          <p className="mt-2 text-white/50">
            You completed all activities in this lesson.
          </p>
        </div>
      )}
    </>
  );
}