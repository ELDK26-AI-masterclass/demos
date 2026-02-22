---
description: Agentic workflow: generate a compelling, on-brand product description for a Threadly t-shirt. Reads existing product data, determines tone from the target audience, generates the copy, and writes it back to the data file.
---

# Generate Product Description

**Goal**: Produce a concise, on-brand product description for a Threadly t-shirt
and persist it to `src/data/products.ts`.

---

## Inputs

You need the following before starting. If any are missing, ask the user before proceeding:

| Input         | Description                     | Example                            |
| ------------- | ------------------------------- | ---------------------------------- |
| `productSlug` | The URL-safe product identifier | `circuit-board-tee`                |
| `styleTag`    | Primary design style            | `minimalist` / `bold` / `retro`    |
| `audience`    | Who it's for                    | `developers`, `gamers`, `students` |

---

## Steps

### 1 · Load context

Read **`threadly-products`** skill — this gives you product schema, existing
descriptions to match in style, and Threadly's brand tone.

### 2 · Locate the product

Read `src/data/products.ts` and find the entry whose `slug` matches `productSlug`.
If the product does not exist, **stop and tell the user** — do not invent data.

### 3 · Analyse style & audience

Based on `styleTag` and `audience`:

- `minimalist` + `developers` → dry wit, one-liner tech pun, feature-led
- `bold` + `gamers` → punchy, high-energy, short sentences
- `retro` + `students` → nostalgic, warm, slightly cheeky

Threadly never uses the words: _premium_, _luxurious_, _unique_, _stunning_.

### 4 · Create the description

Use this prompt skeleton (fill in the `[slots]`):

```

You are the copywriter for Threadly, a t-shirt brand for tech-savvy people.
Tone: [tone derived from step 3].
Rules: max 2 sentences, max 25 words per sentence, no hype words.
Write a product description for: [product name].
Style theme: [styleTag]. Target audience: [audience].

```

### 5 · Review the output

- Confirm the description is ≤ 120 tokens.
- Check it mentions at least one concrete detail from the product (color, print, material).
- If it fails either check, regenerate once before asking the user.

### 6 · Write the result

Update the `description` field of the matching product in `src/data/products.ts`.

Show the user:

- The old description (if any)
- The new description
- A one-line explanation of the tone choice made in step 3

### 7 · Verify

Run `pnpm typecheck` to ensure the data file is still type-safe.
If errors appear, fix them before finishing.
