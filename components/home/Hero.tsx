"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home-hero-banner"
      className="relative min-h-[90vh] overflow-hidden hero-gradient"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="container-custom relative flex min-h-[90vh] items-center pt-20">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-accent-light" />
              Summer Collection 2026 — Up to 50% Off
            </div>
            <h1 className="mb-6 font-display text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Discover Your
              <br />
              <span className="text-accent-light">Perfect Style</span>
            </h1>
            <p className="mb-8 max-w-lg text-lg text-brand-100">
              Shop premium brands across fashion, electronics, footwear, and
              more. Free shipping on orders over ₹999.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary bg-white text-brand-700 shadow-white/25 hover:bg-brand-50">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
              >
                Browse Categories
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 flex gap-8">
              {[
                { value: "25+", label: "Premium Brands" },
                { value: "10K+", label: "Happy Customers" },
                { value: "4.8★", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-brand-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto aspect-square max-w-lg">
              <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-8">
                  {[
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
                    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&q=80",
                    "https://images.unsplash.com/photo-1572635196233-14e4d2cbb739?w=300&q=80",
                  ].map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="h-32 w-32 overflow-hidden rounded-2xl shadow-2xl"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt="Featured product"
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
