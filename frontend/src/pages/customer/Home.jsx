// src/pages/customer/Home.jsx
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Leaf, Clock, Star } from "lucide-react";
import { categories } from "../../data/categories";
import { products } from "../../data/products";
import CategoryCard from "../../components/customer/CategoryCard";
import FoodCard from "../../components/customer/FoodCard";

const FEATURES = [
  {
    icon: Truck,
    title: "Fast Delivery",
    text: "Hot food at your door in 30–45 min.",
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    text: "Locally sourced, cooked to order.",
  },
  {
    icon: Clock,
    title: "Open Late",
    text: "Serving daily from 7 AM to 11 PM.",
  },
  {
    icon: Star,
    title: "Loved by Many",
    text: "4.8★ average from 2,000+ reviews.",
  },
];

const TESTIMONIALS = [
  {
    name: "Selam T.",
    text: "The Doro Wat tasted just like my mother's. Arrived hot and fast!",
    rating: 5,
  },
  {
    name: "Daniel M.",
    text: "Best burger in Addis. Delivery was quick and the packaging was neat.",
    rating: 5,
  },
  {
    name: "Hanna G.",
    text: "Their Avocado Spris is addictive. Ordering again tomorrow!",
    rating: 5,
  },
];

export default function Home() {
  const popular = products.filter((p) => p.isPopular).slice(0, 6);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 3);
  const specialOffers = products.filter(
    (p) => p.categoryId === "special-offers",
  );

  return (
    <div>
      {/* ─── HERO ─────────────────────────────── */}
      <section className="relative bg-forest-600 text-cream-50 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-3">
              Hotel Restaurant · Addis Ababa
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Delicious food, <br />
              <span className="text-gold-400">delivered</span> to your door.
            </h1>
            <p className="mt-6 text-cream-100/90 text-lg">
              Order authentic Ethiopian classics and international favorites.
              Fresh, fast, and made with care.
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-forest-900 font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Browse Menu <ArrowRight size={18} />
              </Link>
              <Link
                to="/menu?category=special-offers"
                className="inline-flex items-center gap-2 border border-cream-200/40 hover:bg-cream-200/10 px-6 py-3 rounded-full transition-colors"
              >
                Today's Offers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED CATEGORIES ─────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-forest-800">
            What are you craving?
          </h2>
          <p className="text-charcoal/60 mt-2">Browse by category</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      {/* ─── POPULAR MEALS ───────────────────── */}
      <section className="bg-cream-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-forest-800">
                Popular right now
              </h2>
              <p className="text-charcoal/60 mt-2">Our customers' favorites</p>
            </div>
            <Link
              to="/menu"
              className="text-forest-600 font-medium hover:text-forest-700 flex items-center gap-1"
            >
              See all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popular.map((p) => (
              <FoodCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEST SELLERS ────────────────────── */}
      {bestSellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-forest-800">
                Best Sellers
              </h2>
              <p className="text-charcoal/60 mt-2">
                The dishes our customers keep coming back for
              </p>
            </div>
            <Link
              to="/menu"
              className="text-forest-600 font-medium hover:text-forest-700 flex items-center gap-1"
            >
              See all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestSellers.map((p) => (
              <FoodCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* ─── SPECIAL PROMO ───────────────────── */}
      {specialOffers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-gold-500 to-gold-600 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-forest-900">
              <p className="text-sm font-semibold uppercase tracking-widest mb-2">
                Limited time
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Family Feast — Save 20%
              </h2>
              <p className="mb-6 max-w-lg">
                A generous platter of doro wat, beef tibs, shiro and fresh
                injera — perfect for four.
              </p>
              <Link
                to={`/menu/${specialOffers[0].id}`}
                className="inline-flex items-center gap-2 bg-forest-800 hover:bg-forest-900 text-cream-50 font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Order Now <ArrowRight size={18} />
              </Link>
            </div>
            <img
              src={specialOffers[0].image}
              alt={specialOffers[0].name}
              className="w-full md:w-80 h-56 object-cover rounded-2xl shadow-xl"
            />
          </div>
        </section>
      )}

      {/* ─── WHY US ──────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-forest-800 text-center mb-10">
          Why choose us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 text-center shadow-sm"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-cream-100 flex items-center justify-center mb-3">
                <Icon size={22} className="text-forest-600" />
              </div>
              <h3 className="font-semibold text-forest-800">{title}</h3>
              <p className="text-sm text-charcoal/60 mt-1">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────── */}
      <section className="bg-forest-600 text-cream-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">
            What our customers say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-forest-700 rounded-2xl p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-gold-400 text-gold-400"
                    />
                  ))}
                </div>
                <p className="text-cream-100/90 italic">"{t.text}"</p>
                <p className="mt-4 font-semibold text-gold-400">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
