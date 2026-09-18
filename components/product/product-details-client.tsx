"use client";

import { useMemo, useState } from "react";

import type { Product } from "@/features/products/types/product.types";

import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const orderableVariants = useMemo(
    () => product.variants.filter((variant) => variant.isOrderable),
    [product.variants],
  );

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    orderableVariants.length === 1 ? orderableVariants[0].id : null,
  );

  const selectedVariant =
    orderableVariants.find((variant) => variant.id === selectedVariantId) ??
    null;

  const galleryImages = useMemo(() => {
    if (!selectedVariant) {
      return product.images;
    }

    return [...selectedVariant.images, ...product.images];
  }, [product.images, selectedVariant]);

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <ProductGallery images={galleryImages} productName={product.name} />

      <ProductInfo
        product={product}
        selectedVariantId={selectedVariantId}
        onVariantChange={setSelectedVariantId}
      />
    </div>
  );
}
