"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useStore } from "@/lib/store-context";
import { PRODUCTS } from "@/lib/products";
import { clsx } from "clsx";

export const Header = () => {
  const activeProductId = useStore((state) => state.product.id);
  const setProduct = useStore((state) => state.setProduct);

  const items = useMemo(() => PRODUCTS, []);

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-brand-light/80 border-b border-brand-dark/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-white font-bold">
            AA
          </span>
          Atelier Atlas
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium">
          {items.map((product) => (
            <button
              key={product.id}
              onClick={() => setProduct(product)}
              className={clsx(
                "rounded-full border px-4 py-2 transition",
                activeProductId === product.id
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-transparent bg-white hover:border-brand-primary/60 hover:text-brand-primary"
              )}
            >
              {product.name}
            </button>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4 text-xs text-brand-dark/70">
          <span>Casablanca Print Hub</span>
          <span className="inline-flex h-2 w-2 rounded-full bg-brand-primary" />
          <span>Amana · Arame Express</span>
        </div>
      </div>
    </header>
  );
};
