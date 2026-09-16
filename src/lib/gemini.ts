import { GoogleGenAI } from "@google/genai";

const MODEL = "gemini-3.6-flash";

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY belum diatur di .env.local");
  }
  return new GoogleGenAI({ apiKey });
}

const RETRY_DELAYS_MS = [2_000, 4_000, 8_000];

export function isTransientError(error: unknown): boolean {
  const m = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  return (
    /429|resource_exhausted|quota|overloaded|high demand|unavailable|503|5033/.test(m)
  );
}

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (!isTransientError(error) || attempt >= RETRY_DELAYS_MS.length) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAYS_MS[attempt]));
    }
  }
}

export async function generateText(prompt: string): Promise<string> {
  const ai = getClient();
  const res = await withRetry(() =>
    ai.models.generateContent({
      model: MODEL,
      contents: prompt,
    })
  );
  return res.text ?? "";
}

export async function streamText(
  prompt: string,
  onChunk: (text: string) => void
): Promise<void> {
  const ai = getClient();
  const res = await withRetry(() =>
    ai.models.generateContentStream({
      model: MODEL,
      contents: prompt,
    })
  );
  for await (const chunk of res) {
    const text = chunk.text ?? "";
    if (text) onChunk(text);
  }
}

export async function generateJSON<T>(prompt: string): Promise<T> {
  const ai = getClient();
  const res = await withRetry(() =>
    ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json" },
    })
  );
  const raw = (res.text ?? "").trim();
  const cleaned = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/, "")
    .trim();
  try {
    return JSON.parse(cleaned) as T;
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]) as T;
      } catch {
        // fallthrough
      }
    }
    console.error("GEMINI_RAW_OUTPUT:", raw);
    throw new Error("AI mengembalikan format tidak valid. Coba lagi.");
  }
}
