import { ProductGrid } from "@/components/product/product-grid";
import { Pagination } from "@/components/shop/pagination";
import { ShopFilters } from "@/components/shop/shop-filters";
import { ShopSearch } from "@/components/shop/shop-search";
import { ShopToolbar } from "@/components/shop/shop-toolbar";

import { getCategories } from "@/features/categories/api/category.api";
import { getProducts } from "@/features/products/api/product.api";
import { parseProductSort } from "@/features/products/utils/product-sort.utils";
import { Metadata } from "next";

interface ShopPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    sort?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Shop Streetwear & Oversized T-Shirts",
  description:
    "Shop AVORO streetwear, oversized T-shirts, baggy fits and premium clothing designed for the unbound. Explore the latest AVORO collection in Sri Lanka.",

  alternates: {
    canonical: "/shop",
  },

  keywords: [
    "AVORO shop",
    "AVORO clothing",
    "streetwear Sri Lanka",
    "oversized t-shirts Sri Lanka",
    "baggy t-shirts Sri Lanka",
    "premium streetwear Sri Lanka",
    "oversized clothing Sri Lanka",
  ],

  openGraph: {
    type: "website",
    url: "/shop",
    title: "Shop AVORO Streetwear",
    description:
      "Explore AVORO streetwear, oversized T-shirts and premium clothing designed for the unbound.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shop AVORO Streetwear",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Shop AVORO Streetwear",
    description:
      "Explore AVORO streetwear, oversized T-shirts and premium clothing designed for the unbound.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  const page = Math.max(Number(params.page) || 1, 1);
  const sort = parseProductSort(params.sort);

  const [productsResult, categoriesResult] = await Promise.all([
    getProducts({
      search: params.search,
      categorySlug: params.category,
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
      sort,
      page,
      limit: 12,
    }),

    getCategories(),
  ]);

  const products = productsResult.response?.data ?? [];

  const meta = productsResult.response?.meta;

  const categories = categoriesResult.response ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Collection
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          {params.search
            ? `Search results for "${params.search}"`
            : "Avoro Clothing"}
        </h1>

        <p className="mt-3 max-w-2xl text-neutral-500">
          Explore our collection of Clothing.
        </p>
      </div>

      <div className="mt-8 max-w-xl">
        <ShopSearch />
      </div>

      <div className="mt-10">
        <ShopToolbar
          total={meta?.total ?? products.length}
          sort={sort}
          categories={categories}
        />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <ShopFilters categories={categories} />
        </aside>

        <div>
          <ProductGrid products={products} />

          {meta && (
            <div className="mt-12">
              <Pagination page={meta.page} totalPages={meta.totalPages} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
