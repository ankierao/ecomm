"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Zap,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Rating from "@/components/ui/Rating";
import WishlistButton from "@/components/ui/WishlistButton";
import RecommendationSection from "@/components/products/RecommendationSection";
import ReviewCard from "@/components/reviews/ReviewCard";
import { getProductBySlug } from "@/data/products";
import { productReviews } from "@/data/reviews";
import {
  getRecommendedProducts,
  getRelatedProducts,
} from "@/utils/recommendations";
import { formatPrice } from "@/utils/helpers";
import { useCart } from "@/hooks/useCart";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { cn } from "@/utils/helpers";

interface ProductDetailProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailProps) {
  const [slug, setSlug] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addRecentlyViewed, getRecentlyViewed, mounted } = useRecentlyViewed();

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  const product = slug ? getProductBySlug(slug) : null;

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
      if (!selectedColor && product.colors.length > 0) {
        setSelectedColor(product.colors[0].name);
      }
      if (!selectedSize && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [product, addRecentlyViewed, selectedColor, selectedSize]);

  if (slug && !product) {
    return (
      <div className="container-custom flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="mt-2 text-gray-500">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/products" className="btn-primary mt-8">
          Browse Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="skeleton aspect-square rounded-2xl" />
          <div className="space-y-4">
            <div className="skeleton h-8 w-3/4" />
            <div className="skeleton h-6 w-1/2" />
            <div className="skeleton h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const related = getRelatedProducts(product);
  const recommended = getRecommendedProducts(product);
  const recentlyViewed = mounted ? getRecentlyViewed(product.id) : [];
  const reviews = productReviews[product.id] || [];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  return (
    <div
      className="container-custom py-24 lg:py-28"
      data-evg-product
      data-evg-product-id={product.id}
      data-evg-product-slug={product.slug}
      data-evg-product-name={product.name}
      data-evg-product-price={product.price}
      data-evg-product-brand={product.brand}
      data-evg-product-category={product.category}
      data-evg-product-image={product.thumbnail}
      data-evg-product-stock={product.stock}
    >
      <Breadcrumb
        items={[
          { label: "Products", href: "/products" },
          {
            label: product.category,
            href: `/products?category=${product.categorySlug}`,
          },
          { label: product.name },
        ]}
        className="mb-8"
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {product.discount > 0 && (
              <span className="absolute left-4 top-4 rounded-lg bg-red-500 px-3 py-1.5 text-sm font-bold text-white">
                -{product.discount}%
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-all",
                    selectedImage === i
                      ? "border-brand-600 ring-2 ring-brand-600/20"
                      : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <p className="mb-1 text-sm font-medium uppercase tracking-wider text-brand-600">
              {product.brand}
            </p>
            <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>
            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          </div>

          <Rating
            rating={product.rating}
            showValue
            reviewCount={product.reviews}
            size="md"
          />

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice > product.price && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
                <span className="rounded-lg bg-green-100 px-2 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  Save {formatPrice(product.oldPrice - product.price)}
                </span>
              </>
            )}
          </div>

          <p className="leading-relaxed text-gray-600 dark:text-gray-300">
            {product.description}
          </p>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold">
                Color: {selectedColor}
              </h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={cn(
                      "h-10 w-10 rounded-full border-2 transition-all",
                      selectedColor === color.name
                        ? "border-brand-600 ring-2 ring-brand-600/30 scale-110"
                        : "border-gray-200 dark:border-gray-700"
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "min-w-[48px] rounded-xl border-2 px-4 py-2 text-sm font-medium transition-all",
                      selectedSize === size
                        ? "border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400"
                        : "border-gray-200 hover:border-brand-300 dark:border-gray-700"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Quantity</h3>
            <div className="inline-flex items-center rounded-xl border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:text-brand-600"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[48px] text-center font-medium">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="p-3 hover:text-brand-600"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {product.stock > 0 ? (
                <span className="flex items-center gap-1 text-green-600">
                  <Check className="h-4 w-4" />
                  {product.stock} in stock
                </span>
              ) : (
                <span className="text-red-500">Out of stock</span>
              )}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              data-evg-action="add-to-cart"
              className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart
            </button>
            <button
              disabled={product.stock === 0}
              className="btn-secondary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Zap className="mr-2 h-5 w-5" />
              Buy Now
            </button>
            <WishlistButton product={product} size="lg" />
          </div>

          {/* Delivery Info */}
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-gray-200 p-4 sm:grid-cols-3 dark:border-gray-800">
            {[
              { icon: Truck, title: "Free Delivery", desc: "On orders over ₹999" },
              { icon: Shield, title: "Secure Payment", desc: "100% protected" },
              { icon: RotateCcw, title: "Easy Returns", desc: "30-day policy" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/20">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Features & Specs */}
      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="mb-4 text-xl font-bold">Features</h2>
          <ul className="space-y-2">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h2 className="mb-4 text-xl font-bold">Specifications</h2>
          <dl className="space-y-3">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between border-b border-gray-100 pb-2 text-sm dark:border-gray-800"
              >
                <dt className="font-medium text-gray-500">{key}</dt>
                <dd className="text-gray-900 dark:text-gray-100">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-bold">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {reviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>
        </section>
      )}

      <RecommendationSection title="Related Products" products={related} />
      <RecommendationSection
        title="Recommended For You"
        products={recommended}
      />
      {recentlyViewed.length > 0 && (
        <RecommendationSection
          title="Recently Viewed"
          products={recentlyViewed.slice(0, 4)}
        />
      )}
    </div>
  );
}
