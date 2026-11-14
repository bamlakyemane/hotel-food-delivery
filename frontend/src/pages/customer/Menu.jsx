// src/pages/customer/Menu.jsx
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { categories } from "../../data/categories";
import { products } from "../../data/products";
import FoodCard from "../../components/customer/FoodCard";

const SORT_OPTIONS = [
  { value: "default", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Top Rated" },
];

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get("category") || "all";
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");
  const [maxPrice, setMaxPrice] = useState(2000);

  // Sync search input with URL when category changes externally
  useEffect(() => {
    // no-op — placeholder for future debouncing if desired
  }, [activeCategory]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (activeCategory !== "all") {
      list = list.filter((p) => p.categoryId === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    list = list.filter((p) => p.price <= maxPrice);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // "default" = popular first
        list.sort((a, b) => Number(b.isPopular) - Number(a.isPopular));
    }
    return list;
  }, [activeCategory, query, sort, maxPrice]);

  function setCategory(id) {
    const next = new URLSearchParams(searchParams);
    if (id === "all") next.delete("category");
    else next.set("category", id);
    setSearchParams(next);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-forest-800">Our Menu</h1>
        <p className="text-charcoal/60 mt-1">
          {filtered.length} item{filtered.length !== 1 && "s"} available
        </p>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4">
        <button
          onClick={() => setCategory("all")}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-forest-600 text-cream-50"
              : "bg-white text-forest-700 hover:bg-cream-100"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === c.id
                ? "bg-forest-600 text-cream-50"
                : "bg-white text-forest-700 hover:bg-cream-100"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 md:items-center">
        {/* Search */}
        <div className="flex items-center bg-cream-50 rounded-full px-3 py-2 flex-1">
          <Search size={16} className="text-charcoal/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes…"
            className="bg-transparent outline-none text-sm px-2 w-full"
          />
        </div>

        {/* Price slider */}
        <div className="flex items-center gap-3">
          <SlidersHorizontal size={16} className="text-charcoal/40" />
          <span className="text-xs text-charcoal/60 whitespace-nowrap">
            Max: {maxPrice} ETB
          </span>
          <input
            type="range"
            min={50}
            max={2000}
            step={50}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-32 accent-forest-600"
          />
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-cream-50 rounded-full px-4 py-2 text-sm outline-none cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-charcoal/60 text-lg">
            No dishes match your filters.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setMaxPrice(2000);
              setSort("default");
              setCategory("all");
            }}
            className="mt-4 text-forest-600 font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <FoodCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
