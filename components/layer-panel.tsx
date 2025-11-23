"use client";

import { FormEvent, useState } from "react";
import { useStore } from "@/lib/store-context";
import { clsx } from "clsx";

export const LayerPanel = () => {
  const layers = useStore((state) => state.layers);
  const addTextLayer = useStore((state) => state.addTextLayer);
  const updateLayer = useStore((state) => state.updateLayer);
  const removeLayer = useStore((state) => state.removeLayer);
  const setImageLayer = useStore((state) => state.setImageLayer);

  const [textValue, setTextValue] = useState("");

  const handleAddText = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!textValue.trim()) return;
    addTextLayer(textValue.trim());
    setTextValue("");
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageLayer(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="space-y-6 rounded-3xl border border-brand-dark/10 bg-white/70 p-6 shadow-lg shadow-brand-dark/5 backdrop-blur">
      <header className="space-y-2">
        <span className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Designer</span>
        <h2 className="text-2xl font-semibold text-brand-dark">Creative layers</h2>
        <p className="text-sm text-brand-dark/70">
          Upload artwork, add slogans, tweak colors, and preview instantly. Perfect for team kits, merch drops,
          and corporate gifts.
        </p>
      </header>

      <form onSubmit={handleAddText} className="flex flex-col gap-3 rounded-2xl border border-dashed border-brand-primary/40 bg-brand-primary/5 p-4">
        <label className="text-xs font-semibold uppercase tracking-wide text-brand-dark/70">
          Add text
          <input
            value={textValue}
            onChange={(event) => setTextValue(event.target.value)}
            placeholder="Casablanca Surf Club"
            className="mt-2 w-full rounded-xl border border-brand-dark/20 bg-white/80 px-4 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-primary/90"
        >
          Add text layer
        </button>
      </form>

      <label className="flex flex-col gap-3 rounded-2xl border border-dashed border-brand-dark/20 bg-brand-light/60 p-4 text-sm text-brand-dark/70">
        Upload artwork (PNG, SVG, JPG)
        <input
          type="file"
          accept="image/png,image/jpeg,image/svg+xml"
          onChange={handleUpload}
          className="w-full rounded-xl border border-brand-dark/20 bg-white px-3 py-2 text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-brand-primary file:px-4 file:py-2 file:font-semibold file:text-white"
        />
      </label>

      <div className="space-y-4">
        {layers.length === 0 ? (
          <p className="rounded-2xl border border-brand-dark/10 bg-brand-light/70 p-4 text-sm text-brand-dark/60">
            No layers yet. Add text or upload an illustration to start decorating your product.
          </p>
        ) : (
          layers.map((layer) => (
            <div
              key={layer.id}
              className="flex flex-col gap-3 rounded-2xl border border-brand-dark/10 bg-white/80 p-4 shadow-sm"
            >
              <div className="flex items-center justify-between text-sm font-semibold text-brand-dark">
                <span>{layer.type === "text" ? "Text layer" : "Artwork"}</span>
                <button
                  onClick={() => removeLayer(layer.id)}
                  className="text-xs font-medium text-brand-primary hover:underline"
                >
                  Remove
                </button>
              </div>
              {layer.type === "text" ? (
                <div className="flex flex-col gap-3">
                  <label className="text-xs uppercase tracking-wide text-brand-dark/50">
                    Content
                    <input
                      value={layer.value}
                      onChange={(event) => updateLayer(layer.id, { value: event.target.value })}
                      className="mt-1 w-full rounded-xl border border-brand-dark/15 bg-brand-light/60 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                    />
                  </label>
                  <label className="text-xs uppercase tracking-wide text-brand-dark/50">
                    Color
                    <input
                      type="color"
                      value={layer.color ?? "#111111"}
                      onChange={(event) => updateLayer(layer.id, { color: event.target.value })}
                      className="mt-1 h-10 w-full cursor-pointer rounded-xl border border-brand-dark/15 bg-brand-light/60"
                    />
                  </label>
                </div>
              ) : (
                <p className="text-xs text-brand-dark/60">
                  Upload a new file to replace this artwork. We auto-center and scale it to fit the print zone.
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};
