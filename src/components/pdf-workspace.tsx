"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  CloudUpload,
  FileUp,
  ListChecks,
  Loader2,
  RotateCcw,
  WandSparkles,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import { FloatingCard, StatusDot } from "@/components/floating-card";
import { QuizRunner } from "@/components/quiz-runner";
import { Button } from "@/components/ui/button";
import { postJSON } from "@/lib/fetch-json";
import { cn } from "cn";
import { extractPdfText } from "@/lib/pdf";
import type { QuizQuestion } from "@/lib/types";

const MAX_SIZE = 20 * 1024 * 1024;

interface Summary {
  summary: string;
  keyPoints: string[];
}

export function PdfWorkspace() {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [stage, setStage] = useState<
    "idle" | "extracting" | "summarizing" | "ready" | "quizLoading" | "quiz"
  >("idle");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef("");

  const processFile = useCallback(async (file: File) => {
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      toast.error("Hanya file PDF yang didukung.");
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error("Ukuran file maksimal 20 MB.");
      return;
    }

    setFileName(file.name);
    setSummary(null);
    setQuestions(null);
    setStage("extracting");

    try {
      const text = await extractPdfText(file);
      if (!text.trim()) {
        toast.error("PDF tidak berisi teks yang bisa dibaca (mungkin hasil scan).");
        setStage("idle");
        return;
      }
      textRef.current = text;

      setStage("summarizing");
      const data = await postJSON<Summary & { error?: string }>(
        "/api/summarize",
        { text, filename: file.name },
        45_000
      );

      if (!data.summary && !data.keyPoints) {
        toast.error(data.error ?? "Gagal merangkum PDF.");
        setStage("idle");
        return;
      }

      setSummary({ summary: data.summary, keyPoints: data.keyPoints ?? [] });
      setStage("ready");
      toast.success("Rangkuman siap!");
    } catch {
      toast.error("Gagal memproses PDF. Coba file lain.");
      setStage("idle");
    }
  }, []);

  async function generateQuiz() {
    setStage("quizLoading");
    try {
      const data = await postJSON<{
        questions?: QuizQuestion[];
        error?: string;
      }>("/api/quiz", { sourceText: textRef.current, count: 10 });

      if (!data.questions) {
        toast.error(data.error ?? "Gagal membuat kuis dari PDF.");
        setStage("ready");
        return;
      }

      setQuestions(data.questions);
      setStage("quiz");
      toast.success("Kuis dari PDF siap!");
    } catch {
      toast.error("Gagal terhubung ke server.");
      setStage("ready");
    }
  }

  function reset() {
    setStage("idle");
    setSummary(null);
    setQuestions(null);
    setFileName("");
    textRef.current = "";
    if (inputRef.current) inputRef.current.value = "";
  }

  const busy = stage === "extracting" || stage === "summarizing";

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3 text-center"
      >
        <h1 className="font-heading text-3xl font-bold tracking-tight">PDF to AI</h1>
        <p className="mx-auto max-w-md text-balance text-muted-foreground">
          Ubah dokumen PDF menjadi rangkuman ringkas dan kuis interaktif —
          semuanya otomatis.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="mx-auto hidden w-full max-w-4xl lg:block"
      >
        <div className="flex items-center justify-center gap-3">
          <FloatingCard className="w-52" duration={5}>
            <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                1
              </span>
              Unggah PDF
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-accent p-1.5">
              <FileUp className="size-3.5 shrink-0 text-primary" />
              <span className="truncate text-[11px] font-medium">
                materi-ipa-bab-3.pdf
              </span>
            </div>
          </FloatingCard>

          <ArrowRight className="size-5 shrink-0 text-muted-foreground/50" />

          <FloatingCard className="w-52" duration={4.5} delay={0.8}>
            <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                2
              </span>
              Ringkas otomatis
            </div>
            <div className="space-y-1">
              <div className="flex items-start gap-1.5 text-xs">
                <StatusDot />
                <span>Integral = luas daerah</span>
              </div>
              <div className="flex items-start gap-1.5 text-xs">
                <StatusDot />
                <span>Substitusi komposit</span>
              </div>
            </div>
          </FloatingCard>

          <ArrowRight className="size-5 shrink-0 text-muted-foreground/50" />

          <FloatingCard className="w-52" duration={6} delay={0.4}>
            <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                3
              </span>
              Kuis 10 soal
            </div>
            <p className="flex items-center gap-1.5 text-sm font-medium text-balance">
              <WandSparkles className="size-4 shrink-0 text-amber-500" />
              Siap uji pemahaman
            </p>
          </FloatingCard>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) void processFile(file);
        }}
        onClick={() => !busy && inputRef.current?.click()}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-12 text-center transition-all",
          dragging
            ? "scale-[1.01] border-primary bg-accent shadow-lg"
            : "border-border/60 hover:border-ring hover:bg-accent/40",
          busy && "pointer-events-none opacity-70"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void processFile(file);
          }}
        />

        <AnimatePresence mode="wait">
          {busy ? (
            <motion.div
              key="busy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-accent">
                <Loader2 className="size-7 animate-spin text-primary" />
              </span>
              <p className="text-sm font-medium">
                {stage === "extracting"
                  ? "Membaca teks PDF…"
                  : "AI sedang merangkum materi…"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.span
                style={{ willChange: "transform" }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex size-14 items-center justify-center rounded-2xl bg-accent shadow-sm"
              >
                <CloudUpload className="size-7 text-primary" />
              </motion.span>
              <div>
                <p className="font-medium">
                  {fileName || "Tarik & lepas PDF ke sini"}
                </p>
                <p className="text-sm text-muted-foreground">
                  atau klik untuk memilih file (maks 20 MB)
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {(summary || stage === "quizLoading") && (
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 rounded-2xl border border-border/60 bg-card p-6 shadow-lg shadow-foreground/5"
          >
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-semibold">
                <FileUp className="size-4 text-primary" />
                Rangkuman Materi
              </h2>
              <Button variant="ghost" size="sm" onClick={reset}>
                <RotateCcw />
                Ganti File
              </Button>
            </div>
            <p className="text-sm">{summary?.summary}</p>
            <ul className="space-y-2">
              {summary?.keyPoints.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex gap-2.5 rounded-lg bg-accent/50 p-3 text-sm"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border/60 bg-card p-6 shadow-lg shadow-foreground/5"
          >
            {stage === "quizLoading" ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <Loader2 className="size-8 animate-spin text-primary" />
                <p className="text-sm font-medium">
                  AI sedang menyusun 10 soal dari materi…
                </p>
              </div>
            ) : questions ? (
              <div className="space-y-4">
                <h2 className="flex items-center gap-2 font-semibold">
                  <ListChecks className="size-4 text-primary" />
                  Kuis Pemahaman
                </h2>
                <QuizRunner
          questions={questions}
          topic={fileName}
          source="pdf"
          timeLimitSec={questions.length * 90}
          onExit={reset}
        />
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-accent shadow-sm">
                  <WandSparkles className="size-6 text-primary" />
                </span>
                <p className="max-w-xs text-sm text-muted-foreground">
                  Rangkuman sudah dibaca? Uji pemahamanmu lewat 10 soal
                  pilihan ganda yang disusun langsung dari materi ini.
                </p>
                <Button size="lg" onClick={generateQuiz}>
                  <Zap />
                  Uji Pemahaman
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
