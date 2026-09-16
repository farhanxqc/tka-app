import { GoogleGenAI } from "@google/genai";

const MODEL = "gemini-3.6-flash";

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY belum diatur di .env.local");
  }
  return new GoogleGenAI({ apiKey });
}

export async function generateText(prompt: string): Promise<string> {
  const ai = getClient();
  const res = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });
  return res.text ?? "";
}

export async function generateJSON<T>(prompt: string): Promise<T> {
  const ai = getClient();
  const res = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: { responseMimeType: "application/json" },
  });
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
