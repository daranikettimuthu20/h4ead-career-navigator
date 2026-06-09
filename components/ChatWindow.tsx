"use client";

import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import TopicChips from "./TopicChips";
import TypingIndicator from "./TypingIndicator";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const WELCOME: Message = {
  role: "assistant",
  content: `👋 Hi! I'm your H-4 EAD Career Navigator.

I can help you with:
- Work authorization rules — what you can and can't do
- Job search strategy — which companies to target
- Resume tips — how to present your visa status
- EAD renewal — step-by-step process ($520 filing fee)
- Interview prep — what to say about your status
- Visa change scenarios — what happens if things change

What would you like to know?`,
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function sendMessage(text?: string) {
    const userText = text || input.trim();
    if (!userText || isLoading) return;
    setInput("");

    const userMsg: Message = { role: "user", content: userText };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setIsLoading(true);

    try {
      const apiMessages = updated
        .filter((m) => !(m.role === "assistant" && m === WELCOME))
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages([...updated, { role: "assistant", content: data.message }]);
    } catch {
      setMessages([...updated, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f0f4ff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Navbar */}
      <nav style={{ background: "#0f172a", borderBottom: "1px solid #1e293b" }} className="px-8 py-4 flex items-center gap-4 sticky top-0 z-10">
        <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
          🧭
        </div>
        <div>
          <h1 style={{ color: "#f8fafc", fontSize: 17, fontWeight: 700, letterSpacing: "-0.3px" }}>H-4 EAD Career Navigator</h1>
          <p style={{ color: "#94a3b8", fontSize: 12 }}>AI-powered guidance for H-4 EAD holders</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ color: "#94a3b8", fontSize: 12, fontWeight: 500 }}>Live</span>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)", padding: "48px 24px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "4px 16px", marginBottom: 16 }}>
          <span style={{ color: "#c7d2fe", fontSize: 12, fontWeight: 600, letterSpacing: "0.5px" }}>✦ POWERED BY CLAUDE AI</span>
        </div>
        <h2 style={{ color: "#ffffff", fontSize: 36, fontWeight: 800, letterSpacing: "-1px", marginBottom: 12, lineHeight: 1.2 }}>
          Your H-4 EAD<br />Career Guide
        </h2>
        <p style={{ color: "#a5b4fc", fontSize: 16, marginBottom: 32 }}>
          Work authorization · Job search · Visa rules — answered instantly
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, maxWidth: 420, margin: "0 auto" }}>
          {[
            { num: "500K+", label: "H-4 EAD holders" },
            { num: "6", label: "Topic areas" },
            { num: "24/7", label: "AI guidance" },
          ].map((s) => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "16px 8px", textAlign: "center" }}>
              <div style={{ color: "#ffffff", fontSize: 24, fontWeight: 800 }}>{s.num}</div>
              <div style={{ color: "#a5b4fc", fontSize: 11, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Topic chips */}
      <TopicChips onSelect={sendMessage} />

      {/* Chat */}
      <div className="flex-1 px-4 py-6 flex flex-col gap-5 max-w-3xl w-full mx-auto">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
        {isLoading && (
          <div className="flex gap-3 items-start">
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>AI</div>
            <TypingIndicator />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ background: "#fff", borderTop: "1px solid #e2e8f0" }} className="sticky bottom-0 px-4 py-4 max-w-3xl w-full mx-auto">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask anything about H-4 EAD jobs, visa rules, resume..."
            disabled={isLoading}
            style={{ flex: 1, padding: "14px 20px", borderRadius: 50, border: "1.5px solid #e2e8f0", fontSize: 15, outline: "none", background: "#f8fafc", color: "#1e293b", fontFamily: "inherit" }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            style={{ width: 50, height: 50, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: isLoading || !input.trim() ? 0.4 : 1 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: "#94a3b8", marginTop: 10 }}>
          General guidance only — not legal advice · Verify fees & times at{" "}
          <a href="https://uscis.gov" target="_blank" style={{ color: "#6366f1" }}>uscis.gov</a>
        </p>
      </div>
    </div>
  );
}