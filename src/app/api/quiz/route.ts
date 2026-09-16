import { NextRequest, NextResponse } from "next/server";

import { generateJSON } from "@/lib/gemini";
import { rateLimit, readIp } from "@/lib/rate-limit";
import type { QuizQuestion, QuizRequest } from "@/lib/types";

interface GeminiQuiz {
  questions?: QuizQuestion[];
}

export async function POST(request: NextRequest) {
  const { limited, retryAfterSec } = rateLimit(readIp(request), 20, 60_000);
  if (limited) {
    return NextResponse.json(
      { error: `Terlalu banyak permintaan. Coba lagi dalam ${retryAfterSec} detik.` },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    );
  }

  try {
    const body = (await request.json()) as QuizRequest;
    const count = Math.min(Math.max(body.count ?? 10, 1), 20);
    const difficulty = body.difficulty ?? "sedang";

    const parts: string[] = [
      "Kamu adalah pembuat soal ahli untuk Tes Kemampuan Akademik (TKA).",
      `Buatkan ${count} soal pilihan ganda tingkat kesulitan ${difficulty}.`,
    ];

    if (body.sourceText) {
      parts.push(
        "Basis soal adalah materi berikut. Buat soal yang menguji pemahaman materi ini secara langsung:",
        body.sourceText
      );
    } else if (body.customPrompt) {
      parts.push(`Instruksi khusus dari pengguna: ${body.customPrompt}`);
    } else {
      if (body.subject) parts.push(`Mata pelajaran: ${body.subject}.`);
      if (body.topic) parts.push(`Topik: ${body.topic}.`);
      if (!body.subject && !body.topic) {
        parts.push(
          "Mata pelajaran: pilih satu dari Bahasa Indonesia, Matematika, atau Bahasa Inggris."
        );
      }
    }

    parts.push(
      "Format jawaban HANYA JSON valid dengan bentuk:",
      '{"questions":[{"question":"...","options":["A","B","C","D"],"answer":0,"explanation":"..."}]}',
      "Ketentuan: tepat 4 opsi per soal, answer adalah index 0-3 opsi benar, explanation berisi pembahasan langkah demi langkah dalam Bahasa Indonesia."
    );

    const result = await generateJSON<GeminiQuiz>(parts.join("\n"));
    const questions = result.questions ?? [];

    if (questions.length === 0) {
      return NextResponse.json(
        { error: "AI tidak menghasilkan soal. Coba lagi." },
        { status: 502 }
      );
    }

    return NextResponse.json({ questions });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal generate soal.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
