"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/products?category=${category.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <h3 className="mb-1 text-2xl font-bold text-white">
              {category.name}
            </h3>
            <p className="mb-3 text-sm text-gray-300 line-clamp-2">
              {category.description}
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
            <span className="mt-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {category.productCount} Products
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
