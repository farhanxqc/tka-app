import type { Metadata } from "next";

import { PdfWorkspace } from "@/components/pdf-workspace";

export const metadata: Metadata = {
  title: "PDF to AI",
};

export default function PdfPage() {
  return <PdfWorkspace />;
}
