"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductCarouselProps {
  products: Product[];
  title?: string;
}

export default function ProductCarousel({
  products,
}: ProductCarouselProps) {
  if (products.length === 0) return null;

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={24}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
      className="!pb-12"
    >
      {products.map((product, index) => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} index={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
