import React, { useState } from "react";
import { askSupportAgent } from "./supportAgent";
import type { AgentStatus } from "./supportAgent";
import { Button } from "@/components/ui/Button";

interface Message {
  role: "user" | "agent";
  text: string;
  source?: "faq" | "ai" | "escalation";
}

export function SupportChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      text: "Hi! I'm Threadly Support. Ask me anything about orders, sizing, or our tees.",
    },
  ]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<AgentStatus>("idle");

  async function handleSend() {
    const question = input.trim();
    if (!question) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setStatus("loading");

    try {
      const response = await askSupportAgent(question);
      setMessages((prev) => [
        ...prev,
        { role: "agent", text: response.answer, source: response.source },
      ]);
      setStatus("idle");
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          text: "Sorry, something went wrong on my end. Try threadly.shop/contact.",
        },
      ]);
      setStatus("error");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") void handleSend();
  }

  return (
    <div className="border rounded-lg overflow-hidden max-w-xl bg-white shadow-sm">
      {/* Message list */}
      <div className="h-72 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={[
                "rounded-lg px-3 py-2 text-sm max-w-[80%]",
                msg.role === "user"
                  ? "bg-threadly-navy text-white"
                  : "bg-gray-100 text-gray-800",
              ].join(" ")}
              data-testid={msg.role === "agent" ? "ai-output" : undefined}
            >
              {msg.text}
              {msg.source && msg.source !== "faq" && (
                <span className="block mt-1 text-xs opacity-50">
                  {msg.source === "ai" ? "✦ AI" : "↗ Escalated"}
                </span>
              )}
            </div>
          </div>
        ))}
        {status === "loading" && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-3 py-2">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-threadly-orange animate-bounce [animation-delay:0ms]" />
                <span className="h-2 w-2 rounded-full bg-threadly-orange animate-bounce [animation-delay:150ms]" />
                <span className="h-2 w-2 rounded-full bg-threadly-orange animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input row */}
      <div className="border-t p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about sizing, orders, returns…"
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-threadly-navy"
        />
        <Button
          size="sm"
          onClick={() => void handleSend()}
          loading={status === "loading"}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default SupportChat;
