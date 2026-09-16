import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Navbar } from "@/components/navbar";
import { SiteBackground } from "@/components/site-background";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";
import { TutorChat } from "@/components/tutor-chat";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Farhan Agent",
    template: "%s — Farhan Agent",
  },
  description:
    "Try out TKA dan manajemen belajar mandiri berbasis AI: generator soal, rangkuman PDF, dan tutor chat.",
  applicationName: "Farhan Agent",
  keywords: [
    "TKA",
    "try out",
    "UTBK",
    "belajar",
    "AI",
    "rangkuman PDF",
    "soal latihan",
  ],
  authors: [{ name: "Farhan" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "Farhan Agent",
    locale: "id_ID",
    url: "/",
    title: "Farhan Agent — Try Out TKA & Belajar mandiri berbasis AI",
    description:
      "Latihan soal interaktif untuk TKA plus rangkuman instan dari dokumen PDF materimu.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farhan Agent — Try Out TKA & Belajar mandiri berbasis AI",
    description:
      "Latihan soal interaktif untuk TKA plus rangkuman instan dari dokumen PDF materimu.",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SmoothScroll />
          <SiteBackground />
          <Navbar />
          <main className="flex-1">{children}</main>
          <TutorChat />
          <Toaster position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
