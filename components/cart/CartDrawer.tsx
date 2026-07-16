"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import {
  formatPrice,
  calculateShipping,
  FREE_SHIPPING_THRESHOLD,
} from "@/utils/helpers";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    itemCount,
  } = useCart();

  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-drawer dark:bg-gray-950"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-brand-600" />
                <h2 className="text-lg font-bold">
                  Cart ({itemCount})
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <ShoppingBag className="mb-4 h-16 w-16 text-gray-300" />
                  <h3 className="mb-2 text-lg font-semibold">Your cart is empty</h3>
                  <p className="mb-6 text-sm text-gray-500">
                    Add some products to get started
                  </p>
                  <button onClick={closeCart} className="btn-primary">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 rounded-xl border border-gray-100 p-3 dark:border-gray-800"
                    >
                      <Link
                        href={`/products/${item.product.slug}`}
                        onClick={closeCart}
                        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg"
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
                              onClick={closeCart}
                              className="text-sm font-semibold hover:text-brand-600"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-xs text-gray-500">
                              {item.selectedColor && `${item.selectedColor}`}
                              {item.selectedSize && ` · ${item.selectedSize}`}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="p-1.5 hover:text-brand-600"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-[24px] text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="p-1.5 hover:text-brand-600"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-sm font-bold">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-800">
                {subtotal < FREE_SHIPPING_THRESHOLD && (
                  <p className="mb-3 text-center text-xs text-gray-500">
                    Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping!
                  </p>
                )}
                <div className="mb-4 space-y-2 text-sm">
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
                  <div className="flex justify-between border-t border-gray-100 pt-2 dark:border-gray-800">
                    <span className="font-bold">Total</span>
                    <span className="text-lg font-bold text-brand-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="btn-primary w-full text-center"
                  >
                    View Cart
                  </Link>
                  <button className="btn-secondary w-full">Checkout</button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
