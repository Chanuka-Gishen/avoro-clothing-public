import { Product } from "@/features/products/types/product.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  createdAt: string;
}

interface WishlistState {
  items: WishlistItem[];

  addItem: (wishlistItem: WishlistItem) => void;
  removeItem: (wishlistItem: string) => void;
  toggleItem: (wishlistItem: WishlistItem) => void;

  isWishlisted: (wishlistItem: string) => boolean;

  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (wishlistItem) => {
        const exists = get().items.some(
          (item) => item.id === wishlistItem.productId,
        );

        if (exists) {
          return;
        }

        set((state) => ({
          items: [...state.items, wishlistItem],
        }));
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      toggleItem: (wishlistItem) => {
        const exists = get().items.some((item) => item.id === wishlistItem.id);

        if (exists) {
          set((state) => ({
            items: state.items.filter((item) => item.id !== wishlistItem.id),
          }));

          return;
        }

        set((state) => ({
          items: [...state.items, wishlistItem],
        }));
      },

      isWishlisted: (productId) =>
        get().items.some((item) => item.id === productId),

      clearWishlist: () => {
        set({
          items: [],
        });
      },
    }),
    {
      name: "avoro-wishlist",
    },
  ),
);
