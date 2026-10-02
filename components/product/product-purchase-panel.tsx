"use client";

import { useMemo, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { Product } from "@/features/products/types/product.types";
import { useAddCartItem } from "@/features/cart/hooks/use-cart";
import { QuantitySelector } from "./quantity-selector";
import { WishlistButton } from "../wishlist/wishlist-button";
import { SizeGuideModal } from "./size-guide-modal";
import { toWishlistItem } from "@/lib/utils/common.utils";

interface ProductPurchasePanelProps {
  product: Product;

  selectedProductColorId: string | null;
  selectedVariantId: string | null;

  onColorChange: (productColorId: string) => void;
  onVariantChange: (variantId: string) => void;
}

export function ProductPurchasePanel({
  product,
  selectedProductColorId,
  selectedVariantId,
  onColorChange,
  onVariantChange,
}: ProductPurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);

  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const addCartItemMutation = useAddCartItem();

  const activeColors = useMemo(
    () => product.colors.filter((productColor) => productColor.isActive),
    [product.colors],
  );

  const selectedProductColor =
    activeColors.find(
      (productColor) => productColor.id === selectedProductColorId,
    ) ?? null;

  const colorVariants = useMemo(() => {
    if (!selectedProductColor) {
      return [];
    }

    return product.baseProduct.variants
      .filter((variant) => variant.colorId === selectedProductColor.color.id)
      .sort((a, b) => a.size.order - b.size.order);
  }, [product.baseProduct.variants, selectedProductColor]);

  const selectedVariant =
    colorVariants.find((variant) => variant.id === selectedVariantId) ?? null;

  const selectedVariantOutOfStock =
    selectedVariant !== null &&
    (!selectedVariant.inStock || selectedVariant.availableQuantity <= 0);

  const cannotAddToCart =
    addCartItemMutation.isPending ||
    !selectedProductColor ||
    !selectedVariant ||
    selectedVariantOutOfStock ||
    quantity < 1 ||
    quantity > (selectedVariant?.availableQuantity ?? 0);

  function handleColorSelect(productColorId: string) {
    onColorChange(productColorId);
    setQuantity(1);
  }

  function handleVariantSelect(variantId: string) {
    const variant = colorVariants.find((variant) => variant.id === variantId);

    if (!variant || !variant.inStock) {
      return;
    }

    onVariantChange(variant.id);
    setQuantity(1);
  }

  async function handleAddToCart() {
    if (!selectedProductColor || !selectedVariant) {
      return;
    }

    if (!selectedVariant.inStock || selectedVariant.availableQuantity <= 0) {
      return;
    }

    try {
      await addCartItemMutation.mutateAsync({
        productId: product.id,
        productColorId: selectedProductColor.id,
        baseProductVariantId: selectedVariant.id,
        quantity,
      });
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  }

  return (
    <div className="mt-8 border-t border-black/10 pt-8">
      {!!activeColors.length && (
        <div>
          <div className="flex items-center justify-between gap-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-950">
              Color
            </h2>

            {selectedProductColor && (
              <span className="text-[11px] uppercase tracking-[0.12em] text-neutral-500">
                {selectedProductColor.color.name}
              </span>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {activeColors.map((productColor) => {
              const selected = productColor.id === selectedProductColorId;

              return (
                <button
                  key={productColor.id}
                  type="button"
                  onClick={() => handleColorSelect(productColor.id)}
                  title={productColor.color.name}
                  aria-label={`Select ${productColor.color.name}`}
                  aria-pressed={selected}
                  className="group/color flex items-center gap-2.5"
                >
                  <span
                    className={`flex size-7 items-center justify-center border transition-colors duration-200 ${
                      selected
                        ? "border-neutral-950"
                        : "border-neutral-300 group-hover/color:border-neutral-600"
                    }`}
                  >
                    <span
                      className="size-[19px] border border-black/10"
                      style={{
                        backgroundColor: productColor.color.hexCode,
                      }}
                    />
                  </span>

                  <span
                    className={`text-[10px] font-medium uppercase tracking-[0.12em] transition-colors ${
                      selected
                        ? "text-neutral-950"
                        : "text-neutral-500 group-hover/color:text-neutral-950"
                    }`}
                  >
                    {productColor.color.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-950">
              Size
            </h2>

            {selectedVariant && (
              <span className="text-[10px] uppercase tracking-[0.12em] text-neutral-400">
                {selectedVariant.size.name}
              </span>
            )}
          </div>

          {product.baseProduct.sizeChartImage && (
            <button
              type="button"
              onClick={() => setSizeGuideOpen(true)}
              className="border-b border-neutral-400 pb-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500 transition-colors hover:border-neutral-950 hover:text-neutral-950"
            >
              Size guide
            </button>
          )}
        </div>

        {!selectedProductColor ? (
          <p className="mt-4 text-xs text-neutral-400">
            Select a color to view available sizes.
          </p>
        ) : colorVariants.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {colorVariants.map((variant) => {
              const selected = variant.id === selectedVariantId;
              const outOfStock = !variant.inStock;

              return (
                <button
                  key={variant.id}
                  type="button"
                  disabled={outOfStock}
                  onClick={() => handleVariantSelect(variant.id)}
                  aria-pressed={selected}
                  aria-label={
                    outOfStock
                      ? `${variant.size.name} - out of stock`
                      : `Select size ${variant.size.name}`
                  }
                  className={`relative flex h-12 min-w-14 items-center justify-center border px-4 text-[11px] font-medium uppercase tracking-[0.08em] transition-all duration-200 ${
                    selected
                      ? "border-neutral-950 bg-neutral-950 text-white"
                      : outOfStock
                        ? "cursor-not-allowed border-neutral-200 text-neutral-300"
                        : "border-neutral-300 bg-white text-neutral-950 hover:border-neutral-950"
                  }`}
                >
                  {variant.size.name}

                  {outOfStock && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-1/2 top-1/2 h-px w-8 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-neutral-300"
                    />
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="mt-4 text-xs text-neutral-400">
            No sizes are available for this color.
          </p>
        )}

        {selectedVariant && (
          <div className="mt-3">
            {selectedVariant.inStock &&
            selectedVariant.availableQuantity > 0 ? (
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500">
                In stock
                {selectedVariant.availableQuantity <= 5 && (
                  <>
                    {" "}
                    · Only {selectedVariant.availableQuantity}{" "}
                    {selectedVariant.availableQuantity === 1
                      ? "piece"
                      : "pieces"}{" "}
                    left
                  </>
                )}
              </p>
            ) : (
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                Out of stock
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-2">
        <QuantitySelector
          value={quantity}
          max={
            selectedVariant?.inStock
              ? selectedVariant.availableQuantity
              : undefined
          }
          onChange={setQuantity}
        />

        <button
          type="button"
          disabled={cannotAddToCart}
          onClick={handleAddToCart}
          className="flex h-12 flex-1 items-center justify-center gap-3 bg-neutral-950 px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
        >
          <ShoppingBag
            className="size-4"
            strokeWidth={1.5}
            aria-hidden="true"
          />

          {addCartItemMutation.isPending
            ? "Adding..."
            : !selectedProductColor
              ? "Select a color"
              : !selectedVariant
                ? "Select a size"
                : selectedVariantOutOfStock
                  ? "Out of stock"
                  : "Add to bag"}
        </button>

        <div className="absolute right-3 top-3 z-10 sm:right-4 sm:top-4"></div>

        <WishlistButton wishlistItem={toWishlistItem(product)} variant="icon" />

        {product.baseProduct.sizeChartImage && (
          <SizeGuideModal
            open={sizeGuideOpen}
            image={product.baseProduct.sizeChartImage}
            productName={product.name}
            onClose={() => setSizeGuideOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
