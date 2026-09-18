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
      <div className="relative overflow-hidden rounded-xl bg-neutral-100">
        <Link href={routePaths.product(product.slug)}>
          <div className="relative aspect-square">
            {product.images?.length > 0 ? (
              <Image
                src={product.images[0].url}
                alt={product.images[0].alt || product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                No image
              </div>
            )}
          </div>
        </Link>

        {discount !== null && (
          <span className="absolute left-3 top-3 rounded-full bg-neutral-950 px-2.5 py-1 text-xs font-medium text-white">
            -{discount}%
          </span>
        )}

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
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Heart
            className={
              isWishlisted
                ? "size-4 fill-red-500 text-red-500"
                : "size-4 text-neutral-700"
            }
          />
        </button>
      </div>

      <div className="mt-4">
        {product.category && (
          <Link
            href={routePaths.category(product.category.slug)}
            className="text-xs font-medium uppercase tracking-wide text-neutral-400 hover:text-neutral-700"
          >
            {product.category.name}
          </Link>
        )}

        <Link href={routePaths.product(product.slug)} className="mt-1 block">
          <h3 className="text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-600">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2">
          <ProductPrice
            price={product.price}
            comparePrice={product.comparePrice}
          />
        </div>

        {!!product.variants?.length && (
          <div className="mt-3 flex items-center gap-1.5">
            {product.variants.slice(0, 5).map((variant) => (
              <span
                key={variant.id}
                title={variant.name}
                className="size-4 rounded-full border border-neutral-300"
                style={{
                  backgroundColor: variant.colorHexCodes[0] || undefined,
                }}
              />
            ))}

            {product.variants.length > 5 && (
              <span className="ml-1 text-xs text-neutral-400">
                +{product.variants.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
