// src/components/shop/shop-sort.tsx

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { ProductSort } from "@/features/products/types/product.types";

const SORT_OPTIONS: {
  label: string;
  value: ProductSort;
}[] = [
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Oldest",
    value: "oldest",
  },
  {
    label: "Price: Low to High",
    value: "price_asc",
  },
  {
    label: "Price: High to Low",
    value: "price_desc",
  },
  {
    label: "Name: A to Z",
    value: "name_asc",
  },
  {
    label: "Name: Z to A",
    value: "name_desc",
  },
];

interface ShopSortProps {
  value?: ProductSort;
}

export function ShopSort({ value = "newest" }: ShopSortProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(sort: ProductSort) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", sort);

    // Sorting changes the result order, so restart pagination.
    params.delete("page");

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="shop-sort"
        className="hidden text-sm text-neutral-500 sm:block"
      >
        Sort by
      </label>

      <select
        id="shop-sort"
        value={value}
        onChange={(event) => handleChange(event.target.value as ProductSort)}
        className="h-10 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
