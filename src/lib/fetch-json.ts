export async function postJSON<T>(
  url: string,
  body: unknown,
  timeoutMs = 90_000
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

export async function postStream(
  url: string,
  body: unknown,
  onChunk: (text: string) => void,
  timeoutMs = 120_000
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!res.ok || !res.body) {
      let message = "Gagal menghubungi server.";
      try {
        const data = (await res.json()) as { error?: string };
        message = data.error ?? message;
      } catch {
        // non-JSON error body
      }
      throw new Error(message);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let reply = "";
    let errorMsg: string | null = null;

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const events = buffer.split("\n\n");
      buffer = events.pop() ?? "";
      for (const event of events) {
        const line = event
          .split("\n")
          .find((l) => l.startsWith("data: "));
        if (!line) continue;
        let data: { text?: string; done?: boolean; error?: string };
        try {
          data = JSON.parse(line.slice(6));
        } catch {
          continue;
        }
        if (data.text) {
          reply += data.text;
          onChunk(data.text);
        }
        if (data.error) errorMsg = data.error;
        if (data.done) {
          if (errorMsg) throw new Error(errorMsg);
          return reply;
        }
      }
    }

    if (errorMsg) throw new Error(errorMsg);
    return reply;
  } finally {
    clearTimeout(timer);
  }
}