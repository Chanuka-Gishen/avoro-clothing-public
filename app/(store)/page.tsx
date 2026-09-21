// src/app/(store)/page.tsx

import { CategorySection } from "@/components/home/category-section";
import { FeaturedProductsSection } from "@/components/home/featured-products-section";
import { HeroSection } from "@/components/home/hero-section";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";

import { getCategories } from "@/features/categories/api/category.api";
import { getProducts } from "@/features/products/api/product.api";

export default async function HomePage() {
  const [categoriesResult, featuredResult, newestResult] = await Promise.all([
    getCategories(),

    getProducts({
      page: 1,
      limit: 8,
      featured: true,
    }),

    getProducts({
      page: 1,
      limit: 8,
      sort: "newest",
    }),
  ]);

  const categories = categoriesResult.response ?? [];

  const featuredProducts = featuredResult.response?.data ?? [];

  const newestProducts = newestResult.response?.data ?? [];

  return (
    <>
      <HeroSection />

      <CategorySection categories={categories} />

      <FeaturedProductsSection products={featuredProducts} />

      <NewArrivalsSection products={newestProducts} />
    </>
  );
}
