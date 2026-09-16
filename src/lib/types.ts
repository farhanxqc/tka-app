export type Difficulty = "mudah" | "sedang" | "sulit";

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface QuizRequest {
  topic?: string;
  subject?: string;
  difficulty?: Difficulty;
  count?: number;
  customPrompt?: string;
  sourceText?: string;
}

export interface ScoreRecord {
  id: string;
  date: string;
  topic: string;
  score: number;
  total: number;
  source: "tryout" | "pdf";
}

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}
