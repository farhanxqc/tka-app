import type { Metadata } from "next";

import { TryOutExperience } from "@/components/tryout-experience";

export const metadata: Metadata = {
  title: "Try Out TKA",
};

export default function TryOutPage() {
  return <TryOutExperience />;
}
