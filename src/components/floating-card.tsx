"use client";

import { motion } from "motion/react";
import { cn } from "cn";

export function FloatingCard({
  className,
  children,
  delay = 0,
  duration = 5,
  amp = 8,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  amp?: number;
}) {
  return (
    <motion.div
      style={{ willChange: "transform" }}
      animate={{ y: [0, -amp, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/60 bg-card p-3 text-left shadow-lg shadow-foreground/5",
        className
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
        animate={{ x: ["-20%", "320%"] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          repeatDelay: 3.2,
          delay: delay + 0.4,
          ease: "easeInOut",
        }}
      />
      {children}
    </motion.div>
  );
}

export function StatusDot({
  className,
  tone = "emerald",
}: {
  className?: string;
  tone?: "emerald" | "amber" | "primary";
}) {
  return (
    <span className={cn("relative flex size-2", className)}>
      <span
        className={cn(
          "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
          tone === "emerald" && "bg-emerald-500",
          tone === "amber" && "bg-amber-500",
          tone === "primary" && "bg-primary"
        )}
      />
      <span
        className={cn(
          "relative inline-flex size-2 rounded-full",
          tone === "emerald" && "bg-emerald-500",
          tone === "amber" && "bg-amber-500",
          tone === "primary" && "bg-primary"
        )}
      />
    </span>
  );
}
