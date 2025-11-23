"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store-context";

type FabricCanvas = import("fabric").Canvas;

export const CustomizerView = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const variant = useStore((state) => state.variant);
  const layers = useStore((state) => state.layers);
  const product = useStore((state) => state.product);

  useEffect(() => {
    let mounted = true;
    let instance: FabricCanvas | null = null;

    const initCanvas = async () => {
      const { Canvas } = await import("fabric");
      if (!mounted || !canvasRef.current) return;
      instance = new Canvas(canvasRef.current, {
        backgroundColor: variant.hex,
        width: 420,
        height: 520,
        preserveObjectStacking: true
      });
      instance.selection = false;
      instance.renderAll();
      setFabricCanvas(instance);
    };

    initCanvas();

    return () => {
      mounted = false;
      if (instance && typeof instance.dispose === "function") {
        instance.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    const fabricModulePromise = import("fabric");

    const renderLayers = async () => {
      const { Rect, Textbox, Image } = await fabricModulePromise;
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = variant.hex;
      fabricCanvas.renderAll();

      const garmentOutline = new Rect({
        left: 60,
        top: 30,
        rx: 40,
        ry: 40,
        width: 300,
        height: product.id === "cap" ? 260 : 400,
        fill: variant.hex,
        stroke: "rgba(255,255,255,0.12)",
        strokeWidth: 3,
        selectable: false,
        evented: false
      });
      fabricCanvas.add(garmentOutline);

      const printArea = new Rect({
        left: 120,
        top: product.id === "cap" ? 120 : 120,
        width: 220,
        height: product.id === "cap" ? 120 : 260,
        fill: "rgba(255,255,255,0.18)",
        rx: 20,
        ry: 20,
        selectable: false,
        evented: false
      });
      fabricCanvas.add(printArea);

      for (const layer of layers) {
        if (layer.type === "text") {
          const textbox = new Textbox(layer.value || "", {
            width: 180,
            fontSize: 26,
            fill: layer.color ?? "#111111",
            textAlign: "center",
            fontFamily: "Urbanist, sans-serif",
            left: 140,
            top: product.id === "cap" ? 150 : 170,
            editable: false,
            selectable: false,
            evented: false
          });
          fabricCanvas.add(textbox);
        } else if (layer.type === "image") {
          try {
            const image = await Image.fromURL(layer.value, { crossOrigin: "anonymous" });
            const maxWidth = 200;
            const maxHeight = product.id === "cap" ? 100 : 160;
            const scale = Math.min(maxWidth / (image.width ?? maxWidth), maxHeight / (image.height ?? maxHeight));
            image.set({
              left: 150,
              top: product.id === "cap" ? 130 : 160,
              selectable: false,
              evented: false
            });
            if (scale && Number.isFinite(scale)) {
              image.scale(scale);
            }
            fabricCanvas.add(image);
          } catch (error) {
            console.error("Failed to load image", error);
          }
        }
      }

      fabricCanvas.renderAll();
    };

    renderLayers();
  }, [fabricCanvas, variant, layers, product.id]);

  const downloadMockup = async () => {
    if (!fabricCanvas) return;
    const dataUrl = fabricCanvas.toDataURL({ format: "png", quality: 1, multiplier: 2 });
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${product.id}-${variant.id}-mockup.png`;
    link.click();
  };

  return (
    <div className="space-y-5 rounded-3xl border border-brand-dark/10 bg-white/90 p-6 shadow-2xl shadow-brand-dark/10">
      <header className="flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-brand-primary/70">Preview</span>
          <h2 className="text-2xl font-semibold text-brand-dark">Live garment mockup</h2>
        </div>
        <button
          onClick={downloadMockup}
          className="inline-flex items-center rounded-xl border border-brand-primary/40 bg-brand-primary/10 px-4 py-2 text-xs font-semibold text-brand-primary transition hover:bg-brand-primary/20"
        >
          Export PNG
        </button>
      </header>
      <div className="flex flex-col items-center gap-6">
        <canvas ref={canvasRef} className="rounded-[32px] border border-brand-dark/10 bg-brand-light" />
        <p className="text-center text-xs text-brand-dark/60">
          Print zone is centered and scaled for DTG & embroidery. Files are saved automatically to your order.
        </p>
      </div>
    </div>
  );
};
