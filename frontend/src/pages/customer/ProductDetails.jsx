// src/pages/customer/ProductDetails.jsx
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Clock,
  Heart,
  Plus,
  Minus,
  ShoppingCart,
} from "lucide-react";
import { products } from "../../data/products";
import { getCategoryById } from "../../utils/productHelpers";
import { formatCurrency } from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom"; // ← add to existing react-router import
import { useCartStore } from "../../store/cartStore";
import { useFavoritesStore } from "../../store/favoritesStore";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  // inside the component, near the top:
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.ids.includes(product?.id));
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState([]);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-forest-800">Dish not found</h1>
        <p className="text-charcoal/60 mt-2">
          This item may have been removed from the menu.
        </p>
        <Link
          to="/menu"
          className="inline-block mt-6 text-forest-600 font-medium hover:underline"
        >
          ← Back to menu
        </Link>
      </div>
    );
  }
  function handleAddToCart() {
    addItem(product, {
      quantity,
      variation:
        product.variations.length > 0
          ? product.variations[selectedVariation]
          : null,
      extras: selectedExtras.map((i) => product.extras[i]),
    });
    navigate("/cart");
  }
  const category = getCategoryById(product.categoryId);
  const basePrice =
    product.variations.length > 0
      ? product.variations[selectedVariation].price
      : product.price;
  const extrasTotal = selectedExtras.reduce(
    (sum, i) => sum + product.extras[i].price,
    0,
  );
  const lineTotal = (basePrice + extrasTotal) * quantity;

  function toggleExtra(i) {
    setSelectedExtras((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/menu"
        className="inline-flex items-center gap-1 text-forest-600 hover:text-forest-700 text-sm mb-6"
      >
        <ArrowLeft size={16} /> Back to menu
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-cream-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.isBestSeller && (
            <span className="absolute top-4 left-4 bg-gold-500 text-forest-900 text-xs font-bold px-3 py-1 rounded-full">
              Best Seller
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <div>
            {category && (
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                {category.name}
              </span>
            )}
            <h1 className="text-3xl font-bold text-forest-800 mt-1">
              {product.name}
            </h1>
            <p className="text-charcoal/70 mt-2">{product.description}</p>
          </div>

          {/* Rating + time */}
          <div className="flex gap-4 text-sm text-charcoal/70">
            <span className="flex items-center gap-1">
              <Star size={16} className="fill-gold-500 text-gold-500" />
              {product.rating} ({product.reviewCount} reviews)
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} /> {product.preparationTime} min
            </span>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="text-sm font-semibold text-forest-800 mb-2">
              Ingredients
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="text-xs bg-cream-100 text-charcoal/70 px-3 py-1 rounded-full"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Variations */}
          {product.variations.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-forest-800 mb-2">
                Choose a size
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.variations.map((v, i) => (
                  <button
                    key={v.label}
                    onClick={() => setSelectedVariation(i)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                      selectedVariation === i
                        ? "bg-forest-600 text-cream-50 border-forest-600"
                        : "bg-white text-forest-700 border-cream-200 hover:border-forest-400"
                    }`}
                  >
                    {v.label} · {formatCurrency(v.price)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extras */}
          {product.extras.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-forest-800 mb-2">
                Add extras
              </h3>
              <div className="flex flex-col gap-2">
                {product.extras.map((ex, i) => (
                  <label
                    key={ex.name}
                    className="flex items-center justify-between bg-white border border-cream-200 rounded-xl px-4 py-2 cursor-pointer hover:border-forest-400"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedExtras.includes(i)}
                        onChange={() => toggleExtra(i)}
                        className="accent-forest-600"
                      />
                      <span className="text-sm">{ex.name}</span>
                    </span>
                    <span className="text-sm font-medium text-forest-700">
                      + {formatCurrency(ex.price)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Total */}
          <div className="flex items-center justify-between pt-4 border-t border-cream-200">
            <div className="flex items-center gap-3 bg-white border border-cream-200 rounded-full px-2 py-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full hover:bg-cream-100 flex items-center justify-center"
              >
                <Minus size={16} />
              </button>
              <span className="w-6 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-full hover:bg-cream-100 flex items-center justify-center"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="text-right">
              <p className="text-xs text-charcoal/60">Total</p>
              <p className="text-2xl font-bold text-forest-700">
                {formatCurrency(lineTotal)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              className="flex-1 bg-forest-600 hover:bg-forest-700 text-cream-50 font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} /> Add to Cart —{" "}
              {formatCurrency(lineTotal)}
            </button>
            <button
              onClick={() => toggleFavorite(product.id)}
              className="w-12 h-12 rounded-full border border-cream-200 hover:border-forest-400 flex items-center justify-center"
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart
                size={20}
                className={
                  isFavorite ? "fill-red-500 text-red-500" : "text-forest-600"
                }
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
