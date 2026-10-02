export interface CartProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;

  price: string;
  comparePrice: string | null;

  baseProduct: {
    id: string;
    name: string;
    code: string;
    material: string | null;
    gsm: number | null;
    fit: string | null;
  };
}

export interface CartItemColor {
  id: string;
  name: string;
  code: string;
  hexCode: string;
}

export interface CartProductColor {
  id: string;
  color: CartItemColor;
}

export interface CartItemSize {
  id: string;
  name: string;
  code: string;
}

export interface CartBaseProductVariant {
  id: string;
  sku: string;

  size: CartItemSize;
}

export interface CartItemImage {
  url: string;
  alt?: string | null;
}

export interface CartItem {
  id: string;
  quantity: number;

  product: CartProduct;
  productColor: CartProductColor;
  baseProductVariant: CartBaseProductVariant;

  image: CartItemImage | null;

  availableQuantity: number;
  available: boolean;
  hasEnoughStock: boolean;

  subtotal: string;

  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;

  items: CartItem[];

  itemCount: number;
  subtotal: string;
}

export interface AddCartItemPayload {
  productId: string;
  productColorId: string;
  baseProductVariantId: string;
  quantity: number;
}

export interface UpdateCartItemPayload {
  quantity: number;
}

export interface AddCartItemPayload {
  productId: string;
  productColorId: string;
  baseProductVariantId: string;
  quantity: number;
}

export interface UpdateCartItemPayload {
  quantity: number;
}
