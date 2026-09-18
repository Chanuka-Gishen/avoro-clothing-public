import { WishlistContent } from "@/components/wishlist/wishlist-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist",
};

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Saved items
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Your Wishlist
        </h1>

        <p className="mt-3 max-w-2xl text-neutral-500">
          Keep your favourite furniture in one place and come back whenever
          you're ready.
        </p>
      </div>

      <div className="mt-10">
        <WishlistContent />
      </div>
    </div>
  );
}
