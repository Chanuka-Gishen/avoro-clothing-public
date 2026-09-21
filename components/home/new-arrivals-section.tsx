import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ProductGrid } from "@/components/product/product-grid";
import type { ProductSummary } from "@/features/products/types/product.types";

interface NewArrivalsSectionProps {
  products: ProductSummary[];
}

export function NewArrivalsSection({ products }: NewArrivalsSectionProps) {
  if (!products.length) {
    return null;
  }

  return (
    <section className="bg-neutral-50" aria-labelledby="new-arrivals-heading">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12 lg:py-8 xl:px-16">
        <div className="mb-10 flex items-end justify-between gap-6 lg:mb-12">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500 sm:text-xs">
              AVORO / New Drop
            </p>

            <h2
              id="new-arrivals-heading"
              className="mt-3 text-3xl font-medium uppercase tracking-[-0.03em] text-neutral-950 sm:text-4xl lg:text-5xl"
            >
              New arrivals
            </h2>
          </div>

          <Link
            href="/shop?sort=newest"
            className="group hidden items-center gap-2 border-b border-neutral-950 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-950 sm:inline-flex"
          >
            Shop new
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
            href="/shop?sort=newest"
            className="inline-flex items-center gap-2 border-b border-neutral-950 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-950"
          >
            Shop new
            <ArrowRight
              className="size-3.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
