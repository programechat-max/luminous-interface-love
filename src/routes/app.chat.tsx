import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { initialChat, type ChatMessage } from "@/lib/lumiere";

export const Route = createFileRoute("/app/chat")({
  head: () => ({
    meta: [
      { title: "Lumiere AI Koç — Sohbet" },
      {
        name: "description",
        content:
          "AI koçunla sohbet et: antrenman, beslenme ve motivasyon sorularına anında yanıt al.",
      },
      { property: "og:title", content: "Lumiere AI Koç — Sohbet" },
      {
        property: "og:description",
        content: "Koçuna istediğin zaman soru sor.",
      },
    ],
  }),
  component: ChatPage,
});

const quick = ["Protein hedefim?", "Bugün ne yemeliyim?", "Kaslarım ağrıyor"];

function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChat);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    const now = new Date().toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "user", content: value, timestamp: now },
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Anladım. Planına göre bugün 70g protein ve bir üst çekiş antrenmanı kaldı. Hazır olduğunda başlayalım.",
        timestamp: now,
      },
    ]);
    setInput("");
  };

  return (
    <main className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-30 -mx-5 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-b border-border bg-background/85 px-5 pb-3 pad-safe-top backdrop-blur-xl">
        <span className="ember grid h-11 w-11 shrink-0 place-items-center rounded-2xl">
          <Sparkles size={19} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">Lumiere AI Koç</p>
          <p className="flex items-center gap-1.5 text-xs text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Çevrimiçi
          </p>
        </div>
      </header>

      <div className="flex-1 space-y-3 py-5">
        {messages.map((m) => (
          <div
            key={m.id}
            className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "ember rounded-br-md"
                  : "rounded-bl-md border border-border bg-surface"
              }`}
            >
              {m.content}
              <span className="mt-1.5 block text-[10px] opacity-60">
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="sticky bottom-24 -mx-5 px-5">
        <div className="no-scrollbar mb-2 flex gap-2 overflow-x-auto">
          {quick.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="shrink-0 rounded-full border border-border bg-surface px-3.5 py-2 text-xs font-semibold text-muted-foreground"
            >
              {q}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="surface-card flex items-center gap-2 p-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Koçuna bir şey sor..."
            className="h-11 min-w-0 flex-1 bg-transparent px-3 text-base outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            aria-label="Gönder"
            className="ember grid h-11 w-11 shrink-0 place-items-center rounded-xl active:scale-95"
          >
            <Send size={17} />
          </button>
        </form>
      </div>
    </main>
  );
}
