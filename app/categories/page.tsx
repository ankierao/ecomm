"use client";

import { motion } from "framer-motion";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CategoryCard from "@/components/categories/CategoryCard";
import { categories } from "@/data/categories";

export default function CategoriesPage() {
  return (
    <div className="container-custom py-24 lg:py-28" data-evg-page="categories">
      <Breadcrumb items={[{ label: "Categories" }]} className="mb-6" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white">
          All Categories
        </h1>
        <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
          Browse our complete collection across {categories.length} categories
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </div>
    </div>
  );
}
