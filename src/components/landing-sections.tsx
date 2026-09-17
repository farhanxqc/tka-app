"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpenCheck,
  Bookmark,
  Check,
  ChevronDown,
  FileText,
  Gauge,
  Layers,
  Mail,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  Timer,
  TrendingUp,
  Users,
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

const universities = [
  "Universitas Indonesia",
  "ITB",
  "UGM",
  "UNPAD",
  "Universitas Brawijaya",
  "ITS",
  "Telkom University",
  "UIN Jakarta",
  "Universitas Airlangga",
  "Universitas Diponegoro",
];

export function TrustBar() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="text-center text-sm font-medium text-muted-foreground"
      >
        Dipercaya oleh pelajar dari
      </motion.p>
      <div className="mask-fade mt-6 flex gap-3 overflow-hidden">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            aria-hidden={dup === 1}
            className="marquee flex shrink-0 gap-3"
          >
            {universities.map((u) => (
              <span
                key={`${dup}-${u}`}
                className="flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border border-border/60 bg-card px-5 text-sm font-semibold text-muted-foreground"
              >
                {u}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

const stats = [
  {
    target: 950000,
    format: (v: number) => `${Math.floor(v / 1000)}rb+`,
    label: "Pengguna aktif",
    icon: Users,
    tone: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400",
  },
  {
    target: 2400000,
    format: (v: number) => `${(v / 1000000).toFixed(1).replace(".", ",")} jt+`,
    label: "Catatan dibuat",
    icon: Bookmark,
    tone: "text-sky-600 bg-sky-500/10 dark:text-sky-400",
  },
  {
    target: 4.9,
    format: (v: number) => `${v.toFixed(1).replace(".", ",")}/5`,
    label: "Rating pengguna",
    icon: Star,
    tone: "text-amber-600 bg-amber-500/10 dark:text-amber-400",
  },
  {
    target: 1200,
    format: (v: number) => `${v.toLocaleString("id-ID")}+`,
    label: "Sekolah & kampus",
    icon: FileText,
    tone: "text-violet-600 bg-violet-500/10 dark:text-violet-400",
  },
];

function CountUp({
  target,
  format,
}: {
  target: number;
  format: (v: number) => string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setVal(target * eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <p ref={ref} className="mt-4 text-3xl font-bold tracking-tight tabular-nums">
      {format(val)}
    </p>
  );
}

export function StatsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-2xl text-center"
      >
        <SectionLabel>Dipercaya ratusan ribu pelajar</SectionLabel>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          Mereka sudah membuktikannya
        </h2>
        <p className="mt-3 text-sm text-muted-foreground text-balance sm:text-base">
          Bergabung dengan 950.000+ pelajar dan mahasiswa di seluruh Indonesia
          yang sudah merasakan manfaat belajar yang lebih terarah.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-2xl border border-border/60 bg-card p-6 text-center"
            >
              <span
                className={cn(
                  "mx-auto flex size-11 items-center justify-center rounded-xl",
                  s.tone
                )}
              >
                <Icon className="size-5" />
              </span>
              <CountUp target={s.target} format={s.format} />
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Rafif A.",
    role: "Siswa SMA, Jakarta",
    text: "Soal try out-nya selalu sesuai sama materi yang lagi saya pelajari. Pembahasannya bikin paham, bukan cuma dapat jawaban.",
    rating: 5,
  },
  {
    name: "Salsabila N.",
    role: "Mahasiswi, Bandung",
    text: "Upload PDF rangkuman, AI langsung bikinin soal latihannya. Hemat banget waktuku buat review sebelum ujian.",
    rating: 5,
  },
  {
    name: "Bagas P.",
    role: "Siswa SMK, Surabaya",
    text: "Tutor AI-nya ngejelasin step by step tanpa bikin malu. Progres juga otomatis, jadi aku tahu bagian mana yang lemah.",
    rating: 5,
  },
  {
    name: "Nadia R.",
    role: "Siswi SMA, Yogyakarta",
    text: "Soal, pembahasan, dan progres di satu tempat. Belajar jadi lebih santai dan terarah, nggak deh nggak tahu mau mulai dari mana.",
    rating: 5,
  },
  {
    name: "Ilham W.",
    role: "Mahasiswa, Malang",
    text: "Skor langsung kehitung, pembahasan jelas, tinggal fokus latihan. Anjuran banget buat yang mau serius rakit nilai.",
    rating: 5,
  },
  {
    name: "Aisyah M.",
    role: "Siswi Madrasah, Depok",
    text: "Dari yang gaptek soal TKA, sekarang pede ikut try out. Fitur rangkum PDF paling sering kupakai tiap ada materi baru.",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="flex w-80 shrink-0 flex-col rounded-2xl border border-border/60 bg-card p-5 sm:w-96">
      <Stars count={t.rating} />
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        &ldquo;{t.text}&rdquo;
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3 border-t border-border/40 pt-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {t.name.charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-semibold">{t.name}</span>
          <span className="block text-xs text-muted-foreground">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function TestimonialSection() {
  const rows = [
    { list: testimonials.slice(0, 3), reverse: false },
    { list: testimonials.slice(3), reverse: true },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-2xl text-center"
      >
        <SectionLabel>Apa kata mereka</SectionLabel>
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          Dicintai pelajar dari Sabang sampai Merauke
        </h2>
        <p className="mt-3 text-sm text-muted-foreground text-balance sm:text-base">
          Rating 4,9/5 dari ribuan ulasan. Ini beberapa cerita mereka.
        </p>
      </motion.div>

      <div className="mask-fade mt-10 flex flex-col gap-4">
        {rows.map((row, ri) => (
          <div key={ri} className="flex gap-4 overflow-hidden">
            {[0, 1].map((dup) => (
              <div
                key={dup}
                aria-hidden={dup === 1}
                className={cn(
                  "flex shrink-0 gap-4",
                  row.reverse ? "marquee-reverse" : "marquee"
                )}
              >
                {row.list.map((t, i) => (
                  <TestimonialCard
                    key={`${dup}-${t.name}-${i}`}
                    t={t}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
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

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/farhanxqc",
    path: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.1.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.1-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.1-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.1 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2m0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.5.2-1.8.3-.5.2-.8.4-1.1.7-.3.3-.5.6-.7 1.1-.1.3-.3.7-.3 1.8-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.5.3 1.8.2.5.4.8.7 1.1.3.3.6.5 1.1.7.3.1.7.3 1.8.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.5-.2 1.8-.3.5-.2.8-.4 1.1-.7.3-.3.5-.6.7-1.1.1-.3.3-.7.3-1.8.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.5-.3-1.8-.2-.5-.4-.8-.7-1.1-.3-.3-.6-.5-1.1-.7-.3-.1-.7-.3-1.8-.3C15.5 4 15.1 4 12 4zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2zm5.1-3.1a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.5v-7l6.3 3.5-6.3 3.5z",
  },
  {
    label: "X",
    href: "https://x.com",
    path: "M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L2.7 2h6.5l4.4 5.9L18.9 2zm-1.1 18.1h1.7L7.4 3.8H5.5l12.3 16.3z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.3a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zM19 19h-3v-4.7c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5V19h-3v-9h2.9v1.2a3.2 3.2 0 0 1 2.9-1.6c3 0 3.6 2 3.6 4.6z",
  },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 sm:items-start">
          <div>
            <div className="flex items-center gap-3.5">
              <Image
                src="/kevin.jpg"
                alt="Foto Raihan Farhani"
                width={44}
                height={44}
                className="size-11 shrink-0 rounded-full border border-border/60 object-cover"
              />
              <div>
                <p className="font-semibold">Raihan Farhani</p>
                <p className="text-sm text-muted-foreground">
                  AI Developer &amp; Creative Technologist
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Pembuat farhantka.app — membangun alat belajar berbasis AI untuk
              membantu ribuan pelajar Indonesia belajar lebih terarah.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              🇮🇩 Indonesia · Siap kolaborasi
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:items-end sm:text-right">
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="flex size-9 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground transition-colors hover:text-foreground"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4"
                    aria-hidden
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a
                href="mailto:m.raihan.farhani@gmail.com"
                className="flex items-center gap-2 transition-colors hover:text-foreground sm:justify-end"
              >
                <Mail className="size-4" />
                m.raihan.farhani@gmail.com
              </a>
              <a
                href="tel:+6289678546641"
                className="flex items-center gap-2 transition-colors hover:text-foreground sm:justify-end"
              >
                <Phone className="size-4" />
                0896-7854-6641
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 farhantka.vercel.app. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}