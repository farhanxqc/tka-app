"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  ChevronDown,
  FileText,
  Gauge,
  Layers,
  MessageCircle,
  Sparkles,
  Timer,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "cn";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
      {children}
    </span>
  );
}

const pains = [
  "Ngerasa ketinggalan dari teman sekelas.",
  "Bingung mau mulai belajar dari mana.",
  "Panik tiap mau try out.",
  "Materi numpuk dan kelas kerasa terlalu cepat.",
];

export function PainPoints() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-2xl text-center"
      >
        <SectionLabel>Kamu nggak sendirian</SectionLabel>
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          Banyak yang ngerasain hal yang sama. Itu wajar banget.
        </h2>
      </motion.div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {pains.map((p, i) => (
          <motion.div
            key={p}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="rounded-2xl border border-border/60 bg-card p-5"
          >
            <p className="text-lg leading-none text-primary/40">&ldquo;</p>
            <p className="font-medium text-balance">{p}</p>
            <p className="mt-1 text-lg leading-none text-primary/40">&rdquo;</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const features = [
  {
    title: "Try Out AI",
    desc: "Bank soal dinamis sesuai mapel & kesulitan. Generated untuk kamu, selesai sampai ~90 detik per soal.",
    icon: BookOpenCheck,
    href: "/tryout",
    tone: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400",
  },
  {
    title: "Ringkasan Instan",
    desc: "Upload PDF, dapatkan rangkuman poin-poin penting + kuis otomatis dalam hitungan detik.",
    icon: FileText,
    href: "/pdf",
    tone: "text-sky-600 bg-sky-500/10 dark:text-sky-400",
  },
  {
    title: "Tutor AI 24/7",
    desc: "Tanyakan konsep sulit kapan saja. AI menjelaskan langkah demi langkah tanpa malu-malu.",
    icon: MessageCircle,
    href: null,
    tone: "text-violet-600 bg-violet-500/10 dark:text-violet-400",
    event: "tka:open-tutor",
  },
  {
    title: "Progres Otomatis",
    desc: "Skor tersimpan tiap sesi. Pantau tren belajarmu dari waktu ke waktu di satu tempat.",
    icon: TrendingUp,
    href: "/progres",
    tone: "text-amber-600 bg-amber-500/10 dark:text-amber-400",
  },
];

export function FeaturesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-2xl text-center"
      >
        <SectionLabel>Fitur Unggulan</SectionLabel>
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          Semua yang kamu butuhkan untuk TKA
        </h2>
        <p className="mt-3 text-sm text-muted-foreground text-balance sm:text-base">
          Satu platform untuk latihan, paham materi, dan pantau progres. Hemat
          waktu, belajar lebih efektif.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => {
          const Icon = f.icon;
          const body = (
            <>
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-xl",
                  f.tone
                )}
              >
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
              <span className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                Buka
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </>
          );
          const cls =
            "group relative flex flex-col rounded-2xl border border-border/60 bg-card p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-ring/50 hover:shadow-lg hover:shadow-foreground/5";
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              {f.href ? (
                <Link href={f.href} className={cls}>
                  {body}
                </Link>
              ) : (
                <button
                  type="button"
                  className={cls}
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent(f.event!))
                  }
                >
                  {body}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

const steps = [
  {
    n: "01",
    icon: Layers,
    title: "Pilih mapel & materi",
    desc: "Pilih mapel, tingkat kesulitan, dan jumlah soal yang mau dikerjakan.",
  },
  {
    n: "02",
    icon: Sparkles,
    title: "AI menyusun soal",
    desc: "AI men-generate soal pilgan + pembahasan langkah demi langkah sesuai pilihanmu.",
  },
  {
    n: "03",
    icon: Gauge,
    title: "Kerjakan & pantau",
    desc: "Kerjakan dengan timer, langsung dapat pembahasan, skor tersimpan otomatis.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-2xl text-center"
      >
        <SectionLabel>Cara Kerja</SectionLabel>
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          Mulai latihan dalam 3 langkah
        </h2>
      </motion.div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative rounded-2xl border border-border/60 bg-card p-5"
            >
              <span className="absolute top-4 right-5 text-2xl font-bold text-foreground/10 tabular-nums">
                {s.n}
              </span>
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent">
                <Icon className="size-5 text-primary" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

const comparison = [
  {
    feature: "Soal AI sesuai mapel & kesulitan",
    others: false,
    ours: true,
  },
  {
    feature: "Pembahasan langkah demi langkah",
    others: false,
    ours: true,
  },
  {
    feature: "Rangkuman + kuis dari PDF",
    others: false,
    ours: true,
  },
  {
    feature: "Tutor AI, siap kapan pun",
    others: false,
    ours: true,
  },
  {
    feature: "Timer & navigasi ala ujian",
    others: false,
    ours: true,
  },
  {
    feature: "Progres tersimpan otomatis",
    others: false,
    ours: true,
  },
];

export function ComparisonTable() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-2xl text-center"
      >
        <SectionLabel>Kenapa Farhan Agent?</SectionLabel>
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          Bandingkan sama cara lama
        </h2>
      </motion.div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border/60">
        <div className="flex items-center gap-3 border-b border-border/60 bg-card px-5 py-4 text-sm font-semibold">
          <span className="flex-1">Fitur</span>
          <span className="w-24 text-center text-muted-foreground">
            Cara lama
          </span>
          <span className="w-24 text-center text-primary">Farhan Agent</span>
        </div>
        {comparison.map((row, i) => (
          <div
            key={row.feature}
            className={cn(
              "flex items-center gap-3 px-5 py-3.5 text-sm",
              i % 2 === 0 ? "bg-background" : "bg-card",
              i === comparison.length - 1 ? "" : "border-b border-border/40"
            )}
          >
            <span className="flex-1 font-medium">{row.feature}</span>
            <span className="flex w-24 justify-center">
              {row.others ? (
                <Check className="size-4.5 text-muted-foreground" />
              ) : (
                <span className="text-lg text-muted-foreground/40">—</span>
              )}
            </span>
            <span className="flex w-24 justify-center">
              <Check className="size-4.5 text-primary" />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "Apakah Farhan Agent gratis?",
    a: "Ya, halaman ini bisa kamu pakai gratis. AI memakai key Gemini, jadi biayanya hanya sesuai pemakaian provider-mu.",
  },
  {
    q: "Apakah skor dan data saya tersimpan?",
    a: "Skor latihan tersimpan otomatis di perangkatmu (localStorage). Riwayat dan tren belajarmu bisa dilihat di halaman Progres.",
  },
  {
    q: "Berapa lama AI men-generate soal?",
    a: "Biasanya dalam 10-30 detik — sekitar 90 detik per soal. Kalau layanan AI lagi tinggi permintaan, akan dicoba ulang otomatis.",
  },
  {
    q: "Format dokumen apa yang didukung?",
    a: "PDF untuk fitur rangkuman instan dan kuis dari materi. Upload file, AI yang mengolah ringkasannya.",
  },
  {
    q: "Apakah ini termasuk kecurangan akademik?",
    a: "Tidak. Farhan Agent dirancang untuk latihan mandiri dan memahami materi, bukan menggantikan ujian atau pekerjaanmu.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-2xl text-center"
      >
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          Pertanyaan yang sering muncul
        </h2>
      </motion.div>

      <div className="mt-8 space-y-2.5">
        {faqs.map((f, i) => (
          <div
            key={f.q}
            className="overflow-hidden rounded-xl border border-border/60 bg-card"
          >
            <button
              type="button"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-medium"
            >
              {f.q}
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
                  open === i && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300",
                open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-border/60 bg-card px-6 py-14 text-center shadow-xl shadow-foreground/5 sm:px-12 sm:py-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-xl text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            Siap belajar TKA lebih terarah?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground text-balance sm:text-base">
            Mulai latihan sekarang. Soal, pembahasan, dan progres ada di satu
            tempat.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/tryout" />}>
              <Timer />
              Mulai Try Out
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/progres" />}
            >
              Lihat Progres
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const footerLinks = [
  { label: "Beranda", href: "/" },
  { label: "Try Out", href: "/tryout" },
  { label: "Belajar", href: "/belajar" },
  { label: "PDF to AI", href: "/pdf" },
  { label: "Progres", href: "/progres" },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2.5 font-semibold">
          <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          Farhan Agent
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {footerLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Farhan Agent.
        </p>
      </div>
    </footer>
  );
}