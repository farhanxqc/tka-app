"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Camera, GraduationCap, Menu, Trash2, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "cn";

const PROFILE_KEY = "tka-profile-photo";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/tryout", label: "Try Out" },
  { href: "/belajar", label: "Belajar" },
  { href: "/pdf", label: "PDF to AI" },
  { href: "/progres", label: "Progres" },
] as const;

function readPhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const min = Math.min(img.width, img.height);
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("canvas unsupported"));
      ctx.drawImage(
        img,
        (img.width - min) / 2,
        (img.height - min) / 2,
        min,
        min,
        0,
        0,
        128,
        128
      );
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export function Navbar() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    void Promise.resolve(localStorage.getItem(PROFILE_KEY)).then(setPhoto);
  }, []);

  async function handlePick(file?: File | null) {
    if (!file) return;
    const dataUrl = await readPhoto(file);
    localStorage.setItem(PROFILE_KEY, dataUrl);
    setPhoto(dataUrl);
    setProfileOpen(false);
  }

  function removePhoto() {
    localStorage.removeItem(PROFILE_KEY);
    setPhoto(null);
    setProfileOpen(false);
  }

  const closeNav = () => setNavOpen(false);

  return (
    <div className="pointer-events-none sticky top-[calc(1rem+env(safe-area-inset-top))] z-40 px-3 sm:px-4">
      <nav
        className={`pointer-events-auto relative mx-auto flex w-full items-center gap-2 rounded-2xl border border-border/60 bg-background/80 shadow-lg shadow-foreground/5 backdrop-blur-xl transition-all duration-300 sm:w-fit ${
          scrolled
            ? "py-1.5 pr-2 pl-2.5 sm:rounded-xl"
            : "py-2 pr-2 pl-3 sm:rounded-full sm:pl-4"
        }`}
      >
        <div className="relative shrink-0">
          <button
            type="button"
            aria-label="Foto profil"
            aria-expanded={profileOpen}
            onClick={() => setProfileOpen(!profileOpen)}
            className={cn(
              "flex items-center justify-center overflow-hidden rounded-full ring-1 ring-border transition-all duration-300 hover:shadow-md",
              scrolled ? "size-9" : "size-11"
            )}
          >
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt="Foto profil"
                className="size-full object-cover"
              />
            ) : (
              <span className="flex size-full items-center justify-center bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-inner">
                <GraduationCap className="size-5" />
              </span>
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handlePick(e.target.files?.[0])}
          />
          {profileOpen && (
            <>
              <button
                type="button"
                aria-label="Tutup menu foto"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute top-full left-0 z-50 mt-2 w-44 rounded-xl border border-border/60 bg-background/95 p-1.5 shadow-xl shadow-foreground/10 backdrop-blur-xl">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <Camera className="size-4" />
                  {photo ? "Ganti Foto" : "Upload Foto"}
                </button>
                {photo && (
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <Trash2 className="size-4" />
                    Hapus Foto
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        <Link
          href="/"
          className="-ml-1 flex shrink-0 items-center pr-1 font-semibold transition-all duration-300 sm:pr-2"
          onClick={closeNav}
        >
          <span
            className={cn(
              "hidden transition-all duration-300 sm:inline",
              scrolled ? "text-sm" : "text-base"
            )}
          >
            Farhan Agent
          </span>
        </Link>

        <div className="no-scrollbar hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto overscroll-x-contain sm:flex sm:flex-none sm:rounded-full sm:bg-accent/70 sm:p-1.5">
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
      </nav>

      {navOpen && (
        <div className="pointer-events-auto absolute inset-x-3 top-full mt-2 rounded-2xl border border-border/60 bg-background/95 p-2 shadow-xl shadow-foreground/10 backdrop-blur-xl sm:hidden">
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
    </div>
  );
}