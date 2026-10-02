import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductGrid } from "@/components/product/product-grid";

import { getCachedCategoryBySlug } from "@/features/categories/api/category.api";
import { getProducts } from "@/features/products/api/product.api";
import { CollectionHeader } from "@/components/collection/collection-header";
import { routePaths } from "@/config/routes";

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;

  searchParams: Promise<{
    page?: string;
    sort?: string;
  }>;
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const result = await getCachedCategoryBySlug(slug);
    const category = result;

    if (!category) {
      return {
        title: "Collection Not Found",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const title = category.metaTitle?.trim() || category.name;

    const description = `Shop ${category.name} by AVORO. Premium clothing designed for the unbound.`;

    return {
      title,

      description,

      keywords: category.metaTags.length > 0 ? category.metaTags : undefined,

      alternates: {
        canonical: routePaths.collection(category.slug),
      },

      openGraph: {
        type: "website",

        title,
        description,

        url: routePaths.collection(category.slug),

        siteName: "AVORO",

        images: category.image
          ? [
              {
                url: category.image,
                alt: `${category.name} collection by AVORO`,
              },
            ]
          : undefined,
      },

      twitter: {
        card: "summary_large_image",

        title,
        description,

        images: category.image ? [category.image] : undefined,
      },
    };
  } catch {
    return {
      title: "Collection Not Found",

      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function CollectionPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const { slug } = await params;
  const query = await searchParams;

  let categoryResult;

  try {
    categoryResult = await getCachedCategoryBySlug(slug);
  } catch {
    notFound();
  }

  const category = categoryResult;

  if (!category) {
    notFound();
  }

  const page = Math.max(Number(query.page) || 1, 1);

  const productsResult = await getProducts({
    page,
    limit: 12,
    categorySlug: category.slug,
  });

  const products = productsResult.response?.data ?? [];

  return (
    <main>
      <CollectionHeader category={category} />

      <section
        className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16 xl:px-16"
        aria-labelledby="collection-products"
      >
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-400">
              AVORO / Collection
            </p>

            <h2
              id="collection-products"
              className="mt-2 text-xl font-medium uppercase tracking-[-0.02em] text-neutral-950 sm:text-2xl"
            >
              {category.name}
            </h2>
          </div>

          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400">
            {productsResult.response?.meta?.total ?? products.length} products
          </p>
        </div>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <CollectionEmpty />
        )}
      </section>
    </main>
  );
}

function CollectionEmpty() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center border-t border-neutral-200 text-center">
      <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-neutral-400">
        AVORO
      </p>

      <h2 className="mt-4 text-xl font-medium uppercase tracking-[0.02em] text-neutral-950">
        No pieces available
      </h2>

      <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
        There are currently no products available in this collection.
      </p>
    </div>
  );
}
