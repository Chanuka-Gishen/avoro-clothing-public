// src/components/shop/shop-filters.tsx

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import type { Category } from "@/features/categories/types/category.types";
import { Material } from "@/features/materials/types/material.types";

interface ShopFiltersProps {
  categories: Category[];
  materials: Material[];
  onFilterChange?: () => void;
}

export function ShopFilters({
  categories,
  materials,
  onFilterChange,
}: ShopFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");

  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

  const selectedCategory = searchParams.get("category");
  const selectedMaterial = searchParams.get("material");

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    params.delete("page");

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);

    onFilterChange?.();
  }

  function handleCategoryChange(slug: string | null) {
    updateParams({
      category: slug,
    });
  }

  function handleMaterialChange(slug: string | null) {
    updateParams({
      material: slug,
    });
  }

  function handlePriceSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    updateParams({
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
    });
  }

  function clearFilters() {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("category");
    params.delete("material");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("page");

    setMinPrice("");
    setMaxPrice("");

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  }

  const hasFilters =
    Boolean(selectedCategory) ||
    Boolean(selectedMaterial) ||
    Boolean(searchParams.get("minPrice")) ||
    Boolean(searchParams.get("maxPrice"));

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-semibold text-neutral-950">Categories</h3>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-medium text-neutral-500 transition hover:text-neutral-950"
            >
              Clear
            </button>
          )}
        </div>

        <div className="mt-4 space-y-3">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name="category"
              checked={!selectedCategory}
              onChange={() => handleCategoryChange(null)}
              className="size-4 accent-neutral-950"
            />

            <span className="text-sm text-neutral-700">All categories</span>
          </label>

          {categories.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category.slug}
                onChange={() => handleCategoryChange(category.slug)}
                className="size-4 accent-neutral-950"
              />

              <span className="text-sm text-neutral-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-8">
        <h3 className="text-sm font-semibold text-neutral-950">Materials</h3>

        <div className="mt-4 space-y-3">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name="material"
              checked={!selectedMaterial}
              onChange={() => handleMaterialChange(null)}
              className="size-4 accent-neutral-950"
            />

            <span className="text-sm text-neutral-700">All materials</span>
          </label>

          {materials.map((material) => (
            <label
              key={material.id}
              className="flex cursor-pointer items-center gap-3"
            >
              <input
                type="radio"
                name="material"
                checked={selectedMaterial === material.slug}
                onChange={() => handleMaterialChange(material.slug)}
                className="size-4 accent-neutral-950"
              />

              <span className="text-sm text-neutral-700">{material.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-8">
        <h3 className="text-sm font-semibold text-neutral-950">Price range</h3>

        <form onSubmit={handlePriceSubmit} className="mt-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="min-price"
                className="mb-1.5 block text-xs text-neutral-500"
              >
                Min
              </label>

              <input
                id="min-price"
                type="number"
                min="0"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                placeholder="0"
                className="h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm outline-none transition focus:border-neutral-900"
              />
            </div>

            <div>
              <label
                htmlFor="max-price"
                className="mb-1.5 block text-xs text-neutral-500"
              >
                Max
              </label>

              <input
                id="max-price"
                type="number"
                min="0"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder="Any"
                className="h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm outline-none transition focus:border-neutral-900"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-3 h-10 w-full rounded-lg bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Apply price
          </button>
        </form>
      </div>
    </div>
  );
}
