import { NextRequest, NextResponse } from "next/server";

import { streamText } from "@/lib/gemini";
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

  let messages: ChatMessage[];
  try {
    const body = (await request.json()) as { messages?: ChatMessage[] };
    messages = body.messages ?? [];
  } catch {
    return NextResponse.json({ error: "Payload tidak valid." }, { status: 400 });
  }

  if (messages.length === 0) {
    return NextResponse.json({ error: "Pesan kosong." }, { status: 400 });
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

  const encoder = new TextEncoder();
  const send = (
    controller: ReadableStreamDefaultController<Uint8Array>,
    obj: unknown
  ) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        await streamText(prompt, (text) => send(controller, { text }));
        send(controller, { done: true });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Gagal membalas chat.";
        send(controller, { error: message, done: true });
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}