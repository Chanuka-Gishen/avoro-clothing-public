import { WishlistItem } from "@/features/wishlist/types/wishlist.types";
import { WishlistProductCard } from "./wishlist-product-card";

interface WishlistProductGridProps {
  products: WishlistItem[];
}

export function WishlistProductGrid({ products }: WishlistProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
      {products.map((product) => (
        <WishlistProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
