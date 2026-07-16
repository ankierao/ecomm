"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { getAllBrands, getPriceRange } from "@/data/products";
import { categories } from "@/data/categories";
import { SortOption } from "@/types";
import { formatPrice } from "@/utils/helpers";

interface FilterSidebarProps {
  selectedCategory: string;
  selectedBrand: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sort: SortOption;
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onMinPriceChange: (price: number) => void;
  onMaxPriceChange: (price: number) => void;
  onMinRatingChange: (rating: number) => void;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popularity", label: "Popularity" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const ratingOptions = [4, 3, 2, 1];

export default function FilterSidebar({
  selectedCategory,
  selectedBrand,
  minPrice,
  maxPrice,
  minRating,
  sort,
  onCategoryChange,
  onBrandChange,
  onMinPriceChange,
  onMaxPriceChange,
  onMinRatingChange,
  onSortChange,
  onClearFilters,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  const brands = getAllBrands();
  const priceRange = getPriceRange();

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold">
          <SlidersHorizontal className="h-5 w-5" />
          Filters
        </h3>
        <button
          onClick={onClearFilters}
          className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          Clear All
        </button>
      </div>

      {/* Sort */}
      <div>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Sort By
        </h4>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="input-field"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Category
        </h4>
        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === ""}
              onChange={() => onCategoryChange("")}
              className="accent-brand-600"
            />
            <span className="text-sm">All Categories</span>
          </label>
          {categories.map((cat) => (
            <label key={cat.slug} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat.slug}
                onChange={() => onCategoryChange(cat.slug)}
                className="accent-brand-600"
              />
              <span className="text-sm">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Brand
        </h4>
        <select
          value={selectedBrand}
          onChange={(e) => onBrandChange(e.target.value)}
          className="input-field"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Price Range
        </h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={minPrice || ""}
            placeholder="Min"
            onChange={(e) => onMinPriceChange(Number(e.target.value) || 0)}
            className="input-field"
            min={0}
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            value={maxPrice === Infinity ? "" : maxPrice}
            placeholder="Max"
            onChange={(e) =>
              onMaxPriceChange(Number(e.target.value) || Infinity)
            }
            className="input-field"
          />
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Range: {formatPrice(priceRange.min)} — {formatPrice(priceRange.max)}
        </p>
      </div>

      {/* Rating */}
      <div>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Minimum Rating
        </h4>
        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="rating"
              checked={minRating === 0}
              onChange={() => onMinRatingChange(0)}
              className="accent-brand-600"
            />
            <span className="text-sm">All Ratings</span>
          </label>
          {ratingOptions.map((rating) => (
            <label key={rating} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="rating"
                checked={minRating === rating}
                onChange={() => onMinRatingChange(rating)}
                className="accent-brand-600"
              />
              <span className="text-sm">{rating}★ & above</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-72 flex-shrink-0 lg:block">
        <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          {content}
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-white p-6 shadow-drawer dark:bg-gray-950">
            <div className="mb-4 flex justify-end">
              <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                <X className="h-5 w-5" />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
