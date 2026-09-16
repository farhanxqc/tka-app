"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "cn";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/tryout", label: "Try Out" },
  { href: "/belajar", label: "Belajar" },
  { href: "/pdf", label: "PDF to AI" },
  { href: "/progres", label: "Progres" },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="pointer-events-none sticky top-4 z-40 px-3 sm:px-4">
      <nav className="pointer-events-auto mx-auto flex w-full items-center gap-2 rounded-2xl border border-border/60 bg-background/80 py-2 pr-2 pl-4 shadow-lg shadow-foreground/5 backdrop-blur-xl sm:w-fit sm:rounded-full sm:pl-5">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 pr-1 font-semibold sm:pr-2"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-inner">
            <GraduationCap className="size-5" />
          </span>
          <span className="hidden sm:inline">Farhan Agent</span>
        </Link>

        <div className="no-scrollbar flex min-w-0 flex-1 items-center gap-1 overflow-x-auto overscroll-x-contain sm:flex-none sm:rounded-full sm:bg-accent/70 sm:p-1.5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:px-4 sm:text-sm",
                pathname === link.href &&
                  "bg-primary text-primary-foreground hover:text-primary-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <ThemeToggle />
      </nav>
    </div>
  );
}
