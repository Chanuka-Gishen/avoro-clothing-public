// src/app/(store)/shop/loading.tsx

import { ProductGridSkeleton } from "@/components/ui/product-grid-skeleton";

export default function ShopLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="h-4 w-24 rounded bg-neutral-200" />
        <div className="mt-3 h-10 w-64 rounded bg-neutral-200" />
        <div className="mt-4 h-4 w-full max-w-xl rounded bg-neutral-200" />
      </div>

      <div className="mt-10 flex items-center justify-between gap-4 border-y border-neutral-200 py-4">
        <div className="h-10 w-28 animate-pulse rounded-lg bg-neutral-200 lg:hidden" />

        <div className="ml-auto h-10 w-40 animate-pulse rounded-lg bg-neutral-200" />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="animate-pulse space-y-8">
            <div>
              <div className="h-4 w-24 rounded bg-neutral-200" />

              <div className="mt-4 space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="size-4 rounded bg-neutral-200" />
                    <div className="h-4 w-28 rounded bg-neutral-200" />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-8">
              <div className="h-4 w-20 rounded bg-neutral-200" />

              <div className="mt-5 h-2 w-full rounded-full bg-neutral-200" />

              <div className="mt-4 flex justify-between gap-4">
                <div className="h-10 flex-1 rounded-lg bg-neutral-200" />
                <div className="h-10 flex-1 rounded-lg bg-neutral-200" />
              </div>
            </div>
          </div>
        </aside>

        <div>
          <ProductGridSkeleton count={12} />

          <div className="mt-12 flex justify-center">
            <div className="flex animate-pulse gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="size-10 rounded-lg bg-neutral-200"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
