export type Size = "XS" | "S" | "M" | "L" | "XL" | "2XL";

export interface Colorway {
  primary: string; // CSS hex
  name: string; // e.g. "Navy/White"
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  styleTag: "minimalist" | "bold" | "retro" | "abstract";
  audience: "developers" | "gamers" | "students" | "all";
  price: number; // GBP
  sizes: Size[];
  colorway: Colorway;
  imageSlugs: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "a1b2c3d4-0001",
    slug: "circuit-board-tee",
    name: "Circuit Board Tee",
    description:
      "Your PCB obsession, now wearable. Clean traces on organic cotton.",
    styleTag: "minimalist",
    audience: "developers",
    price: 24.99,
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colorway: { primary: "#1B3A6B", name: "Navy/White" },
    imageSlugs: ["circuit-board-tee-1", "circuit-board-tee-2"],
    inStock: true,
  },
  {
    id: "a1b2c3d4-0002",
    slug: "binary-sunset",
    name: "Binary Sunset",
    description:
      "01001100 01101111 01110110 01100101. A sunset only you can decode.",
    styleTag: "abstract",
    audience: "all",
    price: 27.99,
    sizes: ["S", "M", "L", "XL"],
    colorway: { primary: "#F5821F", name: "Orange/Black" },
    imageSlugs: ["binary-sunset-1"],
    inStock: true,
  },
  {
    id: "a1b2c3d4-0003",
    slug: "pixel-dragon",
    name: "Pixel Dragon",
    description: "16-bit beast. 100% cotton. Zero lag.",
    styleTag: "bold",
    audience: "gamers",
    price: 26.99,
    sizes: ["S", "M", "L", "XL", "2XL"],
    colorway: { primary: "#2D2D2D", name: "Charcoal/Teal" },
    imageSlugs: ["pixel-dragon-1", "pixel-dragon-2"],
    inStock: true,
  },
  {
    id: "a1b2c3d4-0004",
    slug: "context-window",
    name: "Context Window Tee",
    description:
      "128k tokens and counting. Wear your limits on your sleeve — or your chest.",
    styleTag: "minimalist",
    audience: "developers",
    price: 24.99,
    sizes: ["XS", "S", "M", "L", "XL"],
    colorway: { primary: "#FFFFFF", name: "White/Black" },
    imageSlugs: ["context-window-1"],
    inStock: true,
  },
  {
    id: "a1b2c3d4-0005",
    slug: "loading-spinner",
    name: "Loading... (Spinner Tee)",
    description:
      "For when life needs a moment to catch up. Ships faster than it renders.",
    styleTag: "minimalist",
    audience: "all",
    price: 22.99,
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colorway: { primary: "#6B7280", name: "Grey/White" },
    imageSlugs: ["loading-spinner-1"],
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
