import type { Metadata } from "next";

import { ProgressView } from "@/components/progress-view";

export const metadata: Metadata = {
  title: "Progres Belajar",
};

export default function ProgressPage() {
  return <ProgressView />;
}