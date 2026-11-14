// src/pages/customer/Checkout.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle2, Wallet, Truck } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { checkoutSchema } from "../../utils/checkoutSchema";
import { formatCurrency } from "../../utils/formatCurrency";

const DELIVERY_FEE = 60;
const FREE_DELIVERY_THRESHOLD = 1000;

export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const deliveryFee =
    subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "cod" },
  });

  const paymentMethod = watch("paymentMethod");

  // Empty-cart guard
  if (items.length === 0 && !success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-forest-800">
          Your cart is empty
        </h1>
        <p className="text-charcoal/60 mt-2">
          Add some dishes before checking out.
        </p>
        <Link
          to="/menu"
          className="inline-block mt-6 bg-forest-600 hover:bg-forest-700 text-cream-50 font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  // Success screen (mock — real order in Phase 5)
  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
          <CheckCircle2 size={44} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-forest-800">Order placed!</h1>
        <p className="text-charcoal/60 mt-2">
          Your order has been received. (Backend integration arrives in Phase
          5.)
        </p>
        <Link
          to="/menu"
          className="inline-block mt-6 bg-forest-600 hover:bg-forest-700 text-cream-50 font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Back to Menu
        </Link>
      </div>
    );
  }

  function onSubmit(data) {
    setSubmitting(true);
    // Simulate network latency — real POST /api/orders in Phase 5
    console.log("ORDER PAYLOAD:", {
      customer: data,
      items,
      subtotal,
      deliveryFee,
      total,
    });
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      clearCart();
    }, 1200);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/cart"
        className="inline-flex items-center gap-1 text-forest-600 hover:text-forest-700 text-sm mb-6"
      >
        <ArrowLeft size={16} /> Back to cart
      </Link>

      <h1 className="text-3xl font-bold text-forest-800 mb-6">Checkout</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid lg:grid-cols-3 gap-6"
      >
        {/* ─── Form ─────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Contact info */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-forest-800 mb-4">
              Contact Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" error={errors.fullName?.message}>
                <input
                  {...register("fullName")}
                  placeholder="Abebe Bekele"
                  className="input"
                />
              </Field>
              <Field label="Phone number" error={errors.phone?.message}>
                <input
                  {...register("phone")}
                  placeholder="+251912345678"
                  className="input"
                />
              </Field>
            </div>
          </section>

          {/* Delivery address */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-forest-800 mb-4">
              Delivery Address
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Region" error={errors.region?.message}>
                <input
                  {...register("region")}
                  placeholder="Addis Ababa"
                  className="input"
                />
              </Field>
              <Field label="City" error={errors.city?.message}>
                <input
                  {...register("city")}
                  placeholder="Addis Ababa"
                  className="input"
                />
              </Field>
              <Field label="Sub-city / Area" error={errors.subCity?.message}>
                <input
                  {...register("subCity")}
                  placeholder="Bole"
                  className="input"
                />
              </Field>
              <Field
                label="Specific address"
                error={errors.specificAddress?.message}
              >
                <input
                  {...register("specificAddress")}
                  placeholder="Building, floor, landmark"
                  className="input"
                />
              </Field>
              <div className="sm:col-span-2">
                <Field
                  label="Delivery instructions (optional)"
                  error={errors.deliveryInstructions?.message}
                >
                  <textarea
                    {...register("deliveryInstructions")}
                    rows={2}
                    placeholder="Call when you arrive, gate code, etc."
                    className="input resize-none"
                  />
                </Field>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-forest-800 mb-4">
              Payment Method
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  paymentMethod === "cod"
                    ? "border-forest-600 bg-forest-50"
                    : "border-cream-200 hover:border-forest-400"
                }`}
              >
                <input
                  {...register("paymentMethod")}
                  type="radio"
                  value="cod"
                  className="accent-forest-600"
                />
                <Truck size={20} className="text-forest-600" />
                <div>
                  <p className="font-semibold text-sm text-forest-800">
                    Cash on Delivery
                  </p>
                  <p className="text-xs text-charcoal/60">
                    Pay when your food arrives
                  </p>
                </div>
              </label>
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  paymentMethod === "online"
                    ? "border-forest-600 bg-forest-50"
                    : "border-cream-200 hover:border-forest-400"
                }`}
              >
                <input
                  {...register("paymentMethod")}
                  type="radio"
                  value="online"
                  className="accent-forest-600"
                />
                <Wallet size={20} className="text-forest-600" />
                <div>
                  <p className="font-semibold text-sm text-forest-800">
                    Online Payment
                  </p>
                  <p className="text-xs text-charcoal/60">
                    Simulated — real integration later
                  </p>
                </div>
              </label>
            </div>
            {errors.paymentMethod && (
              <p className="text-xs text-red-600 mt-2">
                {errors.paymentMethod.message}
              </p>
            )}
          </section>
        </div>

        {/* ─── Order summary ────────────────── */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="font-bold text-lg text-forest-800 mb-4">
              Order Summary
            </h2>

            <ul className="space-y-2 text-sm max-h-64 overflow-y-auto pr-1">
              {items.map((i) => (
                <li key={i.signature} className="flex justify-between gap-2">
                  <span className="text-charcoal/80">
                    {i.quantity}× {i.name}
                    {i.variationLabel && ` (${i.variationLabel})`}
                  </span>
                  <span className="text-charcoal font-medium whitespace-nowrap">
                    {formatCurrency(i.unitPrice * i.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-cream-200 mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal/70">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/70">Delivery</span>
                <span>
                  {deliveryFee === 0 ? "Free" : formatCurrency(deliveryFee)}
                </span>
              </div>
            </div>

            <div className="border-t border-cream-200 mt-4 pt-4 flex justify-between items-center">
              <span className="font-semibold text-forest-800">Total</span>
              <span className="text-2xl font-bold text-forest-700">
                {formatCurrency(total)}
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full bg-forest-600 hover:bg-forest-700 disabled:opacity-60 text-cream-50 font-semibold py-3 rounded-full transition-colors"
            >
              {submitting
                ? "Placing order…"
                : `Place Order — ${formatCurrency(total)}`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// Small reusable field wrapper
function Field({ label, error, children }) {
  return (
    <div>
      <label className="text-sm font-medium text-forest-800 mb-1 block">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
