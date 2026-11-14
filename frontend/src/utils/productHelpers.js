// src/utils/productHelpers.js
import { categories } from "../data/categories";

export function getCategoryById(id) {
  return categories.find((c) => c.id === id);
}
