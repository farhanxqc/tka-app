"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CirclePlay, Clapperboard, X } from "lucide-react";

import { VIDEO_CATEGORIES, type VideoItem } from "@/lib/videos";
import { cn } from "cn";

export function LearningHub() {
  const [active, setActive] = useState<string>(VIDEO_CATEGORIES[0].name);
  const [playing, setPlaying] = useState<VideoItem | null>(null);

  const category = useMemo(
    () => VIDEO_CATEGORIES.find((c) => c.name === active),
    [active]
  );

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3 text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight">Pusat Belajar</h1>
        <p className="mx-auto max-w-md text-balance text-muted-foreground">
          Koleksi video materi TKA pilihan dari kreator edukasi terbaik —
          tonton langsung tanpa keluar dari aplikasi.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-1.5 rounded-full border border-border/60 bg-card p-1.5 shadow-sm"
      >
        {VIDEO_CATEGORIES.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setActive(c.name)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all",
              active === c.name
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-accent hover:text-foreground"
            )}
          >
            {c.name}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <p className="text-sm text-muted-foreground text-balance">
            {category?.description}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category?.videos.map((v, i) => (
              <motion.button
                key={v.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                onClick={() => setPlaying(v)}
                className="group overflow-hidden rounded-2xl border border-border/60 bg-card text-left shadow-sm transition-shadow hover:shadow-lg hover:shadow-foreground/10"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      <CirclePlay className="size-7" />
                    </span>
                  </span>
                </div>
                <div className="space-y-1.5 p-4">
                  <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-snug text-balance">
                    {v.title}
                  </h3>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clapperboard className="size-3.5 text-red-500" />
                    {v.channel}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setPlaying(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full max-w-4xl overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {playing.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {playing.channel}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Tutup video"
                  onClick={() => setPlaying(null)}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="aspect-video w-full bg-black">
                <iframe
                  key={playing.id}
                  src={`https://www.youtube-nocookie.com/embed/${playing.id}?autoplay=1&rel=0`}
                  title={playing.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
