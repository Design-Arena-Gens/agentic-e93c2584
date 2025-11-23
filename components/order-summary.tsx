"use client";

import { useMemo } from "react";
import { useStore } from "@/lib/store-context";

export const OrderSummary = () => {
  const product = useStore((state) => state.product);
  const variant = useStore((state) => state.variant);
  const layersCount = useStore((state) => state.layers.length);

  const addOns = useMemo(
    () => [
      { label: "DTG print zone", value: "30x40cm front" },
      { label: "Embroidery options", value: "Chest · Cap front" },
      { label: "Bulk pricing", value: "-20% from 25 units" }
    ],
    []
  );

  const productionFee = layersCount > 1 ? layersCount * 15 : 0;
  const estimatedTotal = product.basePrice + productionFee;

  return (
    <aside className="space-y-6 rounded-3xl border border-brand-dark/10 bg-brand-dark text-brand-light p-6 shadow-xl shadow-brand-dark/20">
      <header className="space-y-2">
        <span className="text-xs uppercase tracking-[0.3em] text-brand-primary/80">Checkout</span>
        <h2 className="text-2xl font-semibold text-white">Order breakdown</h2>
        <p className="text-sm text-white/70">
          Pay online (CB, CMI, PayPal) or request a pro-forma invoice. Files arrive in your inbox after checkout.
        </p>
      </header>

      <div className="rounded-2xl bg-white/10 p-4 text-sm">
        <div className="flex items-center justify-between pb-3">
          <span className="text-white/80">{product.name}</span>
          <span className="font-semibold text-white">{product.basePrice.toFixed(0)} MAD</span>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs text-white/70">
          <span>Variant</span>
          <span>{variant.colorName}</span>
        </div>
        <div className="flex items-center justify-between pt-2 text-xs text-white/70">
          <span>Extra production</span>
          <span>{productionFee ? `+${productionFee} MAD` : "Included"}</span>
        </div>
      </div>

      <dl className="space-y-3 text-sm">
        {addOns.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
            <dt className="text-white/70">{item.label}</dt>
            <dd className="font-semibold text-white">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex items-center justify-between rounded-2xl bg-brand-primary px-4 py-3 text-white">
        <span className="text-sm">Estimated total</span>
        <span className="text-xl font-semibold">{estimatedTotal.toFixed(0)} MAD</span>
      </div>

      <div className="space-y-3 text-sm">
        <button className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-brand-primary shadow-sm transition hover:bg-white/90">
          Checkout & upload files
        </button>
        <button className="w-full rounded-xl border border-white/30 px-4 py-3 font-semibold text-white transition hover:border-white/60">
          Book a production call
        </button>
        <p className="text-xs text-white/60">
          Files are produced automatically, stamped with your product SKU, and shared with your production manager.
        </p>
      </div>
    </aside>
  );
};
