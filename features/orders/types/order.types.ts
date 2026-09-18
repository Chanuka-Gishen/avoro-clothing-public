import type {
  ProductImage,
  ProductVariant,
} from "@/features/products/types/product.types";

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

  variantId?: string | null;
  variant?: ProductVariant | null;

  isManufacturingRequired: boolean;
  stockQuantityUsed: number;
  newlyMadeQuantity: number;

  quantity: number;
  price: number;

  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;

  items: OrderItem[];

  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
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

  createdAt: string;

  _count: {
    items: number;
  };
}
