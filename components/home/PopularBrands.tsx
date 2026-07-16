"use client";

import { motion } from "framer-motion";

const brands = [
  "Nike", "Adidas", "Apple", "Samsung", "Sony", "Levi's",
  "Zara", "Casio", "Fossil", "Ray-Ban", "Puma", "JBL",
];

export default function PopularBrands() {
  return (
    <section className="py-12 border-y border-gray-200 dark:border-gray-800">
      <div className="container-custom">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-gray-500"
        >
          Popular Brands
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brands.map((brand, index) => (
            <motion.span
              key={brand}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="text-xl font-bold text-gray-300 transition-colors hover:text-brand-600 dark:text-gray-600 dark:hover:text-brand-400 md:text-2xl"
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
