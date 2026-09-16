import { NextRequest, NextResponse } from "next/server";

import { generateJSON } from "@/lib/gemini";
import { rateLimit, readIp } from "@/lib/rate-limit";

interface GeminiSummary {
  summary?: string;
  keyPoints?: string[];
}

export async function POST(request: NextRequest) {
  const { limited, retryAfterSec } = rateLimit(readIp(request), 10, 60_000);
  if (limited) {
    return NextResponse.json(
      { error: `Terlalu banyak permintaan. Coba lagi dalam ${retryAfterSec} detik.` },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    );
  }

  try {
    const body = (await request.json()) as { text?: string; filename?: string };
    const text = (body.text ?? "").slice(0, 80000).trim();

    if (!text) {
      return NextResponse.json(
        { error: "Teks PDF kosong atau tidak terbaca." },
        { status: 400 }
      );
    }

    const prompt = [
      "Rangkum materi berikut menjadi poin-poin penting untuk persiapan Tes Kemampuan Akademik (TKA).",
      body.filename ? `Nama file: ${body.filename}` : "",
      "Materi:",
      text,
      "Format jawaban HANYA JSON valid dengan bentuk:",
      '{"summary":"2-3 kalimat gambaran umum materi","keyPoints":["poin 1","poin 2","poin 3", ...]}',
      "Ketentuan: 8 sampai 15 keyPoints, setiap poin padat maksimal 2 kalimat, semua dalam Bahasa Indonesia, gunakan notasi matematika sederhana bila perlu.",
    ]
      .filter(Boolean)
      .join("\n");

    const result = await generateJSON<GeminiSummary>(prompt);

    if (!result.summary && !result.keyPoints?.length) {
      return NextResponse.json(
        { error: "AI tidak menghasilkan rangkuman. Coba lagi." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      summary: result.summary ?? "",
      keyPoints: result.keyPoints ?? [],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal merangkum PDF.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
