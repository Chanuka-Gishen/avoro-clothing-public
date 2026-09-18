import type { Category } from "@/features/categories/types/category.types";

export interface ProductImage {
  id: string;
  url: string;
  alt?: string | null;
  isPrimary: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDimension {
  id: string;
  length?: number | null;
  width?: number | null;
  height?: number | null;
  unit: string;
}

export interface ProductMaterial {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;

  price: number;
  comparePrice?: number | null;

  quantity: number;

  colors: string[];
  colorHexCodes: string[];

  isOrderable: boolean;
  isMadeToOrder: boolean;

  productionDaysMin?: number | null;
  productionDaysMax?: number | null;

  images: ProductImage[];

  createdAt: string;
}

export interface Product {
  id: string;

  name: string;
  slug: string;
  description: string;

  sku: string;
  barcode?: string | null;

  price: number;
  comparePrice?: number | null;

  isActive: boolean;
  isFeatured: boolean;

  category: Category;
  material: ProductMaterial;

  dimensions?: ProductDimension | null;

  images: ProductImage[];
  variants: ProductVariant[];

  metaTitle?: string | null;
  metaDescription?: string | null;
  metaTags: string[];

  careInstructions?: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface ProductListParams {
  page?: number;
  limit?: number;

  search?: string;

  categorySlug?: string;
  materialSlug?: string;

  minPrice?: number;
  maxPrice?: number;

  featured?: boolean;

  sort?: ProductSort;
}

export type ProductSort =
  | "newest"
  | "oldest"
  | "price_asc"
  | "price_desc"
  | "name_asc"
  | "name_desc";

export interface ProductSummary {
  id: string;
  name: string;
  slug: string;

  price: number;
  comparePrice?: number | null;

  image?: ProductImage | null;

  category?: {
    id: string;
    name: string;
    slug: string;
  };

  images: Pick<ProductImage, "id" | "url" | "alt">[];

  isFeatured: boolean;

  variants: Pick<
    ProductVariant,
    | "id"
    | "name"
    | "colors"
    | "colorHexCodes"
    | "price"
    | "quantity"
    | "isOrderable"
    | "isMadeToOrder"
  >[];
}
