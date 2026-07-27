"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Timer, ArrowRight } from "lucide-react";

export default function PromotionalBanner() {
  return (
    <section id="home-sub-hero" className="container-custom -mt-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="overflow-hidden rounded-2xl bg-gradient-to-r from-accent to-accent-dark shadow-xl"
      >
        <div className="flex flex-col items-center justify-between gap-4 p-6 md:flex-row md:p-8">
          <div className="flex items-center gap-4 text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
              <Timer className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Flash Sale — Limited Time!</h3>
              <p className="text-sm text-orange-100">
                Up to 50% off on selected items. Don&apos;t miss out!
              </p>
            </div>
          </div>
          <Link
            href="/products?sort=price-low"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-accent-dark transition-transform hover:scale-105"
          >
            Shop Flash Sale
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
