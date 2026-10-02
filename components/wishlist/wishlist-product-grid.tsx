import { WishlistItem } from "@/store/wishlist.store";
import { WishlistProductCard } from "./wishlist-product-card";

interface WishlistProductGridProps {
  wishlistItems: WishlistItem[];
}

export function WishlistProductGrid({
  wishlistItems,
}: WishlistProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
      {wishlistItems.map((item) => (
        <WishlistProductCard key={item.id} wishlistItem={item} />
      ))}
    </div>
  );
}
