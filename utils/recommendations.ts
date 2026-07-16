import { Product, ProductFilters, SortOption } from "@/types";
import { products } from "@/data/products";

export function getRecommendedProducts(
  currentProduct: Product,
  limit = 8
): Product[] {
  const others = products.filter((p) => p.id !== currentProduct.id);

  const scored = others.map((product) => {
    let score = 0;

    if (product.categorySlug === currentProduct.categorySlug) score += 50;
    if (product.brand === currentProduct.brand) score += 30;

    const priceDiff = Math.abs(product.price - currentProduct.price);
    const priceRange = currentProduct.price * 0.3;
    if (priceDiff <= priceRange) score += 20;
    else if (priceDiff <= priceRange * 2) score += 10;

    score += product.popularity * 0.1;
    score += product.rating * 2;

    return { product, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.product);
}

export function getRelatedProducts(
  currentProduct: Product,
  limit = 4
): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        p.categorySlug === currentProduct.categorySlug
    )
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;

  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function filterProducts(filters: ProductFilters): Product[] {
  let result = [...products];

  if (filters.search) {
    result = searchProducts(filters.search);
  }

  if (filters.category) {
    result = result.filter((p) => p.categorySlug === filters.category);
  }

  if (filters.brand) {
    result = result.filter((p) => p.brand === filters.brand);
  }

  if (filters.minPrice > 0) {
    result = result.filter((p) => p.price >= filters.minPrice);
  }

  if (filters.maxPrice < Infinity) {
    result = result.filter((p) => p.price <= filters.maxPrice);
  }

  if (filters.minRating > 0) {
    result = result.filter((p) => p.rating >= filters.minRating);
  }

  result = sortProducts(result, filters.sort);

  return result;
}

export function sortProducts(
  items: Product[],
  sort: SortOption
): Product[] {
  const sorted = [...items];

  switch (sort) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "popularity":
      return sorted.sort((a, b) => b.popularity - a.popularity);
    default:
      return sorted;
  }
}

export function paginateProducts<T>(
  items: T[],
  page: number,
  perPage: number
): { items: T[]; totalPages: number; total: number } {
  const total = items.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const paginated = items.slice(start, start + perPage);

  return { items: paginated, totalPages, total };
}

export const PRODUCTS_PER_PAGE = 12;
