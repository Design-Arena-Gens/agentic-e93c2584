"use client";

import { Header } from "./header";
import { ProductSelector } from "./product-selector";
import { LayerPanel } from "./layer-panel";
import { CustomizerView } from "./customizer-view";
import { OrderSummary } from "./order-summary";
import { Workflow } from "./workflow";
import { FAQ } from "./faq";
import { Footer } from "./footer";
import { useStore } from "@/lib/store-context";

export const Landing = () => {
  const product = useStore((state) => state.product);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-light/60">
      <Header />
      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12">
        <section className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-primary">
              Morocco print-on-demand
            </span>
            <h1 className="text-4xl font-semibold text-brand-dark md:text-5xl">
              Launch your {product.name.toLowerCase()} storefront with live personalization.
            </h1>
            <p className="max-w-xl text-sm text-brand-dark/70 md:text-base">
              Customers design directly on the product, pay online, and you receive ready-to-print files. Built on
              Shopify with Moroccan payments, courier integrations, and workshop-friendly automation.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-brand-dark text-white px-4 py-2">Supports CMI, Payzone, PayPal</span>
              <span className="rounded-full border border-brand-dark/20 px-4 py-2 text-brand-dark/80">
                DTG · DTF · Embroidery ready
              </span>
              <span className="rounded-full border border-brand-dark/20 px-4 py-2 text-brand-dark/80">
                Auto mockups + production files
              </span>
            </div>
          </div>
          <OrderSummary />
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <CustomizerView />
          <div className="space-y-8">
            <ProductSelector />
            <LayerPanel />
          </div>
        </section>

        <Workflow />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};
