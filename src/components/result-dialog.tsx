"use client";

import { CircleCheck, CircleX } from "lucide-react";

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

export function ResultDialog({
  open,
  onOpenChange,
  questions,
  answers,
  score,
  onRetry,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questions: QuizQuestion[];
  answers: (number | null)[];
  score: number;
  onRetry: () => void;
}) {
  const total = questions.length;
  const wrong = total - score;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Hasil Simulasi</DialogTitle>
          <DialogDescription>
            {score} dari {total} soal terjawab benar
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-8 py-4">
          <div className="text-center">
            <p className="text-5xl font-bold tabular-nums">
              {Math.round((score / Math.max(total, 1)) * 100)}
            </p>
            <p className="text-xs text-muted-foreground">Skor akhir</p>
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
          </div>
        </div>

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

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
          <Button onClick={onRetry}>Sesi Baru</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
