"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCarousel from "./ProductCarousel";
import { Product } from "@/types";

interface FlashSaleSectionProps {
  products: Product[];
}

export default function FlashSaleSection({ products }: FlashSaleSectionProps) {
  return (
    <section className="py-16 overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex items-end justify-between"
        >
          <div>
            <span className="mb-2 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-600 dark:bg-red-900/30 dark:text-red-400">
              Limited Time
            </span>
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
              Flash Sale
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Grab these deals before they&apos;re gone!
            </p>
          </div>
          <Link
            href="/products?sort=price-low"
            className="hidden items-center gap-1 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 sm:flex"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <ProductCarousel products={products} />
      </div>
    </section>
  );
}
