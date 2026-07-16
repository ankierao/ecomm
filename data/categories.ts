import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Shoes",
    slug: "shoes",
    description: "Premium footwear for every occasion — from running to street style.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    productCount: 5,
  },
  {
    id: "2",
    name: "Electronics",
    slug: "electronics",
    description: "Cutting-edge gadgets and audio gear for the modern lifestyle.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    productCount: 5,
  },
  {
    id: "3",
    name: "Fashion",
    slug: "fashion",
    description: "Trendsetting apparel and outerwear from top global brands.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    productCount: 5,
  },
  {
    id: "4",
    name: "Watches",
    slug: "watches",
    description: "Timeless timepieces that blend elegance with precision.",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
    productCount: 5,
  },
  {
    id: "5",
    name: "Accessories",
    slug: "accessories",
    description: "Essential add-ons — sunglasses, bags, and everyday essentials.",
    image: "https://images.unsplash.com/photo-1572635196233-14e4d2cbb739?w=800&q=80",
    productCount: 5,
  },
];

export const getCategoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
