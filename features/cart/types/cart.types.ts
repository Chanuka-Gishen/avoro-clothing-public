import type { ProductImage } from "@/features/products/types/product.types";

export interface CartProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: ProductImage[];
}

export interface CartItem {
  id: string;
  quantity: number;

  productId: string;
  product: CartProduct;

  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddCartItemPayload {
  productId: string;
  productColorId: string;
  variantId?: string;
  quantity: number;
}

export interface UpdateCartItemPayload {
  quantity: number;
}
