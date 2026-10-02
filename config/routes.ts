// src/config/routes.ts

export const ROUTES = {
  HOME: "/",
  SHOP: "/shop",

  COLLECTIONS: "/collections",

  CART: "/cart",
  CHECKOUT: "/checkout",
  WISHLIST: "/wishlist",

  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  ACCOUNT: "/account",
  ACCOUNT_ORDERS: "/account/orders",
  ACCOUNT_PROFILE: "/account/profile",

  PRIVACY: "/privacy-policy",
  TERMS: "/terms-and-conditions",
  SHIPPING: "/shipping-delivery",
  RETURNS: "/returns-exchanges",
} as const;

export const routePaths = {
  product: (slug: string) => `/products/${slug}`,
  category: (slug: string) => `/categories/${slug}`,
  collection: (slug: string) => `/collections/${slug}`,
  order: (id: string) => `/account/orders/${id}`,
  shopCategory: (slug: string) => `/shop?category=${encodeURIComponent(slug)}`,
  orderConfirmation: (id: string) => `/order-confirmation/${id}`,
} as const;
