"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { searchProducts } from "@/utils/recommendations";
import { formatPrice } from "@/utils/helpers";
import { cn } from "@/utils/helpers";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  variant?: "navbar" | "page";
}

export default function SearchBar({
  className,
  placeholder = "Search products, brands, categories...",
  onSearch,
  variant = "navbar",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReturnType<typeof searchProducts>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length > 0) {
      setResults(searchProducts(query).slice(0, 6));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch?.(value);
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder={placeholder}
          className={cn(
            "input-field pl-10 pr-10",
            variant === "navbar" && "h-10 rounded-full bg-gray-100 border-transparent dark:bg-gray-800"
          )}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              onSearch?.("");
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-drawer dark:border-gray-700 dark:bg-gray-900">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              onClick={() => {
                setIsOpen(false);
                setQuery("");
              }}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500">
                  {product.brand} · {product.category}
                </p>
              </div>
              <span className="text-sm font-semibold text-brand-600">
                {formatPrice(product.price)}
              </span>
            </Link>
          ))}
          <Link
            href={`/products?search=${encodeURIComponent(query)}`}
            onClick={() => setIsOpen(false)}
            className="block border-t border-gray-100 px-4 py-3 text-center text-sm font-medium text-brand-600 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
          >
            View all results for &ldquo;{query}&rdquo;
          </Link>
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-drawer dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500">No products found for &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
