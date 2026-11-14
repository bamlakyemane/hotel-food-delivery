// src/components/layout/Navbar.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Search, Globe, User, Menu, X } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/menu", label: "Menu" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Placeholder values — wired to real state in later phases
  const cartCount = useCartStore((s) => s.getItemCount());
  const isLoggedIn = false;
  const language = "EN";

  return (
    <header className="sticky top-0 z-50 bg-forest-600 text-cream-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center font-bold text-forest-800">
              H
            </div>
            <span className="font-bold text-lg hidden sm:block">
              Hotel Restaurant
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-gold-400"
                      : "text-cream-50 hover:text-gold-400"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Search (desktop) */}
          <div className="hidden lg:flex items-center bg-forest-700/60 rounded-full px-3 py-1.5 w-64">
            <Search size={16} className="text-cream-200" />
            <input
              type="text"
              placeholder="Search food…"
              className="bg-transparent outline-none text-sm px-2 w-full placeholder:text-cream-200/60"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Language switcher (stub) */}
            <button
              className="hidden sm:flex items-center gap-1 text-sm hover:text-gold-400"
              title="Switch language (coming in Phase 8)"
            >
              <Globe size={18} />
              <span>{language}</span>
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative hover:text-gold-400"
              title="Cart"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-forest-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account */}
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="hover:text-gold-400"
                title="Account"
              >
                <User size={22} />
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-block bg-gold-500 hover:bg-gold-400 text-forest-900 font-semibold text-sm px-4 py-1.5 rounded-full transition"
              >
                Login
              </Link>
            )}

            {/* Mobile toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3 border-t border-forest-500/40 pt-3">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? "text-gold-400" : "text-cream-50"}`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-gold-400"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
