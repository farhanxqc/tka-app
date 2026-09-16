import type { Metadata } from "next";

import { LearningHub } from "@/components/learning-hub";

export const metadata: Metadata = {
  title: "Pusat Belajar",
};

export default function LearningPage() {
  return <LearningHub />;
}
