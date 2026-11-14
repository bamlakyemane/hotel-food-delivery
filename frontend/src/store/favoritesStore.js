// src/store/favoritesStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      ids: [],

      toggle: (productId) => {
        const ids = get().ids;
        set({
          ids: ids.includes(productId)
            ? ids.filter((id) => id !== productId)
            : [...ids, productId],
        });
      },

      isFavorite: (productId) => get().ids.includes(productId),
    }),
    { name: "hotel-favorites" },
  ),
);
