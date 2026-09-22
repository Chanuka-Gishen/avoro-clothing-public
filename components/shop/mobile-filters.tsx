"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

import type { Category } from "@/features/categories/types/category.types";

import { ShopFilters } from "./shop-filters";

interface MobileFiltersProps {
  categories: Category[];
}

export function MobileFilters({ categories }: MobileFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-800 lg:hidden"
      >
        <SlidersHorizontal className="size-4" />
        Filters
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          <div className="absolute inset-y-0 left-0 flex w-[90%] max-w-sm flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
              <h2 className="text-base font-semibold text-neutral-950">
                Filters
              </h2>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close filters"
                className="flex size-9 items-center justify-center rounded-full transition hover:bg-neutral-100"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <ShopFilters
                categories={categories}
                onFilterChange={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
