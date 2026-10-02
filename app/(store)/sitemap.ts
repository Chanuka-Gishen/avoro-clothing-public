import type { MetadataRoute } from "next";

import { getCategoriesSeoInfo } from "@/features/categories/api/category.api";
import { getProductsSeoInfo } from "@/features/products/api/product.api";

const BASE_URL = "https://www.avoroclothing.lk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categoriesResult, productsResult] = await Promise.all([
    getCategoriesSeoInfo(),

    getProductsSeoInfo(),
  ]);

  const categories = categoriesResult.response ?? [];
  const products = productsResult.response ?? [];

  const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/collections/${category.slug}`,
    lastModified: category.updatedAt ? new Date(category.updatedAt) : undefined,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : undefined,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/shop`,
      changeFrequency: "daily",
      priority: 0.9,
    },

    ...categoryUrls,
    ...productUrls,
  ];
}
