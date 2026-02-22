---
description: Core project rules for Threadly — a React + TypeScript t-shirt e-commerce shop. Apply to every file in the project to ensure brand, tech stack, and coding conventions are always respected.
applyTo: "**/*"
---

# Threadly – Project Instructions

## What is Threadly?

Threadly is an e-commerce storefront for custom, tech-themed t-shirts.
Tagline: **"Smart Tees, Cool Style"**

## Tech stack

- **Framework**: React 18 with TypeScript (strict mode)
- **Build tool**: Vite
- **Styling**: Tailwind CSS — never write inline `style={}` props
- **State**: React Context + `useReducer` for cart state; no Redux
- **Routing**: React Router v6 (file-based naming convention)
- **AI integration**: Azure OpenAI via the project's `src/lib/azure-openai.ts` client

## Brand identity

| Token           | Value                                        |
| --------------- | -------------------------------------------- |
| Primary (navy)  | `#1B3A6B` — Tailwind class `threadly-navy`   |
| Accent (orange) | `#F5821F` — Tailwind class `threadly-orange` |
| Font family     | Inter (headings), system-ui (body)           |

Never use generic Bootstrap-style buttons. Use the `<Button>` component from `src/components/ui/Button.tsx`.

## File & folder conventions

```

src/
components/ # Shared UI components — PascalCase filenames
features/ # Feature slices (cart/, products/, ai/, support/)
lib/ # Pure utility & API clients
data/ # Static seed data (products.ts, faqs.ts)
pages/ # Top-level route components

```

## Coding rules

- All components must be **typed** — no `any`, no implicit `any`.
- Export a named export AND a default export from each component file.
- Every async function that calls the Azure OpenAI API **must** have a try/catch with a user-visible fallback state.
- Product images are served from `/public/images/products/` — use the helper `getProductImageUrl(slug)` from `src/lib/images.ts`.

## Do NOT

- Do not add new npm packages without asking.
- Do not hard-code product data inside components — always read from `src/data/products.ts`.
- Do not call OpenAI directly from components — go through `src/features/ai/`.