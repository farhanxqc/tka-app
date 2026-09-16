"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FileUp, ListChecks, Rocket, TrendingUp, WandSparkles } from "lucide-react";

import { FloatingCard, StatusDot } from "@/components/floating-card";
import { Button } from "@/components/ui/button";

const subjects = [
  "Bahasa Indonesia",
  "Matematika",
  "Bahasa Inggris",
  "B. Inggris Lanjutan",
  "Produk Kreatif & Kewirausahaan",
];

const widestSubject = subjects.reduce((a, b) => (a.length >= b.length ? a : b));

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % subjects.length),
      2200
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative mx-auto flex min-h-[calc(100dvh-5.5rem)] w-full max-w-6xl flex-col items-center justify-center gap-5 px-4 pt-16 pb-10 text-center sm:gap-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm"
      >
        <StatusDot tone="emerald" />
        Didukung Gemini AI — soal & rangkuman tanpa batas
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl font-bold tracking-tight text-balance sm:text-5xl"
      >
        Persiapan TKA terarah, ditenagai AI.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="max-w-2xl text-base text-muted-foreground text-balance sm:text-lg"
      >
        Latihan soal interaktif untuk{" "}
        <span className="relative inline-grid h-8 items-center justify-items-center overflow-hidden rounded-full bg-accent align-middle px-3 font-medium text-foreground">
          <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
            {widestSubject}
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={subjects[index]}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="col-start-1 row-start-1 whitespace-nowrap"
            >
              {subjects[index]}
            </motion.span>
          </AnimatePresence>
        </span>{" "}
        plus rangkuman instan dari dokumen PDF materimu.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="flex flex-wrap items-center justify-center gap-3"
      >
        <Button size="lg" nativeButton={false} render={<Link href="/tryout" />}>
          <Rocket />
          Mulai Try Out TKA
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
        transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
        className="relative mt-4 hidden h-60 w-full max-w-4xl lg:block"
      >
        <FloatingCard
          className="absolute top-0 left-10 z-10 w-60 -rotate-6 p-3"
          duration={5}
        >
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <StatusDot />
            Soal #3 — Matematika
          </div>
          <p className="text-sm font-medium">
            Hasil dari &int;&#8321;&#8317;² x&#8318; dx adalah…
          </p>
          <div className="mt-2 space-y-1">
            <div className="rounded-lg bg-accent px-2 py-1 text-xs">A. 2&#8321; - 1</div>
            <div className="rounded-lg bg-primary px-2 py-1 text-xs text-primary-foreground">
              B. 2&#8321; - 1&#8319;&#8305; → benar
            </div>
          </div>
        </FloatingCard>

        <FloatingCard
          className="absolute top-4 right-10 z-10 w-48 rotate-6 p-3"
          duration={6}
          delay={0.5}
        >
          <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>Skor terbaru</span>
            <TrendingUp className="size-3.5 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold">87</p>
          <div className="mt-1.5 flex h-8 items-end gap-1">
            {[45, 60, 52, 70, 64, 80, 87].map((v, i) => (
              <div
                key={i}
                style={{ height: `${v}%` }}
                className="flex-1 rounded-sm bg-primary/70"
              />
            ))}
          </div>
        </FloatingCard>

        <FloatingCard
          className="absolute top-24 left-1/2 z-20 w-56 -translate-x-1/2 p-3"
          duration={4.5}
          delay={1}
        >
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <ListChecks className="size-3.5 text-primary" />
            Rangkuman PDF — 12 poin
          </div>
          <div className="space-y-1.5">
            <div className="flex items-start gap-1.5 text-xs">
              <StatusDot />
              <span>Integral tentu = luas daerah</span>
            </div>
            <div className="flex items-start gap-1.5 text-xs">
              <StatusDot />
              <span>Substitusi untuk fungsi komposit</span>
            </div>
            <div className="flex items-start gap-1.5 text-xs">
              <WandSparkles className="mt-0.5 size-3 shrink-0 text-amber-500" />
              <span>Kuis 10 soal siap</span>
            </div>
          </div>
        </FloatingCard>
      </motion.div>
    </section>
  );
}
