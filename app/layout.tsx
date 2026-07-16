import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Outfit } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import Providers from "./Providers";
import "./globals.css";

const EVERGAGE_BEACON_URL =
  "https://cdn.evgnet.com/beacon/a556rq555550mxe43n3n3n091568480/h_dev_test/scripts/evergage.min.js";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "ShopSphere — Premium E-Commerce Store",
  description:
    "Discover premium fashion, electronics, footwear, watches, and accessories. Shop top brands with free shipping on orders over ₹999.",
  keywords: ["ecommerce", "shopping", "fashion", "electronics", "shoes"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        <Script
          src={EVERGAGE_BEACON_URL}
          strategy="afterInteractive"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
