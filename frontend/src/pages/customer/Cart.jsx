// src/pages/customer/Cart.jsx
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { formatCurrency } from "../../utils/formatCurrency";

// Config — will become backend settings in Phase 6
const DELIVERY_FEE = 60;
const FREE_DELIVERY_THRESHOLD = 1000;

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  const deliveryFee =
    subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  // ─── Empty state ──────────────────────────
  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-cream-100 flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-forest-600" />
        </div>
        <h1 className="text-2xl font-bold text-forest-800">
          Your cart is empty
        </h1>
        <p className="text-charcoal/60 mt-2">
          Browse the menu and add something delicious.
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 mt-6 bg-forest-600 hover:bg-forest-700 text-cream-50 font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Browse Menu <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-forest-800">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-600 hover:underline"
        >
          Clear cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ─── Items ───────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.signature}
              className="bg-white rounded-2xl p-4 shadow-sm flex gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-forest-800">
                      {item.name}
                    </h3>
                    {item.variationLabel && (
                      <p className="text-xs text-charcoal/60 mt-0.5">
                        Size: {item.variationLabel}
                      </p>
                    )}
                    {item.extras.length > 0 && (
                      <p className="text-xs text-charcoal/60">
                        + {item.extras.map((e) => e.name).join(", ")}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.signature)}
                    className="text-charcoal/40 hover:text-red-600 p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-auto pt-3">
                  <div className="flex items-center gap-2 bg-cream-50 rounded-full px-1 py-1">
                    <button
                      onClick={() =>
                        updateQuantity(item.signature, item.quantity - 1)
                      }
                      className="w-7 h-7 rounded-full hover:bg-cream-100 flex items-center justify-center"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.signature, item.quantity + 1)
                      }
                      className="w-7 h-7 rounded-full hover:bg-cream-100 flex items-center justify-center"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-semibold text-forest-700">
                    {formatCurrency(item.unitPrice * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Summary ─────────────────────── */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="font-bold text-lg text-forest-800 mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal/70">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/70">Delivery fee</span>
                <span className="font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    formatCurrency(deliveryFee)
                  )}
                </span>
              </div>
              {subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD && (
                <p className="text-xs text-charcoal/50 pt-1">
                  Add {formatCurrency(FREE_DELIVERY_THRESHOLD - subtotal)} more
                  for free delivery.
                </p>
              )}
            </div>

            <div className="border-t border-cream-200 mt-4 pt-4 flex justify-between items-center">
              <span className="font-semibold text-forest-800">Total</span>
              <span className="text-2xl font-bold text-forest-700">
                {formatCurrency(total)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="mt-6 w-full bg-forest-600 hover:bg-forest-700 text-cream-50 font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </Link>

            <Link
              to="/menu"
              className="mt-3 w-full text-center text-sm text-forest-600 hover:underline block"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
