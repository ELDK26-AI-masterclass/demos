/**
 * Support agent logic for the Threadly customer support chat feature.
 *
 * Strategy (from threadly-faq skill):
 *   1. Try fast keyword match against the FAQ catalogue below
 *   2. If matched → return scripted answer (no AI call)
 *   3. If unmatched → call Azure OpenAI with the grounding system prompt
 *
 * The agent operates within the boundaries defined in:
 *   .github/agents/threadly-support.md
 */

import { openai, DEPLOYMENT } from "@/lib/azure-openai";

// ─────────────────────────────────────────────────────────────────────────────
// FAQ catalogue (source of truth: .github/skills/threadly-faq/SKILL.md)
// ─────────────────────────────────────────────────────────────────────────────

interface FaqEntry {
  keywords: string[];
  answer: string;
}

const FAQ: FaqEntry[] = [
  {
    keywords: ["delivery", "shipping", "how long", "arrive"],
    answer:
      "UK orders arrive in 3–5 working days. EU is 5–10 days. Pick Express at checkout for next-day UK delivery.",
  },
  {
    keywords: ["track", "tracking", "where is my order"],
    answer:
      "You'll get a tracking link by email once your order ships. It can take up to 24 h to activate.",
  },
  {
    keywords: ["return", "refund", "send back"],
    answer:
      "Unworn items can be returned within 30 days for a full refund. Sale items are final.",
  },
  {
    keywords: ["exchange", "different size", "swap"],
    answer:
      "Return the original and place a new order. Exchanges are free for UK customers.",
  },
  {
    keywords: ["size", "sizing", "what size", "fit", "measurement"],
    answer:
      "Use the Size Recommendation tool on any product page — it suggests the best size based on your chest measurement and fit preference.",
  },
  {
    keywords: ["material", "cotton", "fabric", "made of"],
    answer:
      "All Threadly tees are 100% GOTS-certified organic cotton, pre-shrunk, and printed with water-based inks.",
  },
  {
    keywords: ["damaged", "broken", "wrong item", "mistake"],
    answer:
      "Sorry about that! Email support@threadly.shop with a photo and your order number. We'll sort it within 48 h.",
  },
  {
    keywords: ["customise", "custom", "my own design", "personalise"],
    answer:
      "Not yet — but it's coming! Join the waitlist at threadly.shop/custom.",
  },
  {
    keywords: ["restock", "out of stock", "sold out", "notify"],
    answer:
      'Most designs are restocked within 2–4 weeks. Hit "Notify me" on the product page to get an alert.',
  },
];

const GROUNDING_SYSTEM_PROMPT = `You are Threadly's friendly support assistant.
You only answer questions about Threadly products, orders, sizing, and returns.
If asked anything else, politely redirect to threadly.shop/contact.
Keep answers under 3 sentences. Tone: helpful and mildly witty.
You are Threadly Support — never identify yourself as an AI model.`;

// Topics that must never be handled by the chat agent
const ESCALATION_KEYWORDS = [
  "chargeback",
  "dispute",
  "wholesale",
  "bulk order",
  "press",
  "media",
];

// ─────────────────────────────────────────────────────────────────────────────
// Agent
// ─────────────────────────────────────────────────────────────────────────────

export type AgentStatus = "idle" | "loading" | "error";

export interface AgentResponse {
  answer: string;
  source: "faq" | "ai" | "escalation";
}

function matchFaq(question: string): FaqEntry | undefined {
  const q = question.toLowerCase();
  return FAQ.find((entry) => entry.keywords.some((kw) => q.includes(kw)));
}

function requiresEscalation(question: string): boolean {
  const q = question.toLowerCase();
  return ESCALATION_KEYWORDS.some((kw) => q.includes(kw));
}

export async function askSupportAgent(
  question: string,
): Promise<AgentResponse> {
  // Guard: escalation topics
  if (requiresEscalation(question)) {
    return {
      answer:
        "That one's best handled by our team directly — reach us at support@threadly.shop.",
      source: "escalation",
    };
  }

  // Fast path: FAQ keyword match (no AI call needed)
  const faqMatch = matchFaq(question);
  if (faqMatch) {
    return { answer: faqMatch.answer, source: "faq" };
  }

  // Slow path: Azure OpenAI with grounding prompt
  const completion = await openai.chat.completions.create({
    model: DEPLOYMENT,
    stream: false,
    max_tokens: 120,
    messages: [
      { role: "system", content: GROUNDING_SYSTEM_PROMPT },
      { role: "user", content: question },
    ],
  });

  const answer =
    completion.choices[0]?.message?.content?.trim() ??
    "I'm not sure about that one — try threadly.shop/contact for a definitive answer.";

  return { answer, source: "ai" };
}
