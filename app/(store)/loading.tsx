// src/app/(store)/loading.tsx

import { ProductGridSkeleton } from "@/components/ui/product-grid-skeleton";

export default function StoreLoading() {
  return (
    <>
      <section className="px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto min-h-[560px] max-w-7xl animate-pulse rounded-3xl bg-neutral-100 lg:min-h-[640px]" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="animate-pulse">
          <div className="h-4 w-24 rounded bg-neutral-200" />
          <div className="mt-3 h-8 w-56 rounded bg-neutral-200" />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-[4/5] rounded-2xl bg-neutral-200" />
              <div className="mt-4 h-4 w-24 rounded bg-neutral-200" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 animate-pulse">
          <div className="h-4 w-28 rounded bg-neutral-200" />
          <div className="mt-3 h-8 w-64 rounded bg-neutral-200" />
        </div>

        <ProductGridSkeleton />
      </section>
    </>
  );
}
