"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BookOpenCheck,
  BookOpenText,
  Flame,
  Gauge,
  GraduationCap,
  Languages,
  Layers,
  Lightbulb,
  Loader2,
  Sigma,
  Sparkles,
  Sprout,
  TrendingUp,
  Wand2,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import { FloatingCard, StatusDot } from "@/components/floating-card";
import { QuizRunner } from "@/components/quiz-runner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postJSON } from "@/lib/fetch-json";
import { getScores } from "@/lib/storage";
import { cn } from "cn";
import type { Difficulty, QuizQuestion, ScoreRecord } from "@/lib/types";

const SUBJECTS = [
  {
    name: "Bahasa Indonesia",
    icon: BookOpenText,
    track: "Wajib",
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "Matematika",
    icon: Sigma,
    track: "Wajib",
    img: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "Bahasa Inggris",
    icon: Languages,
    track: "Wajib",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "Bahasa Inggris Tingkat Lanjut",
    icon: GraduationCap,
    track: "Pilihan",
    img: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "Produk Kreatif dan Kewirausahaan",
    icon: Lightbulb,
    track: "Pilihan",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "Campuran Semua Mapel",
    icon: Layers,
    track: "Gabungan",
    img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=60",
    mixed: true,
  },
];

const DIFFICULTIES: {
  value: Difficulty;
  icon: typeof Sprout;
  desc: string;
  ring: string;
  chip: string;
  bar: string;
}[] = [
  {
    value: "mudah",
    icon: Sprout,
    desc: "Pemanasan dasar",
    ring: "border-emerald-500/60 bg-emerald-500/10 ring-2 ring-emerald-500/30",
    chip: "bg-emerald-500",
    bar: "w-1/3",
  },
  {
    value: "sedang",
    icon: Gauge,
    desc: "Level ujian",
    ring: "border-amber-500/60 bg-amber-500/10 ring-2 ring-amber-500/30",
    chip: "bg-amber-500",
    bar: "w-2/3",
  },
  {
    value: "sulit",
    icon: Flame,
    desc: "Maksimal otak",
    ring: "border-rose-500/60 bg-rose-500/10 ring-2 ring-rose-500/30",
    chip: "bg-rose-500",
    bar: "w-full",
  },
];

const COUNTS = [10, 15, 20];

export function TryOutExperience() {
  const [mode, setMode] = useState<"quick" | "custom">("quick");
  const [subject, setSubject] = useState("Matematika");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("sedang");
  const [count, setCount] = useState(10);
  const [customPrompt, setCustomPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [sessionTopic, setSessionTopic] = useState("");
  const [scores, setScores] = useState<ScoreRecord[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setScores(getScores()), 0);
    return () => clearTimeout(timer);
  }, []);

  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  const weekSessions = scores.filter(
    (s) => new Date(s.date) >= weekStart
  ).length;
  const last = scores[0];
  const avg =
    scores.length > 0
      ? Math.round(
          scores.reduce((acc, s) => acc + s.score / s.total, 0) /
            scores.length *
            100
        )
      : null;
  const sparkline = avg === null ? [] : scores.slice(0, 6).reverse();

  async function generate() {
    if (mode === "custom" && !customPrompt.trim()) {
      toast.error("Tulis instruksi soal terlebih dahulu.");
      return;
    }

    setLoading(true);
    try {
      const data = await postJSON<{
        questions?: QuizQuestion[];
        error?: string;
      }>(
        "/api/quiz",
        mode === "custom"
          ? { customPrompt, count }
          : {
              subject: subject.includes("Campuran") ? undefined : subject,
              topic: topic.trim() || undefined,
              difficulty,
              count,
            }
      );

      if (!data.questions) {
        toast.error(data.error ?? "Gagal generate soal.");
        return;
      }

      setQuestions(data.questions);
      setSessionTopic(
        mode === "custom"
          ? customPrompt.trim().slice(0, 60)
          : [subject, topic.trim()].filter(Boolean).join(" - ") || "TKA"
      );
      toast.success(`${data.questions.length} soal siap dikerjakan!`);
    } catch {
      toast.error("Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  if (questions) {
    return (
      <QuizRunner
        key={sessionTopic + questions.length}
        questions={questions}
        topic={sessionTopic}
        source="tryout"
        timeLimitSec={questions.length * 90}
        onExit={() => setQuestions(null)}
      />
    );
  }

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3 text-center"
      >
        <h1 className="font-heading text-3xl font-bold tracking-tight">Try Out TKA</h1>
        <p className="mx-auto max-w-md text-balance text-muted-foreground">
          Simulasi ujian dengan soal yang disusun AI — lengkap dengan
          pembahasan mendalam di setiap nomor.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="relative mx-auto hidden w-full max-w-3xl lg:block"
      >
        <div className="absolute left-1/2 top-1/2 h-px w-[calc(100%-7rem)] -translate-x-1/2 border-t border-dashed border-border" />
        <div className="flex items-start justify-between px-8">
          <FloatingCard
            className="-translate-y-2 -rotate-3 w-44"
            duration={5}
          >
            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <StatusDot tone="amber" />
              Sesi 7 hari terakhir
            </div>
            <p className="flex items-center gap-1.5 text-2xl font-bold">
              <Flame className="size-5 text-amber-500" />
              {weekSessions}
            </p>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {last
                ? `terakhir selesai — skor ${Math.round((last.score / last.total) * 100)}`
                : "belum ada sesi — mulai sekarang"}
            </p>
          </FloatingCard>

          <FloatingCard className="w-48 translate-y-3" duration={4.5} delay={0.8}>
            <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>Akurasi rata-rata</span>
              <TrendingUp className="size-3.5 text-emerald-500" />
            </div>
            {avg === null ? (
              <p className="text-sm text-muted-foreground">
                Belum ada data skor
              </p>
            ) : (
              <>
                <p className="text-2xl font-bold">{avg}%</p>
                <div className="mt-1.5 flex items-end justify-between gap-1">
                  {sparkline.map((s, i) => (
                    <div
                      key={i}
                      style={{
                        height: `${Math.max(Math.round((s.score / s.total) * 100), 8)}%`,
                      }}
                      className="h-7 flex-1 rounded-sm bg-primary/70"
                    />
                  ))}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  tren {sparkline.length} sesi terakhir
                </p>
              </>
            )}
          </FloatingCard>

          <FloatingCard
            className="-translate-y-2 rotate-3 w-44"
            duration={6}
            delay={0.4}
          >
            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Zap className="size-3.5 text-amber-500" />
              Mode Custom
            </div>
            <p className="text-sm font-medium text-balance">
              Tulis instruksi sendiri, AI buatkan soal.
            </p>
          </FloatingCard>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-3xl space-y-6 rounded-2xl border border-border/60 bg-card p-6 shadow-xl shadow-foreground/5 sm:p-8"
      >
        <div className="flex gap-2">
          <Button
            variant={mode === "quick" ? "default" : "outline"}
            size="default"
            onClick={() => setMode("quick")}
          >
            <Zap />
            Mode Cepat
          </Button>
          <Button
            variant={mode === "custom" ? "default" : "outline"}
            size="default"
            onClick={() => setMode("custom")}
          >
            <Wand2 />
            Custom Prompt
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {mode === "quick" ? (
            <motion.div
              key="quick"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Mata Pelajaran</label>
                  <span className="text-xs text-muted-foreground">
                    3 wajib · 2 pilihan · 1 gabungan
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {SUBJECTS.map((s) => {
                    const Icon = s.icon;
                    const active = subject === s.name;
                    return (
                      <button
                        key={s.name}
                        type="button"
                        onClick={() => setSubject(s.name)}
                        className={cn(
                          "group relative overflow-hidden rounded-xl border text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/10",
                          active
                            ? "border-primary ring-2 ring-primary/40"
                            : "border-border/60 hover:border-ring/60"
                        )}
                      >
                        <div className="relative h-24 w-full overflow-hidden">
                          <Image
                            src={s.img}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <span className="absolute top-2 right-2 rounded-full bg-black/40 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                            {s.track}
                          </span>
                          <span className="absolute bottom-2 left-3 flex items-center gap-1.5 text-sm font-semibold text-white drop-shadow-md">
                            <Icon className="size-4" />
                            {s.name}
                          </span>
                        </div>
                        <div
                          className={cn(
                            "flex min-h-[44px] items-center justify-center p-1.5",
                            active ? "bg-accent" : "bg-card"
                          )}
                        >
                          {active ? (
                            <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
                              <BookOpenCheck className="size-3.5" />
                              Dipilih
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              Pilih mapel ini
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Tingkat Kesulitan</label>
                <div className="grid grid-cols-3 gap-2">
                  {DIFFICULTIES.map((d) => {
                    const Icon = d.icon;
                    const active = difficulty === d.value;
                    return (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() => setDifficulty(d.value)}
                        className={cn(
                          "group flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/10",
                          active ? d.ring : "border-border/60 bg-card hover:border-ring/60"
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-9 items-center justify-center rounded-full transition-transform group-hover:scale-110",
                            active ? `${d.chip} text-white shadow-sm` : "bg-accent"
                          )}
                        >
                          <Icon
                            className={cn(
                              "size-4.5",
                              active ? "text-white" : "text-muted-foreground"
                            )}
                          />
                        </span>
                        <span className="text-sm font-medium capitalize">
                          {d.value}
                        </span>
                        <span className="text-xs leading-tight text-muted-foreground">
                          {d.desc}
                        </span>
                        <span className="mt-0.5 h-1 w-full overflow-hidden rounded-full bg-border">
                          <span
                            className={cn(
                              "block h-full rounded-full transition-all duration-300",
                              active ? d.chip : "bg-transparent"
                            )}
                            style={{ width: active ? d.bar : "0%" }}
                          />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Jumlah Soal</label>
                  <div className="flex rounded-xl border border-border/60 bg-card p-1">
                    {COUNTS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCount(c)}
                        className={cn(
                          "flex-1 rounded-lg py-2.5 text-sm font-medium transition-all",
                          count === c
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    Topik spesifik{" "}
                    <span className="font-normal text-muted-foreground">
                      (opsional)
                    </span>
                  </label>
                  <Input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Mis. Integral, Teks editorial…"
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="custom"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Instruksi bebas untuk AI
                </label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  rows={4}
                  placeholder='Contoh: "Buatkan 15 soal TKA Matematika tentang Integral dengan fokus substitusi dan parsial"'
                  className="flex w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium">Jumlah Soal</label>
                <div className="flex rounded-xl border border-border/60 bg-card p-1">
                  {COUNTS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCount(c)}
                      className={cn(
                        "flex-1 rounded-lg py-2.5 text-sm font-medium transition-all",
                        count === c
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between border-t border-border/60 pt-5">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Zap className="size-3.5 text-primary" />
            Skor tersimpan otomatis di perangkat ini
          </p>
          <Button size="lg" onClick={generate} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            {loading ? "Menyusun soal…" : "Generate Soal"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
