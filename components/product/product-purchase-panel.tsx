"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";

import type {
  Product,
  ProductVariant,
} from "@/features/products/types/product.types";

import { ProductPrice } from "./product-price";
import { QuantitySelector } from "./quantity-selector";

import { useAddCartItem } from "@/features/cart/hooks/use-cart";
import { WishlistButton } from "../wishlist/wishlist-button";

interface ProductPurchasePanelProps {
  product: Product;
  selectedVariantId: string | null;
  onVariantChange: (variantId: string) => void;
}

export function ProductPurchasePanel({
  product,
  selectedVariantId,
  onVariantChange,
}: ProductPurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);

  const addCartItemMutation = useAddCartItem();

  const variants = useMemo(
    () => product.variants.filter((variant) => variant.isOrderable),
    [product.variants],
  );

  const selectedVariant =
    variants.find((variant) => variant.id === selectedVariantId) ?? null;

  const hasVariants = variants.length > 0;

  const currentPrice = selectedVariant?.price ?? product.price;

  const currentComparePrice =
    selectedVariant?.comparePrice ?? product.comparePrice;

  const inStock = selectedVariant !== null && selectedVariant.quantity > 0;

  const madeToOrder =
    selectedVariant !== null &&
    selectedVariant.quantity <= 0 &&
    selectedVariant.isMadeToOrder;

  const unavailable =
    selectedVariant !== null &&
    selectedVariant.quantity <= 0 &&
    !selectedVariant.isMadeToOrder;

  const cannotAddToCart =
    addCartItemMutation.isPending ||
    (hasVariants && !selectedVariant) ||
    unavailable;

  function selectVariant(variant: ProductVariant) {
    if (variant.quantity <= 0 && !variant.isMadeToOrder) {
      return;
    }

    onVariantChange(variant.id);
    setQuantity(1);
  }

  async function handleAddToCart() {
    try {
      await addCartItemMutation.mutateAsync({
        productId: product.id,
        variantId: selectedVariant?.id,
        quantity,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-7 border-t border-neutral-200 pt-7">
      {variants.length > 0 && (
        <>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold text-neutral-950">
              Choose finish
            </h2>

            {selectedVariant && (
              <span className="text-sm text-neutral-500">
                {selectedVariant.name}
              </span>
            )}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {variants.map((variant) => {
              const selected = variant.id === selectedVariantId;

              const variantUnavailable =
                variant.quantity <= 0 && !variant.isMadeToOrder;

              return (
                <button
                  key={variant.id}
                  type="button"
                  disabled={variantUnavailable}
                  onClick={() => selectVariant(variant)}
                  className={`relative rounded-xl border p-4 text-left transition ${
                    selected
                      ? "border-neutral-950 ring-1 ring-neutral-950"
                      : "border-neutral-200 hover:border-neutral-400"
                  } ${
                    variantUnavailable ? "cursor-not-allowed opacity-40" : ""
                  }`}
                >
                  {selected && (
                    <span className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-neutral-950 text-white">
                      <Check className="size-3" />
                    </span>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {variant.colorHexCodes.map((hex, index) => (
                      <span
                        key={`${variant.id}-${index}`}
                        title={variant.colors[index] ?? variant.name}
                        className="size-6 rounded-full border border-black/10"
                        style={{
                          backgroundColor: hex,
                        }}
                      />
                    ))}
                  </div>

                  <p className="mt-3 text-sm font-medium text-neutral-950">
                    {variant.name}
                  </p>

                  {!!variant.colors.length && (
                    <p className="mt-1 text-xs text-neutral-500">
                      {variant.colors.join(" + ")}
                    </p>
                  )}

                  <div className="mt-3">
                    <ProductPrice
                      price={variant.price}
                      comparePrice={variant.comparePrice}
                    />
                  </div>

                  <p className="mt-2 text-xs">
                    {variant.quantity > 0 ? (
                      <span className="text-green-700">
                        {variant.quantity} available
                      </span>
                    ) : variant.isMadeToOrder ? (
                      <span className="text-amber-700">Made to order</span>
                    ) : (
                      <span className="text-red-600">Unavailable</span>
                    )}
                  </p>
                </button>
              );
            })}
          </div>
        </>
      )}

      {selectedVariant && (
        <div className="mt-6 rounded-xl bg-neutral-50 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium text-neutral-950">
                {selectedVariant.name}
              </p>

              {!!selectedVariant.colors.length && (
                <p className="mt-1 text-sm text-neutral-500">
                  {selectedVariant.colors.join(" + ")}
                </p>
              )}
            </div>

            <ProductPrice
              price={currentPrice}
              comparePrice={currentComparePrice}
            />
          </div>

          {inStock && (
            <div className="mt-3">
              <p className="text-sm text-green-700">
                In stock · {selectedVariant.quantity} available
              </p>

              {selectedVariant.isMadeToOrder &&
                (selectedVariant.productionDaysMin != null ||
                  selectedVariant.productionDaysMax != null) && (
                  <p className="mt-1 text-sm text-neutral-500">
                    Additional quantities can be made to order ·{" "}
                    {formatProductionTime(
                      selectedVariant.productionDaysMin,
                      selectedVariant.productionDaysMax,
                    )}
                  </p>
                )}
            </div>
          )}

          {madeToOrder && (
            <div className="mt-3">
              <p className="text-sm font-medium text-amber-700">
                Made to order
              </p>

              {(selectedVariant.productionDaysMin != null ||
                selectedVariant.productionDaysMax != null) && (
                <p className="mt-1 text-sm text-neutral-500">
                  Estimated production:{" "}
                  {formatProductionTime(
                    selectedVariant.productionDaysMin,
                    selectedVariant.productionDaysMax,
                  )}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <QuantitySelector
          value={quantity}
          max={
            selectedVariant &&
            selectedVariant.quantity > 0 &&
            !selectedVariant.isMadeToOrder
              ? selectedVariant.quantity
              : undefined
          }
          onChange={setQuantity}
        />

        <button
          type="button"
          disabled={cannotAddToCart}
          onClick={handleAddToCart}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          <ShoppingBag className="size-4" />

          {addCartItemMutation.isPending
            ? "Adding..."
            : !selectedVariant && hasVariants
              ? "Select a finish"
              : unavailable
                ? "Unavailable"
                : madeToOrder
                  ? "Order now"
                  : "Add to cart"}
        </button>
        <WishlistButton
          productId={product.id}
          productName={product.name}
          variant="icon"
        />
      </div>
    </div>
  );
}

function formatProductionTime(min?: number | null, max?: number | null) {
  if (min != null && max != null) {
    return `${min}–${max} days`;
  }

  if (min != null) {
    return `from ${min} days`;
  }

  if (max != null) {
    return `up to ${max} days`;
  }

  return "Contact us for availability";
}
