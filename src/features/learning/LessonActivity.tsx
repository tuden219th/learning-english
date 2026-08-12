"use client";
import SpeakingActivity from "@/features/speaking/SpeakingActivity";  
import { useState } from "react";
import type { Activity } from "@/types/learning";

type LessonActivityProps = {
  activity: Activity;
  onComplete: (activityId: string) => void;
};

export default function LessonActivity({
  activity,
  onComplete,
}: LessonActivityProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(
    null,
  );

  const [result, setResult] = useState<"correct" | "wrong" | null>(
    null,
  );

  function handleAnswer(answer: string) {
    if (result === "correct") {
      return;
    }

    setSelectedAnswer(answer);

    if (
      activity.content.kind === "practice" &&
      activity.content.answer === answer
    ) {
      setResult("correct");
      onComplete(activity.id);
    } else {
      setResult("wrong");
    }
  }

  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-8">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-emerald-400">
            {activity.type.replace("-", " ")}
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            {activity.title}
          </h2>
        </div>

        <span className="text-sm text-white/30">
          {String(activity.order).padStart(2, "0")}
        </span>
      </div>

      {/* INSTRUCTIONS */}
      <p className="mt-4 text-sm leading-6 text-white/50">
        {activity.instructions}
      </p>

      {/* VOCABULARY */}
      {activity.content.kind === "vocabulary" && (
        <div className="mt-6">
          <p className="text-3xl font-bold">
            {activity.content.word}
          </p>

          <p className="mt-2 text-emerald-400">
            {activity.content.meaning}
          </p>

          {activity.content.pronunciation && (
            <p className="mt-2 text-sm text-white/40">
              / {activity.content.pronunciation} /
            </p>
          )}

          <div className="mt-6 rounded-2xl bg-black/20 p-5">
            <p className="text-sm text-white/40">
              Example
            </p>

            <p className="mt-2 text-lg">
              {activity.content.example}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onComplete(activity.id)}
            className="mt-5 rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            Got it
          </button>
        </div>
      )}

      {/* LISTENING */}
      
        {activity.content.kind === "listening" && (
          <div className="mt-6 rounded-2xl bg-black/20 p-5">
            <p className="text-sm text-white/40">
              Listen carefully
            </p>

            <p className="mt-3 text-lg leading-8">
              {activity.content.transcript}
            </p>

            <audio
              controls
              className="mt-5 w-full"
              src={activity.content.audioUrl}
            />

            <button
              type="button"
              onClick={() => onComplete(activity.id)}
              className="mt-5 rounded-xl bg-white/10 px-5 py-3 text-sm font-medium transition hover:bg-white/20"
            >
              ✓ I listened
            </button>
          </div>
        )}

      {/* SPEAKING */}
      {activity.content.kind === "speaking" && (
        <SpeakingActivity
          activity={activity}
          onComplete={onComplete}
        />
      )}
      

      {/* PRACTICE */}
      {activity.content.kind === "practice" && (
        <div className="mt-6">
          <p className="text-lg font-medium">
            {activity.content.question}
          </p>

          {activity.content.options && (
            <div className="mt-5 grid gap-3">
              {activity.content.options.map((option) => {
                const isSelected = selectedAnswer === option;

                const isCorrect =
                  activity.content.kind === "practice" &&
                  activity.content.answer === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleAnswer(option)}
                    className={`rounded-xl border p-4 text-left transition ${
                      isSelected && isCorrect
                        ? "border-emerald-400 bg-emerald-400/10"
                        : isSelected && result === "wrong"
                          ? "border-red-400 bg-red-400/10"
                          : "border-white/10 bg-black/10 hover:border-emerald-400/50 hover:bg-white/5"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          )}

          {/* CORRECT */}
          {result === "correct" && (
            <div className="mt-5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4">
              <p className="font-semibold text-emerald-400">
                ✓ Correct!
              </p>

              <p className="mt-1 text-sm text-white/50">
                Great job. This activity is complete.
              </p>
            </div>
          )}

          {/* WRONG */}
          {result === "wrong" && (
            <div className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 p-4">
              <p className="font-semibold text-red-400">
                Not quite.
              </p>

              <p className="mt-1 text-sm text-white/50">
                Try again.
              </p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}