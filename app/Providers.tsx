"use client";

import { Suspense } from "react";
import { CartProvider } from "@/hooks/useCart";
import { WishlistProvider } from "@/hooks/useWishlist";
import { ThemeProvider } from "@/hooks/useTheme";
import { AuthProvider } from "@/hooks/useAuth";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import LoginModal from "@/components/auth/LoginModal";
import EvergageTracker from "@/components/analytics/EvergageTracker";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Suspense fallback={null}>
              <EvergageTracker />
            </Suspense>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CartDrawer />
            <LoginModal />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}