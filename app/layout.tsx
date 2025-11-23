import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const font = Urbanist({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Atelier Atlas – Print on Demand Morocco",
  description:
    "Create bespoke apparel for your brand or event. Design, preview, and order custom clothing tailored for Morocco with local fulfillment.",
  metadataBase: new URL("https://agentic-e93c2584.vercel.app")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
