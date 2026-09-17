"use client";

import { CircleCheck, CircleX, MinusCircle, Timer } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import type { QuizQuestion } from "@/lib/types";

const LETTERS = ["A", "B", "C", "D", "E"];

function gradeOf(percent: number) {
  if (percent >= 90) return { letter: "A", label: "Luar Biasa" };
  if (percent >= 75) return { letter: "B", label: "Bagus" };
  if (percent >= 60) return { letter: "C", label: "Cukup" };
  if (percent >= 40) return { letter: "D", label: "Perlu Ditingkatkan" };
  return { letter: "E", label: "Terus Berlatih" };
}

export function ResultDialog({
  open,
  onOpenChange,
  questions,
  answers,
  score,
  elapsedSec,
  onRetry,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questions: QuizQuestion[];
  answers: (number | null)[];
  score: number;
  elapsedSec?: number;
  onRetry: () => void;
}) {
  const total = questions.length || 1;
  const wrong = total - score;
  const unanswered = answers.filter((a) => a === null).length;
  const percent = Math.round((score / total) * 100);
  const grade = gradeOf(percent);
  const avgSec = elapsedSec ? Math.round(elapsedSec / Math.max(questions.length, 1)) : null;
  const hasQuestions = questions.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Hasil Simulasi</DialogTitle>
          <DialogDescription>
            {score} dari {total} soal terjawab benar
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap items-center justify-center gap-8 py-4">
          <div className="text-center">
            <p className="text-5xl font-bold tabular-nums">{percent}</p>
            <p className="text-xs text-muted-foreground">Skor akhir</p>
          </div>
          <div className="text-center">
            <p
              className={cn(
                "text-5xl font-bold",
                grade.letter === "A" && "text-emerald-500",
                grade.letter === "B" && "text-sky-500",
                grade.letter === "C" && "text-amber-500",
                grade.letter === "D" && "text-orange-500",
                grade.letter === "E" && "text-rose-500"
              )}
            >
              {grade.letter}
            </p>
            <p className="text-xs text-muted-foreground">{grade.label}</p>
          </div>
          <div className="space-y-1 text-sm">
            <p className="flex items-center gap-2">
              <CircleCheck className="size-4 text-emerald-500" />
              {score} benar
            </p>
            <p className="flex items-center gap-2">
              <CircleX className="size-4 text-destructive" />
              {wrong} salah
            </p>
            <p className="flex items-center gap-2">
              <MinusCircle className="size-4 text-muted-foreground" />
              {unanswered} belum dijawab
            </p>
            {avgSec !== null && (
              <p className="flex items-center gap-2">
                <Timer className="size-4 text-muted-foreground" />
                rata-rata {avgSec}s / soal
              </p>
            )}
          </div>
        </div>

        {hasQuestions && (
          <div className="space-y-4">
            {questions.map((q, i) => {
              const userAnswer = answers[i];
              return (
                <div
                  key={i}
                  className="rounded-xl border border-border/60 p-4 text-sm"
                >
                  <p className="font-medium text-balance">
                    {i + 1}. {q.question}
                  </p>
                  <div className="mt-2 space-y-1">
                    {q.options.map((opt, j) => (
                      <p
                        key={j}
                        className={cn(
                          "rounded-lg px-2 py-1",
                          j === q.answer && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                          j === userAnswer &&
                            j !== q.answer &&
                            "bg-destructive/10 text-destructive",
                          j !== userAnswer &&
                            j !== q.answer &&
                            "text-muted-foreground"
                        )}
                      >
                        {LETTERS[j]}. {opt}
                        {j === userAnswer && " (jawabanmu)"}
                      </p>
                    ))}
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Pembahasan:
                    </span>{" "}
                    {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
          <Button onClick={onRetry}>Ulangi Sesi Ini</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
