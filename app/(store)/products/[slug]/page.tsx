import { notFound } from "next/navigation";

import { ProductDetailsClient } from "@/components/product/product-details-client";
import { RelatedProducts } from "@/components/product/related-products";
import {
  getProductBySlug,
  getProducts,
} from "@/features/products/api/product.api";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const result = await getProductBySlug(slug);

  const product = result.response;

  if (!product) {
    notFound();
  }

  const relatedResult = await getProducts({
    page: 1,
    limit: 5,
    categorySlug: product.category.slug,
  });

  const relatedProducts =
    relatedResult.response?.data
      ?.filter((item) => item.id !== product.id)
      .slice(0, 4) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <ProductDetailsClient product={product} />

      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
