"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types";

interface RecommendationSectionProps {
  title: string;
  products: Product[];
}

export default function RecommendationSection({
  title,
  products,
}: RecommendationSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 font-display text-2xl font-bold text-gray-900 dark:text-white"
        >
          {title}
        </motion.h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
