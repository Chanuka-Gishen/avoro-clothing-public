import { CartPageContent } from "@/components/cart/cart-page-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
};

export default function CartPage() {
  return <CartPageContent />;
}
