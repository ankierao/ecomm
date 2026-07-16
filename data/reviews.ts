import { Review } from "@/types";

export const customerReviews: Review[] = [
  {
    id: "r1",
    name: "Sarah Mitchell",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    comment:
      "Absolutely love my Nike Air Max! Super comfortable for all-day wear and the quality is outstanding. ShopSphere delivered faster than expected.",
    date: "2026-03-15",
    productName: "Nike Air Max 270",
  },
  {
    id: "r2",
    name: "James Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    comment:
      "Best online shopping experience I've had. The Sony headphones are incredible — noise cancellation is top-notch. Will definitely shop here again!",
    date: "2026-03-10",
    productName: "Sony WH-1000XM5 Headphones",
  },
  {
    id: "r3",
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 4,
    comment:
      "Great selection of fashion items. The Levi's jacket fits perfectly. Only wish there were more color options, but overall very satisfied.",
    date: "2026-03-05",
    productName: "Levi's Trucker Jacket",
  },
  {
    id: "r4",
    name: "Michael Thompson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
    comment:
      "ShopSphere has become my go-to for electronics. Got the AirPods Pro at a great price. Authentic products and excellent customer service.",
    date: "2026-02-28",
    productName: "Apple AirPods Pro (2nd Gen)",
  },
  {
    id: "r5",
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    rating: 5,
    comment:
      "The Casio G-Shock is even better in person! Tough, stylish, and the delivery was seamless. Highly recommend ShopSphere for watches.",
    date: "2026-02-20",
    productName: "Casio G-Shock GA-2100",
  },
  {
    id: "r6",
    name: "David Park",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    rating: 4,
    comment:
      "Ray-Ban Aviators are timeless. ShopSphere's packaging was premium and the sunglasses arrived in perfect condition. Great value!",
    date: "2026-02-15",
    productName: "Ray-Ban Aviator Classic",
  },
];

export const productReviews: Record<string, Review[]> = {
  "shoe-1": [
    {
      id: "pr1",
      name: "Alex Turner",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      rating: 5,
      comment: "Most comfortable sneakers I've ever owned. The Air Max cushioning is incredible!",
      date: "2026-03-01",
      productName: "Nike Air Max 270",
    },
    {
      id: "pr2",
      name: "Lisa Wang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
      rating: 4,
      comment: "Great shoes, true to size. Love the color options.",
      date: "2026-02-15",
      productName: "Nike Air Max 270",
    },
  ],
  "elec-1": [
    {
      id: "pr3",
      name: "Ryan Cooper",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      rating: 5,
      comment: "Best earbuds I've used. ANC is phenomenal and sound quality is crisp.",
      date: "2026-03-05",
      productName: "Apple AirPods Pro (2nd Gen)",
    },
  ],
};
