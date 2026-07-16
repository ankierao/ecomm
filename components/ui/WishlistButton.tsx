"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/utils/helpers";
import { useWishlist } from "@/hooks/useWishlist";
import { Product } from "@/types";

interface WishlistButtonProps {
  product: Product;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function WishlistButton({
  product,
  className,
  size = "md",
}: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const active = isInWishlist(product.id);

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
      }}
      className={cn(
        "flex items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-colors hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800",
        sizeClasses[size],
        active && "text-red-500",
        className
      )}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={cn(
          iconSizes[size],
          "transition-all",
          active ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"
        )}
      />
    </motion.button>
  );
}
