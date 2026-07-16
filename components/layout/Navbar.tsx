"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingBag,
  Heart,
  User,
  Sun,
  Moon,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "@/components/ui/SearchBar";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/helpers";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const { itemCount, openCart } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-white/95 shadow-md backdrop-blur-md dark:bg-gray-950/95"
            : "bg-transparent"
        )}
      >
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-black text-white shadow-lg shadow-brand-600/30">
                S
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                Shop<span className="text-gradient">Sphere</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-600 dark:text-gray-300 dark:hover:text-brand-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search - Desktop */}
            <div className="hidden flex-1 max-w-md mx-8 lg:block">
              <SearchBar />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setMobileSearch(!mobileSearch)}
                className="rounded-full p-2.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
              >
                <Search className="h-5 w-5" />
              </button>

              <button
                onClick={toggleTheme}
                className="rounded-full p-2.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>

              <Link
                href="/wishlist"
                className="relative rounded-full p-2.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button
                onClick={openCart}
                className="relative rounded-full p-2.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </button>

              <Link
                href="#"
                className="hidden rounded-full p-2.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 sm:block"
              >
                <User className="h-5 w-5" />
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="rounded-full p-2.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <AnimatePresence>
            {mobileSearch && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pb-4 lg:hidden"
              >
                <SearchBar />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 lg:hidden"
            >
              <nav className="container-custom flex flex-col gap-1 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
