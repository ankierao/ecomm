import Hero from "@/components/home/Hero";
import PromotionalBanner from "@/components/home/PromotionalBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import ProductSection from "@/components/home/ProductSection";
import PopularBrands from "@/components/home/PopularBrands";
import CustomerReviews from "@/components/home/CustomerReviews";
import FlashSaleSection from "@/components/home/FlashSaleSection";
import { products } from "@/data/products";

export default function HomePage() {
  const trending = products.filter((p) => p.isTrending);
  const newArrivals = products
    .filter((p) => p.isNew)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  const bestSellers = products.filter((p) => p.isBestSeller);
  const flashSale = products.filter((p) => p.isFlashSale);
  const recommended = [...products]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4);

  return (
    <div data-evg-page="home">
      <Hero />
      <PromotionalBanner />
      <FeaturedCategories />
      <ProductSection
        title="Trending Now"
        subtitle="Most popular picks this week"
        products={trending.length > 0 ? trending : products.slice(0, 4)}
        viewAllHref="/products?sort=popularity"
      />
      <PopularBrands />
      <ProductSection
        title="New Arrivals"
        subtitle="Fresh drops you don't want to miss"
        products={newArrivals.length > 0 ? newArrivals : products.slice(4, 8)}
        viewAllHref="/products?sort=newest"
      />
      <ProductSection
        title="Best Sellers"
        subtitle="Customer favorites"
        products={bestSellers.length > 0 ? bestSellers : products.slice(8, 12)}
        viewAllHref="/products?sort=popularity"
      />
      <FlashSaleSection
        products={flashSale.length > 0 ? flashSale : products.slice(12, 16)}
      />
      <ProductSection
        title="Recommended For You"
        subtitle="Handpicked based on popular trends"
        products={recommended}
        viewAllHref="/products"
      />
      <CustomerReviews />
    </div>
  );
}
