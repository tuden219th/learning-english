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

type SpeakingResult = "excellent" | "good" | "try-again" | null;

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function similarityScore(expected: string, actual: string) {
  const expectedWords = normalizeText(expected).split(" ");
  const actualWords = normalizeText(actual).split(" ");

  if (!expectedWords.length || !actualWords.length) {
    return 0;
  }

  let matchedWords = 0;

  for (const word of expectedWords) {
    if (actualWords.includes(word)) {
      matchedWords++;
    }
  }

  return matchedWords / expectedWords.length;
}

export default function SpeakingActivity({
  activity,
  onComplete,
}: SpeakingActivityProps) {
  const recognitionRef =
    useRef<SpeechRecognitionInstance | null>(null);

  const shouldListenRef = useRef(false);

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SpeakingResult>(null);

  useEffect(() => {
    return () => {
      shouldListenRef.current = false;
      recognitionRef.current?.stop();
      recognitionRef.current = null;
    };
  }, []);

  if (activity.content.kind !== "speaking") {
    return null;
  }

  const expectedAnswer = activity.content.expectedAnswer ?? "";

  function startRecognition(
    recognition: SpeechRecognitionInstance,
  ) {
    try {
      recognition.start();
    } catch {
      // Browser may throw if recognition is already running.
    }
  }

  function startSpeaking() {
    setError(null);
    setTranscript("");
    setResult(null);

    const recognition = getSpeechRecognition();

    if (!recognition) {
      setError(
        "Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.",
      );
      return;
    }

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    shouldListenRef.current = true;

    recognition.onresult = (event) => {
      const speechResult = event.results[0]?.[0];

      if (!speechResult) {
        return;
      }

      setTranscript((current) => {
        const newText = speechResult.transcript.trim();

        if (!newText) {
          return current;
        }

        if (!current) {
          return newText;
        }

        return `${current} ${newText}`;
      });
    };

    recognition.onerror = (event) => {
      if (event.error === "not-allowed") {
        shouldListenRef.current = false;
        setIsListening(false);

        setError(
          "Microphone permission was denied. Please allow microphone access and try again.",
        );

        return;
      }

      if (event.error === "no-speech") {
        return;
      }

      setError(`Speech recognition error: ${event.error}`);
    };

    recognition.onend = () => {
      if (!shouldListenRef.current) {
        setIsListening(false);
        return;
      }

      // Browser sometimes stops recognition automatically
      // after a period of silence. Restart it while the user
      // is still in speaking mode.
      startRecognition(recognition);
    };

    recognitionRef.current = recognition;

    setIsListening(true);

    startRecognition(recognition);
  }

  function stopSpeaking() {
    shouldListenRef.current = false;

    const recognition = recognitionRef.current;

    recognitionRef.current = null;

    setIsListening(false);

    recognition?.stop();
  }

  function evaluateSpeaking() {
    if (!transcript.trim()) {
      setError("Please speak the sentence first.");
      return;
    }

    const score = similarityScore(expectedAnswer, transcript);

    if (score >= 0.85) {
      setResult("excellent");
      onComplete(activity.id);
      return;
    }

    if (score >= 0.6) {
      setResult("good");
      onComplete(activity.id);
      return;
    }

    setResult("try-again");
  }

  return (
    <div className="mt-6 rounded-2xl bg-black/20 p-5">
      {/* TARGET */}
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

      {/* FEEDBACK */}
      {result === "excellent" && (
        <div className="mt-5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4">
          <p className="font-semibold text-emerald-400">
            ✓ Excellent!
          </p>

          <p className="mt-1 text-sm text-white/50">
            Your sentence is very close to the target.
          </p>
        </div>
      )}

      {result === "good" && (
        <div className="mt-5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4">
          <p className="font-semibold text-emerald-400">
            ✓ Good job!
          </p>

          <p className="mt-1 text-sm text-white/50">
            You got most of the sentence right.
          </p>
        </div>
      )}

      {result === "try-again" && (
        <div className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 p-4">
          <p className="font-semibold text-red-400">
            Try again.
          </p>

          <p className="mt-1 text-sm text-white/50">
            Listen to the target sentence and try speaking it again.
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

      {/* CHECK ANSWER */}
      {transcript &&
        result !== "excellent" &&
        result !== "good" && (
          <button
            type="button"
            onClick={evaluateSpeaking}
            className="mt-5 rounded-xl bg-white/10 px-5 py-3 text-sm font-medium transition hover:bg-white/20"
          >
            ✓ Check My Speaking
          </button>
        )}

      {/* TARGET */}
      {expectedAnswer && transcript && (
        <p className="mt-4 text-xs text-white/30">
          Target: {expectedAnswer}
        </p>
      )}
    </div>
  );
}