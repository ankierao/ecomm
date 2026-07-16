export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  oldPrice: number;
  discount: number;
  category: string;
  categorySlug: string;
  brand: string;
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  colors: { name: string; hex: string }[];
  sizes: string[];
  images: string[];
  thumbnail: string;
  tags: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isFlashSale?: boolean;
  createdAt: string;
  popularity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  productName: string;
}

export type SortOption =
  | "price-low"
  | "price-high"
  | "rating"
  | "newest"
  | "popularity";

export interface ProductFilters {
  search: string;
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sort: SortOption;
  page: number;
}
