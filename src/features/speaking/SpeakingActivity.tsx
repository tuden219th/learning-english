"use client";

import { useEffect, useRef, useState } from "react";

import type { Activity } from "@/types/learning";

import {
  getSpeechRecognition,
  type SpeechRecognitionInstance,
} from "./speech";

type SpeakingActivityProps = {
  activity: Activity;
  onComplete: (activityId: string) => void;
};

export default function SpeakingActivity({
  activity,
  onComplete,
}: SpeakingActivityProps) {
  const recognitionRef =
    useRef<SpeechRecognitionInstance | null>(null);

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  if (activity.content.kind !== "speaking") {
    return null;
  }

  const expectedAnswer = activity.content.expectedAnswer ?? "";

  function startSpeaking() {
    setError(null);
    setTranscript("");

    const recognition = getSpeechRecognition();

    if (!recognition) {
      setError(
        "Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.",
      );
      return;
    }

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const result = event.results[0][0];

      if (!result) {
        return;
      }

      setTranscript(result.transcript);
    };

    recognition.onerror = (event) => {
      setIsListening(false);

      if (event.error === "not-allowed") {
        setError(
          "Microphone permission was denied. Please allow microphone access and try again.",
        );
        return;
      }

      setError(
        `Speech recognition error: ${event.error}`,
      );
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    setIsListening(true);
    recognition.start();
  }

  function stopSpeaking() {
    recognitionRef.current?.stop();
    setIsListening(false);
  }

  function completeActivity() {
    if (!transcript.trim()) {
      setError("Please speak the sentence first.");
      return;
    }

    onComplete(activity.id);
  }

  return (
    <div className="mt-6 rounded-2xl bg-black/20 p-5">
      <p className="text-sm text-white/40">
        Say this:
      </p>

      <p className="mt-3 text-xl leading-8">
        {activity.content.prompt}
      </p>

      {/* MICROPHONE */}
      <div className="mt-6">
        {!isListening ? (
          <button
            type="button"
            onClick={startSpeaking}
            className="rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            🎤 Start Speaking
          </button>
        ) : (
          <button
            type="button"
            onClick={stopSpeaking}
            className="rounded-xl bg-red-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-red-300"
          >
            ⏹ Stop Recording
          </button>
        )}
      </div>

      {/* RESULT */}
      {transcript && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/40">
            You said:
          </p>

          <p className="mt-2 text-lg">
            {transcript}
          </p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 p-4">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* COMPLETE */}
      {transcript && (
        <button
          type="button"
          onClick={completeActivity}
          className="mt-5 rounded-xl bg-white/10 px-5 py-3 text-sm font-medium transition hover:bg-white/20"
        >
          ✓ I Practiced
        </button>
      )}

      {/* EXPECTED ANSWER */}
      {expectedAnswer && transcript && (
        <p className="mt-4 text-xs text-white/30">
          Target: {expectedAnswer}
        </p>
      )}
    </div>
  );
}