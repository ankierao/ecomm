"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductGrid from "@/components/products/ProductGrid";
import { useWishlist } from "@/hooks/useWishlist";

export default function WishlistPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="container-custom py-24 lg:py-28" data-evg-page="wishlist">
        <Breadcrumb items={[{ label: "Wishlist" }]} className="mb-6" />
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Heart className="mb-6 h-24 w-24 text-gray-300" />
          <h1 className="mb-2 text-2xl font-bold">Your wishlist is empty</h1>
          <p className="mb-8 text-gray-500">
            Save items you love by clicking the heart icon.
          </p>
          <Link href="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-24 lg:py-28" data-evg-page="wishlist">
      <Breadcrumb items={[{ label: "Wishlist" }]} className="mb-6" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-3xl font-bold">My Wishlist</h1>
          <p className="mt-1 text-gray-500">{items.length} items saved</p>
        </div>
        <Link href="/products" className="btn-secondary hidden sm:inline-flex">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Continue Shopping
        </Link>
      </motion.div>

      <ProductGrid products={items} />
    </div>
  );
}
