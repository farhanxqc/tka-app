import type { ScoreRecord } from "./types";

const KEY = "tka-scores";

export function getScores(): ScoreRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ScoreRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addScore(
  rec: Omit<ScoreRecord, "id" | "date">
): ScoreRecord {
  const record: ScoreRecord = {
    ...rec,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  const scores = getScores();
  scores.unshift(record);
  window.localStorage.setItem(KEY, JSON.stringify(scores.slice(0, 100)));
  return record;
}

export function clearScores(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
