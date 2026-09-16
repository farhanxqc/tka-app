"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BarChart3, BookOpenText, History, LogOut, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { clearScores, getScores } from "@/lib/storage";
import type { ScoreRecord } from "@/lib/types";
import { cn } from "cn";

function percent(s: ScoreRecord) {
  return Math.round((s.score / s.total) * 100);
}

export function ProgressView() {
  const [scores, setScores] = useState<ScoreRecord[] | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setScores(getScores()), 0);
    return () => clearTimeout(timer);
  }, []);

  const total = scores?.length ?? 0;
  const avg =
    scores && total > 0
      ? Math.round(
          scores.reduce((acc, s) => acc + s.score / s.total, 0) /
            total *
            100
        )
      : null;
  const best =
    scores && total > 0
      ? Math.max(...scores.map((s) => percent(s)))
      : null;
  const tryoutCount =
    scores?.filter((s) => s.source === "tryout").length ?? 0;
  const pdfCount = (scores?.length ?? 0) - tryoutCount;

  function resetHistory() {
    clearScores();
    setScores([]);
    toast.success("Riwayat skor dihapus.");
  }

  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3 text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight">Progres Belajar</h1>
        <p className="mx-auto max-w-md text-balance text-muted-foreground">
          Rekap skor simulasi tersimpan di perangkat ini.
        </p>
      </motion.div>

      {scores === null ? (
        <p className="text-center text-sm text-muted-foreground">Memuat…</p>
      ) : total === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border/60 bg-card p-10 text-center">
          <BarChart3 className="size-10 text-muted-foreground" />
          <p className="max-w-xs text-sm text-muted-foreground">
            Belum ada sesi latihan. Kumpulkan skor pertama dari halaman Try
            Out atau PDF to AI.
          </p>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-2 gap-3 md:grid-cols-4"
          >
            {[
              { label: "Total sesi", value: String(total) },
              { label: "Rata-rata", value: avg === null ? "—" : `${avg}%` },
              { label: "Skor terbaik", value: best === null ? "—" : `${best}%` },
              { label: "Try Out / PDF", value: `${tryoutCount}/${pdfCount}` },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border/60 bg-card p-4 text-center"
              >
                <p className="text-3xl font-bold tabular-nums">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="overflow-hidden rounded-2xl border border-border/60 bg-card"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border/60 px-5 py-4">
              <h2 className="flex items-center gap-2 font-semibold">
                <History className="size-4 text-primary" />
                Riwayat Sesi
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (
                    window.confirm(
                      "Hapus semua riwayat skor? Tindakan ini tidak bisa dibatalkan."
                    )
                  ) {
                    resetHistory();
                  }
                }}
              >
                <Trash2 />
                Hapus riwayat
              </Button>
            </div>

            <ul className="divide-y divide-border/60">
              {scores.map((s) => (
                <li
                  key={s.id}
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5"
                >
                  <div className="min-w-0 space-y-1">
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <BookOpenText className="size-3.5 shrink-0 text-muted-foreground" />
                      <span className="truncate">{s.topic}</span>
                      <Badge variant="secondary">
                        {s.source === "tryout" ? "Try Out" : "PDF"}
                      </Badge>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(s.date).toLocaleString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm tabular-nums">
                      {s.score}/{s.total}
                    </span>
                    <span
                      className={cn(
                        "w-14 rounded-full px-2 py-0.5 text-center text-xs font-semibold tabular-nums",
                        percent(s) >= 75
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          : percent(s) >= 50
                            ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                            : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {percent(s)}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <LogOut className="size-3.5" />
        Skor tersimpan lokal di browser — membersihkan data browser menghapus
        riwayat ini.
      </p>
    </div>
  );
}