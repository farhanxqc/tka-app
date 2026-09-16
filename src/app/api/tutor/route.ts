import { NextRequest, NextResponse } from "next/server";

import { generateText } from "@/lib/gemini";
import { rateLimit, readIp } from "@/lib/rate-limit";
import type { ChatMessage } from "@/lib/types";

export async function POST(request: NextRequest) {
  const { limited, retryAfterSec } = rateLimit(readIp(request), 30, 60_000);
  if (limited) {
    return NextResponse.json(
      { error: `Terlalu banyak permintaan. Coba lagi dalam ${retryAfterSec} detik.` },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    );
  }

  try {
    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = body.messages ?? [];

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "Pesan kosong." },
        { status: 400 }
      );
    }

    const history = messages
      .slice(-12)
      .map((m) => `${m.role === "user" ? "Siswa" : "Tutor"}: ${m.content}`)
      .join("\n");

    const prompt = [
      "Kamu adalah tutor AI untuk persiapan Tes Kemampuan Akademik (TKA) jalur informatika/ilmu komputer.",
      "Jawab dengan Bahasa Indonesia yang jelas, padat, dan ramah.",
      "Bila soal matematika/fisika, tunjukkan langkah pengerjaan.",
      "Riwayat percakapan:",
      history,
      "Tutor:",
    ].join("\n");

    const reply = await generateText(prompt);

    if (!reply.trim()) {
      return NextResponse.json(
        { error: "AI tidak menghasilkan jawaban. Coba lagi." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal membalas chat.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
