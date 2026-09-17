"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  FileUp,
  Lock,
  Plus,
  RefreshCw,
  Rocket,
  RotateCcw,
  ShieldCheck,
  Share,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const subjects = [
  "Bahasa Indonesia",
  "Matematika",
  "Bahasa Inggris",
  "B. Inggris Lanjutan",
  "Produk Kreatif & Kewirausahaan",
];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % subjects.length),
      3200
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-6 px-4 pt-16 pb-20 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
      >
        Persiapan TKA terarah,{" "}
        <span className="text-primary">ditenagai AI</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="max-w-xl text-sm text-muted-foreground text-balance sm:text-base"
      >
        Soal, pembahasan, dan rangkuman dibuat langsung dari materimu — tanpa
        limit.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="flex flex-wrap items-center justify-center gap-3"
      >
        <Button size="lg" nativeButton={false} render={<Link href="/tryout" />}>
          <Rocket />
          Mulai Try Out
        </Button>
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={<Link href="/pdf" />}
        >
          <FileUp />
          Olah Materi PDF
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
        className="mt-8 w-full max-w-3xl sm:max-w-4xl"
      >
        <BrowserWindow subject={subjects[index]} />
      </motion.div>
    </section>
  );
}

const questions: Record<string, { q: string; o: string[]; correct: number }> = {
  "Bahasa Indonesia": {
    q: "Makna kata “strategi” dalam kutipan teks berikut adalah…",
    o: ["Cara mencapai tujuan", "Cara menyusun laporan", "Rancangan anggaran", "Pola pikir penulis"],
    correct: 0,
  },
  Matematika: {
    q: "Hasil dari ∫₀¹ (3x² + 2x) dx adalah…",
    o: ["1", "2", "3", "4"],
    correct: 1,
  },
  "Bahasa Inggris": {
    q: "Choose the correct passive form: “The report ___ by the team.”",
    o: ["are written", "was written", "were written", "is writing"],
    correct: 1,
  },
  "B. Inggris Lanjutan": {
    q: "Select the most polite request for your email…",
    o: ["Give me the file now", "Send it at once", "Would you kindly send…", "I need the file soon"],
    correct: 2,
  },
  "Produk Kreatif & Kewirausahaan": {
    q: "Break-even point (BEP) tercapai saat…",
    o: ["Laba sama dengan biaya", "Pendapatan = biaya total", "Total biaya nol", "Modal kembali"],
    correct: 1,
  },
};

function BrowserWindow({ subject }: { subject: string }) {
  const data = questions[subject] ?? questions["Matematika"];

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card text-left shadow-2xl shadow-foreground/10">
      <div className="bg-muted/60">
        <div className="flex items-center gap-1.5 border-b border-border/50 px-3 pt-2.5 pb-0">
          <Tab active onClick={() => undefined}>tryout</Tab>
          <Tab onClick={() => undefined}>belajar</Tab>
          <Tab onClick={() => undefined}>progres</Tab>
          <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center text-muted-foreground">
            <Plus className="size-3.5" />
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2">
          <button
            type="button"
            className="flex size-6 items-center justify-center rounded-full text-muted-foreground hover:bg-foreground/10"
            aria-label="Kembali"
          >
            <ArrowLeft className="size-3.5" />
          </button>
          <button
            type="button"
            className="flex size-6 items-center justify-center rounded-full text-muted-foreground/40"
            aria-label="Maju"
            tabIndex={-1}
          >
            <ArrowRight className="size-3.5" />
          </button>
          <button
            type="button"
            className="flex size-6 items-center justify-center rounded-full text-muted-foreground hover:bg-foreground/10"
            aria-label="Muat ulang"
          >
            <RefreshCw className="size-3.5" />
          </button>
          <div className="relative mx-auto flex w-full max-w-md items-center gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs">
            <Lock className="size-3 text-emerald-500" />
            <span className="truncate text-muted-foreground">
              farhantka.vercel.app
            </span>
            <ShieldCheck className="ml-auto size-3.5 text-emerald-500/70" />
          </div>
          <button
            type="button"
            className="flex size-6 items-center justify-center rounded-full text-muted-foreground hover:bg-foreground/10"
            aria-label="Muat ulang"
          >
            <RotateCcw className="size-3.5" />
          </button>
          <button
            type="button"
            className="flex size-6 items-center justify-center rounded-full text-muted-foreground hover:bg-foreground/10"
            aria-label="Bagi"
          >
            <Share className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
            {subject}
          </span>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            Soal 3 dari 5
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={subject}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-4 text-base font-medium text-foreground sm:text-lg">
              {data.q}
            </p>
            <div className="mt-4 space-y-2">
              {data.o.map((opt, i) => (
                <div
                  key={opt}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm ${
                    i === data.correct
                      ? "border-primary/40 bg-primary/10 text-foreground"
                      : "border-border/60 bg-background text-muted-foreground"
                  }`}
                >
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      i === data.correct
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                  {i === data.correct && (
                    <span className="ml-auto text-xs font-medium text-primary">
                      ✓ benar
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground">
          <span>Skor sesi: 87</span>
          <span>Pembahasan langkah demi langkah</span>
        </div>
      </div>
    </div>
  );
}

function Tab({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-7 min-w-16 items-center justify-center gap-1.5 rounded-t-lg px-3 text-[11px] font-medium transition-colors ${
        active
          ? "bg-card text-foreground"
          : "text-muted-foreground/70 hover:text-muted-foreground"
      }`}
    >
      <span className="size-1.5 rounded-full bg-primary/60" />
      {children}
    </button>
  );
}