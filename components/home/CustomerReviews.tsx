"use client";

import { motion } from "framer-motion";
import ReviewCard from "@/components/reviews/ReviewCard";
import { customerReviews } from "@/data/reviews";

export default function CustomerReviews() {
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
            What Our Customers Say
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Trusted by thousands of happy shoppers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {customerReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
