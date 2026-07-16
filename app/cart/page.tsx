"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useCart } from "@/hooks/useCart";
import {
  formatPrice,
  calculateShipping,
  FREE_SHIPPING_THRESHOLD,
} from "@/utils/helpers";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    clearCart,
  } = useCart();

  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container-custom py-24 lg:py-28" data-evg-page="cart">
        <Breadcrumb items={[{ label: "Cart" }]} className="mb-6" />
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingBag className="mb-6 h-24 w-24 text-gray-300" />
          <h1 className="mb-2 text-2xl font-bold">Your cart is empty</h1>
          <p className="mb-8 text-gray-500">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link href="/products" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-24 lg:py-28" data-evg-page="cart">
      <Breadcrumb items={[{ label: "Cart" }]} className="mb-6" />

      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm font-medium text-red-500 hover:text-red-600"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card flex gap-4 p-4 sm:gap-6 sm:p-6"
            >
              <Link
                href={`/products/${item.product.slug}`}
                className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-32"
              >
                <Image
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="font-semibold hover:text-brand-600"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-500">{item.product.brand}</p>
                    {item.selectedColor && (
                      <p className="text-xs text-gray-400">
                        Color: {item.selectedColor}
                        {item.selectedSize && ` · Size: ${item.selectedSize}`}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="p-2 hover:text-brand-600"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[32px] text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="p-2 hover:text-brand-600"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-lg font-bold">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24 p-6">
            <h2 className="mb-6 text-xl font-bold">Order Summary</h2>
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="mb-4 rounded-xl bg-brand-50 p-3 text-sm text-brand-700 dark:bg-brand-900/20 dark:text-brand-300">
                Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for
                free shipping!
              </p>
            )}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold text-brand-600">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
            <button className="btn-primary mt-6 w-full">Proceed to Checkout</button>
            <Link
              href="/products"
              className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
