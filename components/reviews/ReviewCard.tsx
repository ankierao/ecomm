"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Review } from "@/types";
import Rating from "@/components/ui/Rating";
import { formatDate } from "@/utils/helpers";

interface ReviewCardProps {
  review: Review;
  index?: number;
}

export default function ReviewCard({ review, index = 0 }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card p-6"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={review.avatar}
            alt={review.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {review.name}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(review.date)}
          </p>
        </div>
      </div>
      <Rating rating={review.rating} size="sm" className="mb-3" />
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        &ldquo;{review.comment}&rdquo;
      </p>
      {review.productName && (
        <p className="mt-3 text-xs font-medium text-brand-600 dark:text-brand-400">
          Purchased: {review.productName}
        </p>
      )}
    </motion.div>
  );
}
