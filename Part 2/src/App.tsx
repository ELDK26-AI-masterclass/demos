import React, { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { SupportChat } from "@/features/support/SupportChat";

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  function handleAddToCart(_id: string) {
    setCartCount((n) => n + 1);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <header className="bg-threadly-navy text-white px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-xl tracking-tight">Threadly</span>
        <span className="text-sm opacity-80">
          🛒 {cartCount} {cartCount === 1 ? "item" : "items"}
        </span>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-threadly-navy mb-6">Shop</h1>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {products.map((p) => (
            <ProductCard
              key={p.slug}
              slug={p.slug}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Support chat */}
        <div className="border-t pt-10">
          <h2 className="text-xl font-semibold text-threadly-navy mb-4">
            Customer Support
          </h2>
          <SupportChat />
        </div>
      </main>
    </div>
  );
}
