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
          "grid grid-cols-[1fr_auto_1fr] items-center transition-[margin,border-radius,background-color,box-shadow,border-color,height] duration-300 ease-out",
          scrolled
            ? "mx-3 mt-2 h-11 rounded-full bg-background/70 px-3 shadow-lg shadow-foreground/5 ring-1 ring-border/50 backdrop-blur-xl sm:mx-[10%] xl:mx-auto xl:max-w-6xl"
            : "mx-0 h-14 bg-transparent"
        )}
      >
        <Link
          href="/"
          onClick={closeNav}
          className="flex h-full shrink-0 items-center justify-self-start pl-1"
        >
          <span
            className={cn(
              "font-semibold tracking-tight text-foreground transition-[font-size] duration-300 ease-out",
              scrolled ? "text-sm" : "text-lg"
            )}
          >
            farhantka.app
          </span>
        </Link>

        <nav aria-label="Navigasi halaman" className="flex justify-center">
          <div className="hidden items-center gap-1 sm:flex">
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
          </div>
        </nav>

        <div className="flex items-center gap-1 justify-self-end pr-1">
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