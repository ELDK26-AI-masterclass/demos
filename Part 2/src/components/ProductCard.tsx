/**
 * ⚠️  DEMO FILE — intentionally written with quality issues.
 *
 * This component was scaffolded quickly ("vibe coded") and has several
 * violations of the Threadly coding conventions defined in:
 *   .github/instructions/threadly.instructions.md
 *   .github/instructions/threadly-ai.instructions.md
 *
 * Run the `refactor-component` prompt against this file to see the agent
 * detect and fix each issue.
 *
 * Known violations (for demo purposes):
 *   1. Props are not typed with a named interface — uses inline type
 *   2. Inline style={} props instead of Tailwind classes (lines ~40, ~52)
 *   3. Direct fetch() call instead of going through src/lib/
 *   4. `any` type on the API response
 *   5. No loading/error state for the AI-generated description
 *   6. Hard-coded product image path instead of getProductImageUrl()
 */

import React, { useEffect, useState } from "react";
import { products } from "../data/products";

// ❌ Violation 1: props typed inline, not with a named interface
export function ProductCard(props: {
  slug: string;
  onAddToCart: (id: string) => void;
}) {
  // ❌ Violation 5: no loading or error state — AI output has no fallback
  const [aiDescription, setAiDescription] = useState("");

  const product = products.find((p) => p.slug === props.slug);

  useEffect(() => {
    if (!product) return;

    // ❌ Violation 3: direct fetch() — should use the openai client from @/lib/azure-openai
    // ❌ Violation 4: response typed as `any`
    fetch(
      "https://my-azure-endpoint.openai.azure.com/openai/deployments/threadly-gpt4o/chat/completions?api-version=2024-02-15-preview",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": "sk-hardcoded-bad-idea-do-not-do-this",
        },
        body: JSON.stringify({
          messages: [
            { role: "user", content: `Describe this t-shirt: ${product.name}` },
          ],
          max_tokens: 200,
        }),
      },
    )
      .then((r) => r.json())
      .then((data: any) => {
        setAiDescription(data.choices[0].message.content);
      });
  }, [product?.slug]);

  if (!product) return <p>Product not found.</p>;

  return (
    // ❌ Violation 2a: inline style instead of Tailwind
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
        maxWidth: 320,
      }}
    >
      {/* ❌ Violation 6: hard-coded image path, should use getProductImageUrl() and use imageSlugs[0] instead */}
      <img
        src={`/images/products/${product.slug}.png`}
        alt={product.name}
        // ❌ Violation 2b: more inline styles
        style={{
          width: "100%",
          height: 200,
          objectFit: "contain",
          borderRadius: 4,
        }}
      />

      <h2 style={{ marginTop: 12, fontSize: 18, fontWeight: 600 }}>
        {product.name}
      </h2>

      {/* ❌ Violation 5: renders AI output directly — no idle/loading/error states */}
      <p style={{ color: "#666", fontSize: 14 }}>
        {aiDescription || product.description}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 16 }}>
          £{product.price.toFixed(2)}
        </span>

        {/* ❌ Not using the <Button> component from src/components/ui/Button.tsx */}
        <button
          style={{
            background: "#1B3A6B",
            color: "white",
            padding: "8px 16px",
            borderRadius: 4,
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => props.onAddToCart(product.id)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
