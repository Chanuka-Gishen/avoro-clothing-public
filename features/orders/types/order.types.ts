import type { ProductImage } from "@/features/products/types/product.types";

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface OrderProduct {
  id: string;
  name: string;
  slug: string;
  images: ProductImage[];
}

export interface OrderItem {
  id: string;

  productId: string;
  product: OrderProduct;

  productColorId: string;
  productColor: OrderProductColor;

  baseProductVariantId: string;
  baseProductVariant: OrderBaseProductVariant;

  image: OrderItemImage | null;

  quantity: number;
  price: number;

  createdAt: string;
}

export interface OrderProductColor {
  id: string;

  color: {
    id: string;
    name: string;
    code: string;
    hexCode: string;
  };
}

export interface OrderBaseProductVariant {
  id: string;
  sku: string;

  size: {
    id: string;
    name: string;
    code: string;
  };
}

export interface OrderItemImage {
  url: string;
  alt?: string | null;
}

export interface Order {
  id: string;
  orderNumber: string;

  items: OrderItem[];

  subtotal: number;
  taxTotal: number;
  deliveryCharge: number;
  discountTotal: number;
  total: number;

  status: OrderStatus;
  paymentStatus: PaymentStatus;

  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };

  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  } | null;

  paymentId?: string | null;
  notes?: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface OrderListItem {
  id: string;
  orderNumber: string;

  status: OrderStatus;
  paymentStatus: PaymentStatus;

  subtotal: number;
  total: number;
  deliverCharge: number;

  createdAt: string;

  itemCount: number;
}
