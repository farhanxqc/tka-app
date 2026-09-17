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
  const [flagged, setFlagged] = useState<boolean[]>(
    Array(questions.length).fill(false)
  );
  const [resultOpen, setResultOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [remaining, setRemaining] = useState(timeLimitSec ?? 0);
  const [elapsedSec, setElapsedSec] = useState(0);

  const question = questions[index];
  const answeredCount = answers.filter((a) => a !== null).length;
  const flaggedCount = flagged.filter(Boolean).length;
  const questionRef = useRef<HTMLHeadingElement>(null);
  const startRef = useRef(Date.now());

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
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        toggleFlag(index);
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

  function toggleFlag(i: number) {
    setFlagged((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

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
    setElapsedSec(Math.max(1, Math.round((Date.now() - startRef.current) / 1000)));
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
    setFlagged(Array(questions.length).fill(false));
    setIndex(0);
    setResultOpen(false);
    setRemaining(timeLimitSec ?? 0);
    startRef.current = Date.now();
    onRetry?.();
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">
            Soal {index + 1} dari {questions.length}
          </Badge>
          <Badge variant="outline">{topic}</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => toggleFlag(index)}
            className={cn(
              flagged[index] &&
                "border-amber-500/60 bg-amber-500/10 text-amber-600 dark:text-amber-400"
            )}
            aria-pressed={flagged[index]}
          >
            <Flag
              className={cn(
                "size-3.5",
                flagged[index] && "fill-amber-400 text-amber-400"
              )}
            />
            {flagged[index] ? "Ragu" : "Tandai Ragu"}
          </Button>
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
            {flaggedCount > 0 && (
              <span className="text-amber-500">
                {" "}
                · ragu {flaggedCount}
              </span>
            )}
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

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          <ChevronLeft />
          <span className="hidden sm:inline">Sebelumnya</span>
        </Button>

        <div className="flex flex-wrap gap-1.5">
          {questions.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Loncat ke soal ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "flex size-8 items-center justify-center rounded-lg border text-xs font-medium tabular-nums transition-all",
                i === index
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : flagged[i]
                    ? "border-amber-500/60 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : answers[i] !== null
                      ? "border-primary/50 bg-primary/15 text-primary"
                      : "border-border/60 bg-card text-muted-foreground hover:border-ring"
              )}
            >
              {flagged[i] && answers[i] === null ? (
                <Flag className="size-3" />
              ) : (
                i + 1
              )}
            </button>
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

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm border border-primary bg-primary" />
          Sedang dikerjakan
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm border border-primary/50 bg-primary/15" />
          Terjawab
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm border border-amber-500/60 bg-amber-500/10" />
          Ragu
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm border border-border/60 bg-card" />
          Belum dijawab
        </span>
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
        elapsedSec={elapsedSec}
        onRetry={retry}
      />
    </div>
  );
}
