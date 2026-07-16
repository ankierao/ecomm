"use client";

import { motion } from "framer-motion";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/utils/helpers";

interface RatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export default function Rating({
  rating,
  size = "md",
  showValue = false,
  reviewCount,
  className,
}: RatingProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <Star
          key={i}
          className={cn(sizeClasses[size], "fill-amber-400 text-amber-400")}
        />
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <StarHalf
          key={i}
          className={cn(sizeClasses[size], "fill-amber-400 text-amber-400")}
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          className={cn(sizeClasses[size], "text-gray-300 dark:text-gray-600")}
        />
      );
    }
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">{stars}</div>
      {showValue && (
        <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}

export function AnimatedRating(props: RatingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Rating {...props} />
    </motion.div>
  );
}
