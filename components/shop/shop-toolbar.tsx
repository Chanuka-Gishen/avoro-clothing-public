import type { Category } from "@/features/categories/types/category.types";
import type { ProductSort } from "@/features/products/types/product.types";

import { MobileFilters } from "./mobile-filters";
import { ShopSort } from "./shop-sort";
import { Material } from "@/features/materials/types/material.types";

interface ShopToolbarProps {
  total?: number;
  sort?: ProductSort;
  categories: Category[];
  materials: Material[];
}

export function ShopToolbar({
  total = 0,
  sort = "newest",
  categories,
  materials,
}: ShopToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-y border-neutral-200 py-4">
      <div className="flex items-center gap-4">
        <MobileFilters categories={categories} materials={materials} />

        <p className="text-sm text-neutral-500">
          {total} {total === 1 ? "product" : "products"}
        </p>
      </div>

      <ShopSort value={sort} />
    </div>
  );
}
