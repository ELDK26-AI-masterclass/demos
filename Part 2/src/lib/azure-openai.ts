/**
 * Shared Azure OpenAI client for Threadly.
 *
 * All AI features MUST import from here — never instantiate OpenAI directly.
 * Deployment: threadly-gpt4o (model: gpt-4o)
 *
 * Usage:
 *   import { openai, DEPLOYMENT } from '@/lib/azure-openai';
 *   const res = await openai.chat.completions.create({ model: DEPLOYMENT, ... });
 */

import OpenAI from "openai";

if (!import.meta.env.VITE_AZURE_OPENAI_ENDPOINT) {
  throw new Error(
    "VITE_AZURE_OPENAI_ENDPOINT is not set. Check your .env.local file.",
  );
}
if (!import.meta.env.VITE_AZURE_OPENAI_KEY) {
  throw new Error(
    "VITE_AZURE_OPENAI_KEY is not set. Check your .env.local file.",
  );
}

export const DEPLOYMENT = "threadly-gpt4o";

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_AZURE_OPENAI_KEY,
  baseURL: `${import.meta.env.VITE_AZURE_OPENAI_ENDPOINT}/openai/deployments/${DEPLOYMENT}`,
  defaultQuery: { "api-version": "2024-12-01-preview" },
  defaultHeaders: { "api-key": import.meta.env.VITE_AZURE_OPENAI_KEY },
  dangerouslyAllowBrowser: true, // intentional for this demo; use a proxy in production
});
