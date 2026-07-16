"use client";

import { useEffect, useState, useCallback } from "react";
import { Product } from "@/types";

const RECENTLY_VIEWED_KEY = "shopsphere-recently-viewed";
const MAX_ITEMS = 8;

export function useRecentlyViewed() {
  const [items, setItems] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
  }, []);

  const addRecentlyViewed = useCallback((product: Product) => {
    setItems((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getRecentlyViewed = useCallback(
    (excludeId?: string) => {
      return excludeId
        ? items.filter((p) => p.id !== excludeId)
        : items;
    },
    [items]
  );

  return { items, addRecentlyViewed, getRecentlyViewed, mounted };
}
