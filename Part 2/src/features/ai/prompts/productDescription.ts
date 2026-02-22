/**
 * Builds the system + user prompt for AI-generated product descriptions.
 *
 * Lives in src/features/ai/prompts/ as required by threadly-ai.instructions.md.
 * Unit-test this function; never call Azure OpenAI directly from tests.
 */

import type { Product } from "@/data/products";

type Tone = "dry-wit" | "punchy" | "nostalgic-warm";

function deriveTone(product: Pick<Product, "styleTag" | "audience">): Tone {
  if (product.audience === "developers" && product.styleTag === "minimalist")
    return "dry-wit";
  if (product.audience === "gamers" && product.styleTag === "bold")
    return "punchy";
  if (product.audience === "students" && product.styleTag === "retro")
    return "nostalgic-warm";
  return "dry-wit"; // safe default for Threadly's audience
}

const toneInstructions: Record<Tone, string> = {
  "dry-wit":
    "Dry wit, one-liner tech puns, feature-led. Short and clever over warm and chatty.",
  punchy: "Punchy and high-energy. Short sentences. Action verbs. No fluff.",
  "nostalgic-warm":
    "Nostalgic, warm, slightly cheeky. Reference shared cultural moments.",
};

export interface BuildPromptParams {
  product: Pick<Product, "name" | "styleTag" | "audience" | "colorway">;
}

export interface BuiltPrompt {
  system: string;
  user: string;
  maxTokens: number; // enforced by threadly-ai.instructions.md (≤120 for descriptions)
  tone: Tone;
}

export function buildProductDescriptionPrompt({
  product,
}: BuildPromptParams): BuiltPrompt {
  const tone = deriveTone(product);

  const system = `You are the copywriter for Threadly, a t-shirt brand for tech-savvy people.
Tone: ${toneInstructions[tone]}
Rules:
- Max 2 sentences.
- Max 25 words per sentence.
- Never use: premium, luxurious, unique, stunning, game-changing.
- Always mention the product colourway (${product.colorway.name}) or material (organic cotton).`;

  const user = `Write a product description for: "${product.name}".
Style theme: ${product.styleTag}. Target audience: ${product.audience}.`;

  return { system, user, maxTokens: 120, tone };
}
