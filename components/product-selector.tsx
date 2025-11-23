"use client";

import { useMemo } from "react";
import { useStore } from "@/lib/store-context";
import { clsx } from "clsx";

export const ProductSelector = () => {
  const product = useStore((state) => state.product);
  const variant = useStore((state) => state.variant);
  const setVariant = useStore((state) => state.setVariant);

  const stats = useMemo(
    () => [
      { label: "Base price", value: `${product.basePrice.toFixed(0)} MAD` },
      { label: "Lead time", value: product.leadTime },
      { label: "Fabric", value: product.fabric }
    ],
    [product]
  );

  return (
    <section className="space-y-6 rounded-3xl border border-brand-dark/10 bg-white/70 p-6 shadow-lg shadow-brand-dark/5 backdrop-blur">
      <header className="space-y-2">
        <span className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Product</span>
        <h2 className="text-2xl font-semibold text-brand-dark">{product.name}</h2>
        <p className="text-sm text-brand-dark/70">{product.description}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {product.variants.map((option) => (
          <button
            key={option.id}
            onClick={() => setVariant(option)}
            className={clsx(
              "group flex flex-col gap-3 rounded-2xl border p-4 text-left transition",
              variant.id === option.id
                ? "border-brand-primary bg-brand-primary/10"
                : "border-brand-dark/10 hover:border-brand-primary/50"
            )}
          >
            <span
              className="inline-block h-12 w-full rounded-xl border border-brand-dark/10"
              style={{ backgroundColor: option.hex }}
            />
            <div>
              <p className="text-sm font-medium text-brand-dark">{option.colorName}</p>
              <p className="text-xs text-brand-dark/60">#{option.hex.replace("#", "")}</p>
            </div>
          </button>
        ))}
      </div>

      <dl className="grid grid-cols-3 gap-3 text-sm">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-brand-light/80 p-3">
            <dt className="text-xs uppercase tracking-wide text-brand-dark/60">{stat.label}</dt>
            <dd className="font-semibold text-brand-dark">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
