"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Clock, Flag } from "lucide-react";
import { ResultDialog } from "@/components/result-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { addScore } from "@/lib/storage";
import { cn } from "cn";
import type { QuizQuestion } from "@/lib/types";

const LETTERS = ["A", "B", "C", "D", "E"];

export function QuizRunner({
  questions,
  topic,
  source,
  onExit,
  onRetry,
  timeLimitSec,
}: {
  questions: QuizQuestion[];
  topic: string;
  source: "tryout" | "pdf";
  onExit?: () => void;
  onRetry?: () => void;
  timeLimitSec?: number;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [resultOpen, setResultOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [remaining, setRemaining] = useState(timeLimitSec ?? 0);

  const question = questions[index];
  const answeredCount = answers.filter((a) => a !== null).length;
  const questionRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!resultOpen) questionRef.current?.focus();
  }, [index, resultOpen]);

  useEffect(() => {
    if (resultOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      function setAnswer(optionIndex: number) {
        setAnswers((prev) => {
          const next = [...prev];
          next[index] = optionIndex;
          return next;
        });
      }

      const letter = ["a", "b", "c", "d"].indexOf(e.key.toLowerCase());
      const num = ["1", "2", "3", "4"].indexOf(e.key);
      const picked = letter !== -1 ? letter : num;

      if (picked !== -1 && picked < question.options.length) {
        e.preventDefault();
        setAnswer(picked);
      } else if (e.key === "ArrowRight" && index < questions.length - 1) {
        e.preventDefault();
        setIndex((i) => i + 1);
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        setIndex((i) => i - 1);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [resultOpen, index, question.options.length, questions.length]);

  function select(optionIndex: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optionIndex;
      return next;
    });
  }

  function finish() {
    const finalScore = questions.reduce(
      (acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0),
      0
    );
    setScore(finalScore);
    addScore({ topic, score: finalScore, total: questions.length, source });
    setResultOpen(true);
  }

  const finishRef = useRef(finish);
  useEffect(() => {
    finishRef.current = finish;
  });

  useEffect(() => {
    if (!timeLimitSec || resultOpen) return;
    const id = setInterval(
      () => setRemaining((r) => Math.max(0, r - 1)),
      1000
    );
    return () => clearInterval(id);
  }, [timeLimitSec, resultOpen]);

  useEffect(() => {
    if (timeLimitSec && remaining === 0 && !resultOpen) {
      finishRef.current();
    }
  }, [remaining, resultOpen, timeLimitSec]);

  function retry() {
    setAnswers(Array(questions.length).fill(null));
    setIndex(0);
    setResultOpen(false);
    setRemaining(timeLimitSec ?? 0);
    onRetry?.();
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">
            Soal {index + 1} dari {questions.length}
          </Badge>
          <Badge variant="outline">{topic}</Badge>
        </div>
        <div className="flex items-center gap-3">
          {timeLimitSec ? (
            <Badge
              variant="outline"
              className={cn(
                "tabular-nums",
                remaining <= 60 &&
                  "border-destructive/60 bg-destructive/10 text-destructive"
              )}
            >
              <Clock className="size-3.5" />
              {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}
            </Badge>
          ) : null}
          <span className="shrink-0 text-xs text-muted-foreground">
            Terjawab {answeredCount}/{questions.length}
          </span>
        </div>
      </div>

      <Progress value={((index + 1) / questions.length) * 100} />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="space-y-5"
        >
          <h2
            ref={questionRef}
            id="quiz-question"
            tabIndex={-1}
            className="text-xl font-semibold text-balance outline-none"
          >
            {question.question}
          </h2>

          <div className="space-y-2">
            {question.options.map((opt, j) => (
              <button
                key={j}
                type="button"
                onClick={() => select(j)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border border-border/60 p-4 text-left text-sm transition-all hover:border-ring hover:bg-accent/50",
                  answers[index] === j &&
                    "border-primary bg-accent ring-2 ring-ring/30"
                )}
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                    answers[index] === j
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border"
                  )}
                >
                  {LETTERS[j]}
                </span>
                <span>{opt}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          <ChevronLeft />
          <span className="hidden sm:inline">Sebelumnya</span>
        </Button>

        <div className="hidden gap-1 sm:flex">
          {questions.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Soal ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "size-2 rounded-full transition-colors",
                i === index
                  ? "bg-primary"
                  : answers[i] !== null
                    ? "bg-primary/40"
                    : "bg-border"
              )}
            />
          ))}
        </div>

        {index === questions.length - 1 ? (
          <Button onClick={finish}>
            <Flag />
            <span className="hidden sm:inline">Selesai & Lihat Skor</span>
            <span className="sm:hidden">Selesai</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
          >
            <span className="hidden sm:inline">Berikutnya</span>
            <ChevronRight />
          </Button>
        )}
      </div>

      <ResultDialog
        open={resultOpen}
        onOpenChange={(open) => {
          setResultOpen(open);
          if (!open) onExit?.();
        }}
        questions={questions}
        answers={answers}
        score={score}
        onRetry={retry}
      />
    </div>
  );
}
