"use client";

import { useMemo, useState } from "react";

import type { Product } from "@/features/products/types/product.types";

import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const activeColors = useMemo(
    () => product.colors.filter((productColor) => productColor.isActive),
    [product.colors],
  );

  const [selectedProductColorId, setSelectedProductColorId] = useState<
    string | null
  >(activeColors[0]?.id ?? null);

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );

  const selectedProductColor =
    activeColors.find(
      (productColor) => productColor.id === selectedProductColorId,
    ) ?? null;

  const galleryImages = useMemo(() => {
    if (!selectedProductColor) {
      return product.images;
    }

    const colorImages = selectedProductColor.images ?? [];

    if (!colorImages.length) {
      return product.images;
    }

    return [...colorImages, ...product.images];
  }, [product.images, selectedProductColor]);

  function handleColorChange(productColorId: string) {
    setSelectedProductColorId(productColorId);
    setSelectedVariantId(null);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(380px,0.85fr)] lg:gap-16 xl:gap-24">
      <ProductGallery images={galleryImages} productName={product.name} />

      <ProductInfo
        product={product}
        selectedProductColorId={selectedProductColorId}
        selectedVariantId={selectedVariantId}
        onColorChange={handleColorChange}
        onVariantChange={setSelectedVariantId}
      />
    </div>
  );
}
