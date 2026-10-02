import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ProductGrid } from "@/components/product/product-grid";
import { ROUTES } from "@/config/routes";
import type { ProductSummary } from "@/features/products/types/product.types";

interface FeaturedProductsSectionProps {
  products: ProductSummary[];
}

export function FeaturedProductsSection({
  products,
}: FeaturedProductsSectionProps) {
  if (!products.length) {
    return null;
  }

  return (
    <section
      className="mx-auto max-w-[1600px] px-5 py-5 sm:px-8 lg:px-12 lg:py-8 xl:px-16"
      aria-labelledby="featured-products-heading"
    >
      <div className="mb-10 flex items-end justify-between gap-6 lg:mb-12">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500 sm:text-xs">
            AVORO / Selected
          </p>

          <h2
            id="featured-products-heading"
            className="mt-3 text-3xl font-medium uppercase tracking-[-0.03em] text-neutral-950 sm:text-4xl lg:text-5xl"
          >
            Featured pieces
          </h2>
        </div>

        <Link
          href={ROUTES.SHOP}
          className="group hidden items-center gap-2 border-b border-neutral-950 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-950 sm:inline-flex"
        >
          Shop all
          <ArrowRight
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </Link>
      </div>

      <ProductGrid products={products} />

      <div className="mt-10 sm:hidden">
        <Link
          href={ROUTES.SHOP}
          className="inline-flex items-center gap-2 border-b border-neutral-950 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-950"
        >
          Shop all
          <ArrowRight
            className="size-3.5"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
