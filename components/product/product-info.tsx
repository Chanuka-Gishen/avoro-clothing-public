// src/components/product/product-info.tsx

import Link from "next/link";

import { routePaths } from "@/config/routes";
import type { Product } from "@/features/products/types/product.types";
import { calculateDiscountPercentage } from "@/features/products/utils/product.utils";

import { ProductPurchasePanel } from "./product-purchase-panel";

interface ProductInfoProps {
  product: Product;
  selectedVariantId: string | null;
  onVariantChange: (variantId: string) => void;
}

export function ProductInfo({
  product,
  selectedVariantId,
  onVariantChange,
}: ProductInfoProps) {
  const discount = calculateDiscountPercentage(
    product.price,
    product.comparePrice,
  );

  return (
    <div className="lg:py-4">
      <Link
        href={routePaths.category(product.category.slug)}
        className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500 transition hover:text-neutral-950"
      >
        {product.category.name}
      </Link>

      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
        {`${product.name} - ${product.material.name}`}
      </h1>

      {/* <div className="mt-5 flex items-center gap-3">
        <ProductPrice
          price={product.price}
          comparePrice={product.comparePrice}
        />

        {discount !== null && (
          <span className="rounded-full bg-neutral-950 px-2.5 py-1 text-xs font-medium text-white">
            Save {discount}%
          </span>
        )}
      </div> */}

      <div className="mt-7 border-t border-neutral-200 pt-7">
        <p className="leading-7 text-neutral-600">{product.description}</p>
      </div>

      <ProductPurchasePanel
        product={product}
        selectedVariantId={selectedVariantId}
        onVariantChange={onVariantChange}
      />

      {product.material && (
        <div className="mt-7 border-t border-neutral-200 pt-7">
          <p className="text-sm text-neutral-500">Material</p>

          <p className="mt-1 font-medium text-neutral-950">
            {product.material.name}
          </p>
        </div>
      )}

      {product.dimensions && (
        <div className="mt-7 border-t border-neutral-200 pt-7">
          <h2 className="text-sm font-semibold text-neutral-950">Dimensions</h2>

          <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-neutral-600">
            {product.dimensions.length != null && (
              <p>
                Length: {product.dimensions.length} {product.dimensions.unit}
              </p>
            )}

            {product.dimensions.width != null && (
              <p>
                Width: {product.dimensions.width} {product.dimensions.unit}
              </p>
            )}

            {product.dimensions.height != null && (
              <p>
                Height: {product.dimensions.height} {product.dimensions.unit}
              </p>
            )}
          </div>
        </div>
      )}

      {product.careInstructions && (
        <div className="mt-7 border-t border-neutral-200 pt-7">
          <h2 className="text-sm font-semibold text-neutral-950">
            Care instructions
          </h2>

          <p className="mt-2 text-sm leading-6 text-neutral-600">
            {product.careInstructions}
          </p>
        </div>
      )}

      <div className="mt-7 border-t border-neutral-200 pt-7 text-sm text-neutral-500">
        <p>SKU: {product.sku}</p>
      </div>
    </div>
  );
}
