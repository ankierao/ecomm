"use client";

import { motion } from "framer-motion";
import CategoryCard from "@/components/categories/CategoryCard";
import { categories } from "@/data/categories";

export default function FeaturedCategories() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
            Shop by Category
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Explore our curated collections
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
