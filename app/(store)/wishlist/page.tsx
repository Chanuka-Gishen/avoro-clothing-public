import { WishlistContent } from "@/components/wishlist/wishlist-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist",
};

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <WishlistContent />
    </div>
  );
}
