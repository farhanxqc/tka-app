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
    <header className="sticky top-0 z-40 flex w-full justify-center">
      <div
        className={cn(
          "relative flex items-center gap-3 transition-[width,border-radius,padding,height,margin,background-color,box-shadow] duration-300 ease-out",
          scrolled
            ? "mx-auto mt-1 h-12 w-fit min-w-0 max-w-[97vw] rounded-full bg-background/70 pr-2 pl-3 shadow-lg shadow-foreground/5 ring-1 ring-border/50 backdrop-blur-xl"
            : "h-16 w-full bg-transparent sm:h-18"
        )}
      >
        <Link
          href="/"
          onClick={closeNav}
          className="flex shrink-0 items-center gap-2.5"
        >
          <span
            className={cn(
              "flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 font-bold text-primary-foreground shadow-inner transition-[width,height,font-size] duration-300 ease-out",
              scrolled ? "size-7 text-xs" : "size-9 text-sm"
            )}
          >
            F
          </span>
          <span
            className={cn(
              "font-semibold tracking-tight text-foreground transition-[font-size] duration-300 ease-out",
              scrolled ? "text-sm" : "text-lg"
            )}
          >
            farhantka.app
          </span>
        </Link>

        <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === link.href && "bg-accent text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            aria-label={navOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={navOpen}
            onClick={() => setNavOpen(!navOpen)}
            className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:hidden"
          >
            {navOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
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