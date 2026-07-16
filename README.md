# ShopSphere

A premium, frontend-only e-commerce website built with Next.js (App Router), React, TypeScript, and Tailwind CSS.

## Features

- **Home Page** — Hero banner, categories, trending products, flash sale, reviews, newsletter
- **Products Page** — Grid with search, filters (category, brand, price, rating), sort, pagination
- **Product Details** — Image gallery, variants, add to cart, recommendations, recently viewed
- **Categories Page** — Browse all 5 categories
- **Shopping Cart** — Drawer + full cart page with quantity controls
- **Wishlist** — Save/remove products with localStorage persistence
- **Dark Mode** — Toggle between light and dark themes
- **Responsive Design** — Mobile, tablet, and desktop layouts
- **Animations** — Framer Motion transitions and hover effects

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons
- Swiper.js

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/           — Pages and layouts
components/    — Reusable UI components
data/          — Product, category, and review data
hooks/         — Cart, wishlist, theme, recently viewed
types/         — TypeScript interfaces
utils/         — Helpers and recommendation engine
public/        — Static assets
```

## Data

All product data is stored locally in `data/products.ts`. No backend, API, or database required.

## License

MIT
