"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

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
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeNav = () => setNavOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div
        className={cn(
          "w-full border-b transition-all duration-300",
          scrolled
            ? "border-border/40 bg-background/70 shadow-sm shadow-foreground/5 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-6xl items-center gap-3 px-4 transition-all duration-300",
            scrolled ? "h-14" : "h-16 sm:h-18"
          )}
        >
          <Link
            href="/"
            onClick={closeNav}
            className="flex shrink-0 items-center gap-2.5"
          >
            <span
              className={cn(
                "flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 text-sm font-bold text-primary-foreground shadow-inner transition-all duration-300",
                scrolled ? "size-7" : "size-9"
              )}
            >
              F
            </span>
            <span
              className={cn(
                "font-semibold tracking-tight text-foreground transition-all duration-300",
                scrolled ? "text-sm" : "text-lg"
              )}
            >
              farhantka.app
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 sm:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  pathname === link.href &&
                    "bg-accent text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:ml-0">
            <ThemeToggle />
            <button
              type="button"
              aria-label={navOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={navOpen}
              onClick={() => setNavOpen(!navOpen)}
              className={cn(
                "flex items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:bg-accent hover:text-foreground sm:hidden",
                scrolled ? "size-9" : "size-11"
              )}
            >
              {navOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {navOpen && (
        <div className="absolute inset-x-3 top-full mt-2 rounded-2xl border border-border/60 bg-background/95 p-2 shadow-xl shadow-foreground/10 backdrop-blur-xl sm:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeNav}
              className={cn(
                "flex items-center rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === link.href && "bg-accent/70 text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}