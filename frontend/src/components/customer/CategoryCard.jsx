// src/components/customer/CategoryCard.jsx
import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/menu?category=${category.id}`}
      className="group flex flex-col items-center gap-2 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
    >
      <div className="w-14 h-14 rounded-full bg-cream-100 flex items-center justify-center text-2xl group-hover:bg-gold-400 transition-colors">
        {category.emoji}
      </div>
      <span className="text-sm font-medium text-forest-700 text-center leading-tight">
        {category.name}
      </span>
    </Link>
  );
}
