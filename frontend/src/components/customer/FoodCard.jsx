// src/components/customer/FoodCard.jsx
import { Link, useNavigate } from "react-router-dom";
import { Star, Clock, Heart, ShoppingCart } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";
import { useCartStore } from "../../store/cartStore";
import { useFavoritesStore } from "../../store/favoritesStore";

export default function FoodCard({ product }) {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.ids.includes(product.id));

  const hasOptions = product.variations.length > 0 || product.extras.length > 0;

  function handleAddToCart(e) {
    e.preventDefault();
    if (hasOptions) {
      // Must go to details page to choose variation/extras
      navigate(`/menu/${product.id}`);
      return;
    }
    addItem(product, { quantity: 1 });
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col">
      {/* Image */}
      <Link
        to={`/menu/${product.id}`}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.isBestSeller && (
          <span className="absolute top-2 left-2 bg-gold-500 text-forest-900 text-xs font-bold px-2 py-0.5 rounded-full">
            Best Seller
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product.id);
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={16}
            className={
              isFavorite ? "fill-red-500 text-red-500" : "text-forest-600"
            }
          />
        </button>
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <Link to={`/menu/${product.id}`}>
          <h3 className="font-semibold text-forest-800 leading-tight group-hover:text-forest-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-charcoal/60 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-charcoal/60 mt-auto">
          <span className="flex items-center gap-1">
            <Star size={12} className="fill-gold-500 text-gold-500" />
            {product.rating} ({product.reviewCount})
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {product.preparationTime} min
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="font-bold text-forest-700">
            {formatCurrency(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-forest-600 hover:bg-forest-700 text-cream-50 text-sm font-medium px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
          >
            <ShoppingCart size={14} />
            {hasOptions ? "Options" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
