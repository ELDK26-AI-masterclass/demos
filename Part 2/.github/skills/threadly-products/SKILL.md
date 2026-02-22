---
name: threadly-products
description: Threadly product catalogue — t-shirt names, slugs, styles, sizes, pricing, and brand tone guidance. Load this skill when generating product copy, building size recommendations, or any feature that reads product data.
---

# Threadly Product Catalogue

## Data shape (`src/data/products.ts`)

```typescript
export interface Product {
  id: string; // UUID
  slug: string; // URL-safe, kebab-case
  name: string;
  description: string; // Max 2 sentences, max 25 words each
  styleTag: "minimalist" | "bold" | "retro" | "abstract";
  audience: "developers" | "gamers" | "students" | "all";
  price: number; // GBP, e.g. 24.99
  sizes: Size[];
  colorway: Colorway;
  imageSlugs: string[]; // maps to /public/images/products/<slug>-<n>.webp
  inStock: boolean;
}

export type Size = "XS" | "S" | "M" | "L" | "XL" | "2XL";

export interface Colorway {
  primary: string; // CSS hex
  name: string; // e.g. "Navy/White"
}
```

## Current product catalogue (seed data)

| Slug                | Name                     | Style      | Audience   | Price  |
| ------------------- | ------------------------ | ---------- | ---------- | ------ |
| `circuit-board-tee` | Circuit Board Tee        | minimalist | developers | £24.99 |
| `binary-sunset`     | Binary Sunset            | abstract   | all        | £27.99 |
| `pixel-dragon`      | Pixel Dragon             | bold       | gamers     | £26.99 |
| `sudo-make-me`      | sudo make me a sandwich  | retro      | developers | £24.99 |
| `loading-spinner`   | Loading... (Spinner Tee) | minimalist | all        | £22.99 |

## Size guide (used by the size recommendation feature)

| Size | Chest (cm) | Body length (cm) | Fit     |
| ---- | ---------- | ---------------- | ------- |
| XS   | 86–91      | 66               | slim    |
| S    | 91–96      | 69               | slim    |
| M    | 99–104     | 71               | regular |
| L    | 107–112    | 74               | regular |
| XL   | 117–122    | 76               | relaxed |
| 2XL  | 127–132    | 79               | relaxed |

All tees are **100% organic cotton**, pre-shrunk. Recommend sizing up if the
customer is between sizes or prefers a looser fit.

## Brand tone for product copy

- Voice: friendly, witty, never pushy
- Threadly's audience appreciates dry tech humour
- Avoid: _premium_, _luxurious_, _unique_, _stunning_, _game-changing_
- Good example: "Wear your stack on your sleeve. Literally."
- Bad example: "This stunning premium tee is a unique masterpiece."