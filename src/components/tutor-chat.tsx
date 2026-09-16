"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bot, CircleStop, Loader2, SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postJSON } from "@/lib/fetch-json";
import { cn } from "cn";
import type { ChatMessage } from "@/lib/types";

const SUGGESTIONS = [
  "Jelaskan konsep integral tentu",
  "Cara menganalisis teks editorial",
  "Bedakan simple past vs present perfect",
];

export function TutorChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("tka:open-tutor", handler);
    return () => window.removeEventListener("tka:open-tutor", handler);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const next: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const data = await postJSON<{ reply?: string; error?: string }>(
        "/api/tutor",
        { messages: next }
      );
      setMessages([
        ...next,
        {
          role: "model",
          content: data.reply ?? data.error ?? "Terjadi kesalahan.",
        },
      ]);
    } catch {
      setMessages([
        ...next,
        { role: "model", content: "Gagal terhubung ke server. Coba lagi." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.button
        type="button"
        aria-label={open ? "Tutup tutor AI" : "Buka tutor AI"}
        style={{ willChange: "transform" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed right-4 bottom-4 z-50 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg"
      >
        {open ? <CircleStop className="size-5" /> : <Bot className="size-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed right-4 bottom-20 z-50 flex h-[28rem] w-[min(92vw,22rem)] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl"
          >
            <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
              <Bot className="size-4 text-primary" />
              <span className="text-sm font-semibold">Tutor AI</span>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Tanya apa saja seputar materi TKA:
                  </p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="block w-full rounded-lg border border-border/60 bg-accent/50 px-3 py-2 text-left text-sm transition-colors hover:bg-accent"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap",
                    m.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-accent"
                  )}
                >
                  {m.content}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  Tutor sedang berpikir…
                </div>
              )}
            </div>

            <form
              className="flex items-center gap-2 border-t border-border/60 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tulis pertanyaan…"
                disabled={loading}
              />
              <Button
                type="submit"
                size="icon"
                aria-label="Kirim"
                disabled={loading || !input.trim()}
              >
                <SendHorizontal />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
