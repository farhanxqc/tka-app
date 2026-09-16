"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  CalendarDays,
  ChartLine,
  ClipboardList,
  FileUp,
  MessagesSquare,
  MonitorPlay,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getScores } from "@/lib/storage";
import type { ScoreRecord } from "@/lib/types";
import { cn } from "cn";

const TARGET_DATE = new Date("2026-09-30T23:59:59+07:00").getTime();

function useCountdown() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const update = () =>
      setDays(Math.max(0, Math.ceil((TARGET_DATE - Date.now()) / 86400000)));
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);

  return days;
}

function BentoCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/60 bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-ring/50 hover:shadow-md hover:shadow-foreground/5",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

function CardGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -top-12 -right-12 size-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
    />
  );
}

function Sparkline({ scores }: { scores: ScoreRecord[] }) {
  if (scores.length < 2) return null;
  const values = scores
    .slice(0, 12)
    .reverse()
    .map((s) => Math.round((s.score / s.total) * 100));
  return (
    <div className="flex h-10 items-end gap-1">
      {values.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${Math.max(v, 8)}%` }}
          transition={{ duration: 0.4, delay: i * 0.04 }}
          className={cn(
            "w-1.5 rounded-full",
            v >= 75 ? "bg-emerald-500" : v >= 50 ? "bg-primary" : "bg-amber-500"
          )}
        />
      ))}
    </div>
  );
}

function StatsCard() {
  const [scores, setScores] = useState<ScoreRecord[] | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setScores(getScores()), 0);
    return () => clearTimeout(timer);
  }, []);

  const last = scores?.[0];
  const avg =
    scores && scores.length > 0
      ? Math.round(
          (scores.reduce((acc, s) => acc + s.score / s.total, 0) /
            scores.length) *
            100
        )
      : null;

  return (
    <BentoCard className="col-span-2">
      <CardGlow />
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <ChartLine className="size-4 text-primary" />
              Performa Belajar
            </h3>
            <Link
              href="/progres"
              className="flex min-h-11 items-center gap-0.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Riwayat
              <ArrowUpRight className="size-3" />
            </Link>
          </div>

          {scores === null ? (
            <p className="text-sm text-muted-foreground">Memuat…</p>
          ) : scores.length === 0 ? (
            <div className="space-y-3">
              <p className="max-w-56 text-sm text-muted-foreground">
                Belum ada sesi latihan tercatat.
              </p>
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/tryout" />}
              >
                <Zap />
                Mulai sesi pertama
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3 sm:gap-6">
              <div>
                <p className="text-2xl font-bold tabular-nums sm:text-3xl">
                  {last ? Math.round((last.score / last.total) * 100) : 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  Skor terbaru
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums sm:text-3xl">{avg ?? 0}</p>
                <p className="text-xs text-muted-foreground">Rata-rata</p>
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums sm:text-3xl">
                  {scores.length}
                </p>
                <p className="text-xs text-muted-foreground">Sesi</p>
              </div>
            </div>
          )}
        </div>

        {scores && scores.length >= 2 && (
          <div className="shrink-0">
            <Sparkline scores={scores} />
            <p className="mt-1 text-right text-xs text-muted-foreground">
              tren skor
            </p>
          </div>
        )}
      </div>
    </BentoCard>
  );
}

export function BentoDashboard() {
  const days = useCountdown();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-24">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-4 flex items-center justify-between text-xl font-semibold"
      >
        Dashboard Belajar
        <span className="text-xs font-normal text-muted-foreground">
          Riwayat tersimpan di perangkat ini
        </span>
      </motion.h2>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatsCard />

        <BentoCard className="col-span-2 flex items-center justify-between gap-4">
          <CardGlow />
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent">
              <CalendarDays className="size-4.5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold">Target Ujian</h3>
              <p className="text-xs text-muted-foreground">30 September 2026</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold tabular-nums">
              {days === null ? "…" : days}
            </p>
            <p className="text-xs text-muted-foreground">hari lagi</p>
          </div>
        </BentoCard>

        <BentoCard>
          <Link
            href="/tryout"
            className="flex h-full flex-col justify-between gap-3"
          >
            <CardGlow />
            <span className="flex size-9 items-center justify-center rounded-lg bg-accent">
              <ClipboardList className="size-4.5" />
            </span>
            <div className="space-y-0.5">
              <h3 className="flex items-center gap-1 text-sm font-semibold">
                Try Out AI
                <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </h3>
              <p className="text-xs leading-snug text-muted-foreground">
                Bank soal dinamis sesuai mapel & kesulitan.
              </p>
            </div>
          </Link>
        </BentoCard>

        <BentoCard>
          <Link
            href="/belajar"
            className="flex h-full flex-col justify-between gap-3"
          >
            <CardGlow />
            <span className="flex size-9 items-center justify-center rounded-lg bg-accent">
              <MonitorPlay className="size-4.5" />
            </span>
            <div className="space-y-0.5">
              <h3 className="flex items-center gap-1 text-sm font-semibold">
                Pusat Belajar
                <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </h3>
              <p className="text-xs leading-snug text-muted-foreground">
                Video materi TKA dari kreator edukasi.
              </p>
            </div>
          </Link>
        </BentoCard>

        <BentoCard>
          <Link
            href="/pdf"
            className="flex h-full flex-col justify-between gap-3"
          >
            <CardGlow />
            <span className="flex size-9 items-center justify-center rounded-lg bg-accent">
              <FileUp className="size-4.5" />
            </span>
            <div className="space-y-0.5">
              <h3 className="flex items-center gap-1 text-sm font-semibold">
                PDF to AI
                <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </h3>
              <p className="text-xs leading-snug text-muted-foreground">
                Ubah dokumen jadi rangkuman & kuis.
              </p>
            </div>
          </Link>
        </BentoCard>

        <BentoCard>
          <button
            type="button"
            className="flex h-full w-full flex-col justify-between gap-3 text-left"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("tka:open-tutor"))
            }
          >
            <CardGlow />
            <span className="flex size-9 items-center justify-center rounded-lg bg-accent">
              <MessagesSquare className="size-4.5" />
            </span>
            <div className="space-y-0.5">
              <h3 className="flex items-center gap-1 text-sm font-semibold">
                Tutor AI
                <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </h3>
              <p className="text-xs leading-snug text-muted-foreground">
                Tutor pribadi, siap kapan pun.
              </p>
            </div>
          </button>
        </BentoCard>
      </div>
    </section>
  );
}
