import type { Metadata } from "next";
import { Poppins, Quicksand } from "next/font/google";

import { Navbar } from "@/components/navbar";
import { SiteBackground } from "@/components/site-background";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";
import { TutorChat } from "@/components/tutor-chat";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "farhantka.app",
    template: "%s — farhantka.app",
  },
  description:
    "Try out TKA dan manajemen belajar mandiri berbasis AI: generator soal, rangkuman PDF, dan tutor chat.",
  applicationName: "farhantka.app",
  keywords: [
    "TKA",
    "try out",
    "UTBK",
    "belajar",
    "AI",
    "rangkuman PDF",
    "soal latihan",
  ],
  authors: [{ name: "Raihan Farhani" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "farhantka.app",
    locale: "id_ID",
    url: "/",
    title: "farhantka.app — Try Out TKA & Belajar mandiri berbasis AI",
    description:
      "Latihan soal interaktif untuk TKA plus rangkuman instan dari dokumen PDF materimu.",
  },
  twitter: {
    card: "summary_large_image",
    title: "farhantka.app — Try Out TKA & Belajar mandiri berbasis AI",
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
      className={`${poppins.variable} ${quicksand.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
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
