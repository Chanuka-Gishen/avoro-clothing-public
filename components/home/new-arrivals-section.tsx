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
    <section className="bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 ">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
              Just arrived
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              New arrivals
            </h2>
          </div>

          <Link
            href="/shop?sort=newest"
            className="hidden items-center gap-2 text-sm font-medium text-neutral-700 transition hover:text-neutral-950 sm:flex"
          >
            Shop new arrivals
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <ProductGrid products={products} />
      </div>
    </section>
  );
}
