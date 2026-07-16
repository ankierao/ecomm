"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SearchBar from "@/components/ui/SearchBar";
import FilterSidebar from "@/components/products/FilterSidebar";
import ProductGrid from "@/components/products/ProductGrid";
import Pagination from "@/components/ui/Pagination";
import { filterProducts, paginateProducts, PRODUCTS_PER_PAGE } from "@/utils/recommendations";
import { SortOption } from "@/types";

function ProductsContent() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) || "popularity"
  );
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    const q = searchParams.get("search");
    const s = searchParams.get("sort");
    if (cat) setCategory(cat);
    if (q) setSearch(q);
    if (s) setSort(s as SortOption);
  }, [searchParams]);

  const filtered = useMemo(
    () =>
      filterProducts({
        search,
        category,
        brand,
        minPrice,
        maxPrice,
        minRating,
        sort,
        page,
      }),
    [search, category, brand, minPrice, maxPrice, minRating, sort, page]
  );

  const { items, totalPages, total } = paginateProducts(
    filtered,
    page,
    PRODUCTS_PER_PAGE
  );

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setBrand("");
    setMinPrice(0);
    setMaxPrice(Infinity);
    setMinRating(0);
    setSort("popularity");
    setPage(1);
  };

  return (
    <div
      className="container-custom py-24 lg:py-28"
      data-evg-page="category"
      data-evg-category={category || "all-products"}
    >
      <Breadcrumb items={[{ label: "Products" }]} className="mb-6" />

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
          All Products
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {total} products found
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          className="flex-1 max-w-xl"
          onSearch={(q) => {
            setSearch(q);
            setPage(1);
          }}
          variant="page"
        />
        <button
          onClick={() => setFilterOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium transition-colors hover:border-brand-500 lg:hidden dark:border-gray-700"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        <FilterSidebar
          selectedCategory={category}
          selectedBrand={brand}
          minPrice={minPrice}
          maxPrice={maxPrice}
          minRating={minRating}
          sort={sort}
          onCategoryChange={(c) => {
            setCategory(c);
            setPage(1);
          }}
          onBrandChange={(b) => {
            setBrand(b);
            setPage(1);
          }}
          onMinPriceChange={(p) => {
            setMinPrice(p);
            setPage(1);
          }}
          onMaxPriceChange={(p) => {
            setMaxPrice(p);
            setPage(1);
          }}
          onMinRatingChange={(r) => {
            setMinRating(r);
            setPage(1);
          }}
          onSortChange={(s) => {
            setSort(s);
            setPage(1);
          }}
          onClearFilters={clearFilters}
          isOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
        />

        <div className="flex-1">
          <ProductGrid products={items} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            className="mt-10"
          />
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container-custom py-24">
          <div className="skeleton mb-6 h-8 w-48" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton aspect-[3/4] rounded-2xl" />
            ))}
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
