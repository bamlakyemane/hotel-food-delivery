// src/store/cartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      // ─── State ───────────────────────────────
      items: [],

      // ─── Actions ─────────────────────────────
      addItem: (product, { quantity = 1, variation, extras = [] } = {}) => {
        // Build a snapshot item
        const basePrice = variation ? variation.price : product.price;
        const extrasTotal = extras.reduce((sum, e) => sum + e.price, 0);
        const unitPrice = basePrice + extrasTotal;
        const variationLabel = variation ? variation.label : null;

        // Signature to detect duplicates (same product + same variation + same extras)
        const signature = makeSignature(product.id, variationLabel, extras);

        const existing = get().items.find((i) => i.signature === signature);

        if (existing) {
          // Bump quantity instead of adding a duplicate line
          set({
            items: get().items.map((i) =>
              i.signature === signature
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                signature,
                productId: product.id,
                name: product.name,
                image: product.image,
                variationLabel,
                extras,
                unitPrice,
                quantity,
              },
            ],
          });
        }
      },

      removeItem: (signature) =>
        set({ items: get().items.filter((i) => i.signature !== signature) }),

      updateQuantity: (signature, quantity) => {
        if (quantity <= 0) {
          get().removeItem(signature);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.signature === signature ? { ...i, quantity } : i,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      // ─── Derived helpers ─────────────────────
      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    }),
    {
      name: "hotel-cart", // localStorage key
    },
  ),
);

// Deterministic signature: same product + same variation + same extras = same line
function makeSignature(productId, variationLabel, extras) {
  const extrasKey = extras
    .map((e) => e.name)
    .sort()
    .join("|");
  return `${productId}__${variationLabel || "default"}__${extrasKey}`;
}
