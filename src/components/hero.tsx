"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FileUp, Rocket } from "lucide-react";

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
  const [line, setLine] = useState(1);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % subjects.length),
      2200
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setLine((l) => (l >= 5 ? 1 : l + 1)), 900);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-6 px-4 pt-16 pb-20 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-1.5 text-xs font-medium text-foreground shadow-sm"
      >
        <span className="size-1.5 rounded-full bg-emerald-500" />
        Try out TKA & rangkuman PDF, ditenagai Gemini AI
      </motion.div>

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
        className="mt-6 w-full max-w-2xl"
      >
        <TerminalWindow line={line} subject={subjects[index]} />
      </motion.div>
    </section>
  );
}

function TerminalWindow({
  line,
  subject,
}: {
  line: number;
  subject: string;
}) {
  const lines = [
    <span key={1}>
      <span className="text-emerald-500">➤</span>{" "}
      <span className="text-foreground">farhan-agent</span>{" "}
      <span className="text-muted-foreground">--tryout</span>{" "}
      <span className="text-sky-500">&quot;{subject}&quot;</span>{" "}
      <span className="text-amber-500">5</span>
    </span>,
    <span key={2} className="text-muted-foreground">
      ⬡ men-generate soal sesuai mapel…
    </span>,
    <span key={3} className="text-foreground/80">✔ Soal 1/5 — selesai</span>,
    <span key={4} className="text-foreground/80">✔ Soal 3/5 — selesai</span>,
    <span key={5} className="text-emerald-500">
      ✓ 5 soal + pembahasan siap dipelajari
    </span>,
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-[#0a0f1e] text-left shadow-2xl shadow-foreground/10">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="mx-auto text-xs text-white/40">
          farhan-agent — tryout
        </span>
      </div>
      <div className="min-h-44 p-4 text-left font-mono text-xs leading-relaxed sm:min-h-48 sm:text-sm">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={line}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            {lines[line - 1]}
          </motion.div>
        </AnimatePresence>
        <span className="ml-1 inline-block size-2.5 translate-y-0.5 animate-pulse bg-emerald-500" />
      </div>
    </div>
  );
}