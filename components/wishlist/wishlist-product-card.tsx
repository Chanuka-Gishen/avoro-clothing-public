"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore, WishlistItem } from "@/store/wishlist.store";
import { routePaths } from "@/config/routes";
import { formatCurrency } from "@/lib/utils/currency";

interface WishlistProductCardProps {
  wishlistItem: WishlistItem;
}

export function WishlistProductCard({
  wishlistItem,
}: WishlistProductCardProps) {
  const removeItem = useWishlistStore((state) => state.removeItem);

  const product = wishlistItem.product;

  const primaryImage =
    product.images.find((image) => image.isPrimary) ??
    product.images[0] ??
    product.colors
      .flatMap((color) => color.images ?? [])
      .find((image) => image.isPrimary) ??
    product.colors.flatMap((color) => color.images ?? [])[0] ??
    null;

  const hasDiscount =
    product.comparePrice !== null && product.comparePrice > product.price;

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-[#f3f3f1]">
        <Link
          href={routePaths.product(product.slug)}
          aria-label={`View ${product.name}`}
          className="block"
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

        <div className="absolute right-3 top-3 z-10 sm:right-4 sm:top-4">
          <button
            type="button"
            onClick={() => removeItem(wishlistItem.productId)}
            aria-label={`Remove ${product.name} from wishlist`}
            className="flex size-9 items-center justify-center text-neutral-950 transition-transform duration-300 hover:scale-110"
          >
            <Heart
              className="size-[19px] fill-neutral-950 text-neutral-950"
              strokeWidth={1.4}
            />
          </button>
        </div>
      </div>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-4">
          <Link href={routePaths.product(product.slug)} className="min-w-0">
            <h2 className="text-[13px] font-medium uppercase leading-5 tracking-[0.04em] text-neutral-950 transition-opacity duration-300 group-hover:opacity-60 sm:text-sm">
              {product.name}
            </h2>
          </Link>

          <div className="shrink-0 text-right">
            <p className="text-xs font-medium text-neutral-950 sm:text-sm">
              {formatCurrency(product.price)}
            </p>

            {hasDiscount && (
              <p className="mt-0.5 text-[10px] text-neutral-400 line-through">
                {formatCurrency(product.comparePrice!)}
              </p>
            )}
          </div>
        </div>

        {product.category && (
          <Link
            href={routePaths.collection(product.category.slug)}
            className="mt-1.5 block w-fit text-[9px] font-medium uppercase tracking-[0.22em] text-neutral-400 transition-colors hover:text-neutral-950 sm:text-[10px]"
          >
            {product.category.name}
          </Link>
        )}
      </div>
    </article>
  );
}
