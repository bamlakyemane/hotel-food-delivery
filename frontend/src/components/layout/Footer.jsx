// src/components/layout/Footer.jsx
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-forest-800 text-cream-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center font-bold text-forest-800">
              H
            </div>
            <span className="font-bold text-lg">Hotel Restaurant</span>
          </div>
          <p className="text-sm text-cream-200/70">
            Authentic Ethiopian and international cuisine, delivered fresh to
            your door.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-semibold text-gold-400 mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/menu" className="hover:text-gold-400">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-gold-400">
                Favorites
              </Link>
            </li>
            <li>
              <Link to="/my-orders" className="hover:text-gold-400">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-gold-400 mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={14} /> +251 900 000 000
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} /> hello@hotelrestaurant.et
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} /> Addis Ababa, Ethiopia
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-semibold text-gold-400 mb-3">Follow</h4>
          <div className="flex gap-3">
            <a href="#" aria-label="Facebook" className="hover:text-gold-400">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gold-400">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-gold-400">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-forest-700 text-center text-xs py-4 text-cream-200/60">
        © {new Date().getFullYear()} Hotel Restaurant. All rights reserved.
      </div>
    </footer>
  );
}
