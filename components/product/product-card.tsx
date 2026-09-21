"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { routePaths, ROUTES } from "@/config/routes";
import { useAuthStore } from "@/features/auth/store/auth.store";
import type { ProductSummary } from "@/features/products/types/product.types";
import { calculateDiscountPercentage } from "@/features/products/utils/product.utils";
import {
  useAddWishlistItem,
  useRemoveWishlistItem,
  useWishlist,
} from "@/features/wishlist/hooks/use-wishlist";

import { ProductPrice } from "./product-price";

interface ProductCardProps {
  product: ProductSummary;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const { data: wishlistData } = useWishlist();

  const addWishlistItem = useAddWishlistItem();
  const removeWishlistItem = useRemoveWishlistItem();

  const discount = calculateDiscountPercentage(
    product.price,
    product.comparePrice,
  );

  const wishlist = wishlistData?.response;

  const isWishlisted =
    wishlist?.items.some((item) => item.product?.id === product.id) ?? false;

  const isWishlistPending =
    addWishlistItem.isPending || removeWishlistItem.isPending;

  const primaryImage =
    product.images?.[0] ??
    product.colors?.find((item) => item.images?.length)?.images?.[0] ??
    null;

  const visibleColors = product.colors?.slice(0, 4) ?? [];
  const remainingColors = Math.max(
    (product.colors?.length ?? 0) - visibleColors.length,
    0,
  );

  async function handleWishlistClick() {
    if (!isInitialized || isWishlistPending) {
      return;
    }

    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN);
      return;
    }

    try {
      if (isWishlisted) {
        await removeWishlistItem.mutateAsync(product.id);
        return;
      }

      await addWishlistItem.mutateAsync({
        productId: product.id,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <article className="group">
      {/* Product visual */}
      <div className="relative overflow-hidden bg-[#f3f3f1]">
        <Link
          href={routePaths.product(product.slug)}
          className="block"
          aria-label={`View ${product.name}`}
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            {primaryImage ? (
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt || product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
                  Image unavailable
                </span>
              </div>
            )}
          </div>
        </Link>

        {/* Discount */}
        {discount !== null && (
          <span className="absolute left-0 top-0 bg-neutral-950 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white sm:px-4 sm:text-[10px]">
            {discount}% off
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlistClick}
          disabled={!isInitialized || isWishlistPending}
          aria-pressed={isWishlisted}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          className="absolute right-3 top-3 flex size-9 items-center justify-center text-neutral-950 transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 sm:right-4 sm:top-4"
        >
          <Heart
            strokeWidth={1.4}
            className={`size-[19px] transition-all duration-300 ${
              isWishlisted
                ? "fill-neutral-950 text-neutral-950"
                : "fill-transparent text-neutral-950"
            }`}
          />
        </button>
      </div>

      {/* Product information */}
      <div className="pt-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {product.category && (
              <Link
                href={routePaths.category(product.category.slug)}
                className="mb-1.5 block w-fit text-[9px] font-medium uppercase tracking-[0.22em] text-neutral-400 transition-colors hover:text-neutral-950 sm:text-[10px]"
              >
                {product.category.name}
              </Link>
            )}

            <Link
              href={routePaths.product(product.slug)}
              className="block w-fit"
            >
              <h3 className="text-[13px] font-medium uppercase leading-5 tracking-[0.04em] text-neutral-950 transition-opacity duration-300 group-hover:opacity-60 sm:text-sm">
                {product.name}
              </h3>
            </Link>
          </div>

          <div className="shrink-0 text-right">
            <ProductPrice
              price={product.price}
              comparePrice={product.comparePrice}
            />
          </div>
        </div>

        {/* Product details */}
        {(product.baseProduct?.fit || product.baseProduct?.gsm) && (
          <p className="mt-1.5 text-[10px] uppercase tracking-[0.12em] text-neutral-400">
            {[
              product.baseProduct?.fit,
              product.baseProduct?.gsm
                ? `${product.baseProduct.gsm} GSM`
                : null,
            ]
              .filter(Boolean)
              .join(" / ")}
          </p>
        )}

        {/* Colors */}
        {!!visibleColors.length && (
          <div
            className="mt-3 flex items-center gap-2"
            aria-label={`${product.colors.length} available colors`}
          >
            {visibleColors.map((productColor) => (
              <span
                key={productColor.id}
                title={productColor.color.name}
                className="relative flex size-[15px] items-center justify-center"
              >
                <span
                  className="size-[11px] rounded-full border border-black/10"
                  style={{
                    backgroundColor: productColor.color.hexCode,
                  }}
                />
              </span>
            ))}

            {remainingColors > 0 && (
              <span className="ml-0.5 text-[10px] font-medium tracking-wide text-neutral-400">
                +{remainingColors}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
