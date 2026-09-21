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

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Color {
  id: string;
  name: string;
  code: string;
  hexCode: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Size {
  id: string;
  name: string;
  code: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductColor {
  id: string;

  productId: string;

  colorId: string;
  color: Color;

  isActive: boolean;

  images: ProductImage[];

  createdAt: string;
  updatedAt: string;
}

export interface BaseProduct {
  id: string;
  name: string;
  code: string;

  description: string | null;

  material: string | null;
  fabricComposition: string | null;
  gsm: number | null;
  fit: string | null;

  sizeChartImage: string | null;
  sizeChartImageKey: string | null;

  isActive: boolean;

  variants?: BaseProductVariant[];

  createdAt: string;
  updatedAt: string;
}

export interface BaseProductVariant {
  id: string;
  baseProductId: string;

  colorId: string;
  color: Color;

  sizeId: string;
  size: Size;

  sku: string;
  barcode: string | null;

  inventoryCostPrice: string | null;

  quantity: number;
  reservedQuantity: number;
  reorderLevel: number;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;

  name: string;
  slug: string;
  description: string;

  sku: string;
  barcode: string | null;

  price: number;
  costPrice: number;
  comparePrice: number | null;

  isActive: boolean;
  isFeatured: boolean;

  categoryId: string;
  category: ProductCategory;

  baseProductId: string;
  baseProduct: BaseProduct;

  colors: ProductColor[];
  images: ProductImage[];

  metaTitle: string | null;
  metaDescription: string | null;
  metaTags: string[];

  careInstructions: string | null;

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
  sku: string;

  price: number;
  comparePrice: number | null;

  isActive: boolean;
  isFeatured: boolean;

  category: {
    id: string;
    name: string;
    slug: string;
  };

  baseProduct: {
    id: string;
    name: string;
    code: string;
    material: string | null;
    gsm: number | null;
    fit: string | null;
  };

  images: ProductImage[];

  colors: ProductColor[];

  createdAt: string;
  updatedAt: string;
}
