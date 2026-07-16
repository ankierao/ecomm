"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/utils/helpers";
import Rating from "@/components/ui/Rating";
import WishlistButton from "@/components/ui/WishlistButton";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
      data-evg-product-card
      data-evg-product-id={product.id}
      data-evg-product-slug={product.slug}
      data-evg-product-name={product.name}
      data-evg-product-price={product.price}
      data-evg-product-brand={product.brand}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="card overflow-hidden">
          <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Badges */}
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {product.discount > 0 && (
                <span className="rounded-lg bg-red-500 px-2 py-1 text-xs font-bold text-white">
                  -{product.discount}%
                </span>
              )}
              {product.isNew && (
                <span className="rounded-lg bg-brand-600 px-2 py-1 text-xs font-bold text-white">
                  NEW
                </span>
              )}
              {product.isFlashSale && (
                <span className="rounded-lg bg-accent px-2 py-1 text-xs font-bold text-white">
                  FLASH SALE
                </span>
              )}
            </div>

            <div className="absolute right-3 top-3">
              <WishlistButton product={product} />
            </div>

            {/* Quick add overlay */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product);
                }}
                data-evg-action="add-to-cart"
                className="flex w-full items-center justify-center gap-2 bg-brand-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>

          <div className="p-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {product.brand}
            </p>
            <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-brand-600 dark:text-gray-100 dark:group-hover:text-brand-400">
              {product.name}
            </h3>
            <Rating rating={product.rating} size="sm" />
            <div className="mt-2 flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            {product.stock <= 10 && product.stock > 0 && (
              <p className="mt-1 text-xs font-medium text-orange-500">
                Only {product.stock} left!
              </p>
            )}
            {product.stock === 0 && (
              <p className="mt-1 text-xs font-medium text-red-500">
                Out of Stock
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
