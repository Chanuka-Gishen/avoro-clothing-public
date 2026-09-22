import { WishlistItem } from "@/features/wishlist/types/wishlist.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  items: WishlistItem[];

  addItem: (product: WishlistItem) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: WishlistItem) => void;

  isWishlisted: (productId: string) => boolean;

  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const exists = get().items.some((item) => item.id === product.id);

        if (exists) {
          return;
        }

        set((state) => ({
          items: [...state.items, product],
        }));
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      toggleItem: (product) => {
        const exists = get().items.some((item) => item.id === product.id);

        if (exists) {
          set((state) => ({
            items: state.items.filter((item) => item.id !== product.id),
          }));

          return;
        }

        set((state) => ({
          items: [...state.items, product],
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
