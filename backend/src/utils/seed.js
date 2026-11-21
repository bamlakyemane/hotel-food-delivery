// src/utils/seed.js
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Import models
const User = require("../models/User");
const Category = require("../models/Category");
const Product = require("../models/Product");

const categoriesData = [
  { name: "Breakfast", nameAm: "ቁርስ", displayOrder: 1 },
  { name: "Main Dishes", nameAm: "ዋና ምግቦች", displayOrder: 2 },
  { name: "Traditional Ethiopian", nameAm: "ባህላዊ ምግቦች", displayOrder: 3 },
  { name: "Burgers & Sandwiches", nameAm: "በርገር እና ሳንድዊች", displayOrder: 4 },
  { name: "Pizza", nameAm: "ፒዛ", displayOrder: 5 },
  { name: "Desserts", nameAm: "ጣፋጭ ምግቦች", displayOrder: 6 },
  { name: "Cakes & Pastries", nameAm: "ኬክ እና ፓስትሪ", displayOrder: 7 },
  { name: "Hot Drinks", nameAm: "ትኩስ መጠጦች", displayOrder: 8 },
  { name: "Cold Drinks", nameAm: "ቀዝቃዛ መጠጦች", displayOrder: 9 },
  { name: "Special Offers", nameAm: "ልዩ ቅናሾች", displayOrder: 10 },
];

// A few sample products to start (we'll map the categories to their new MongoDB _ids)
const productsData = [
  {
    name: "Doro Wat",
    nameAm: "ዶሮ ወጥ",
    description:
      "Ethiopia's national dish — slow-cooked chicken in a rich berbere sauce.",
    price: 450,
    categoryName: "Traditional Ethiopian",
    image:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80",
    ingredients: ["Chicken", "Berbere", "Onion", "Injera"],
    preparationTime: 35,
    rating: 4.9,
    reviewCount: 128,
    isBestSeller: true,
    isPopular: true,
    variations: [
      { label: "Single", price: 450 },
      { label: "Double", price: 820 },
    ],
    extras: [{ name: "Extra injera", price: 20 }],
  },
  {
    name: "Classic Beef Burger",
    nameAm: "ክላሲክ የበሬ በርገር",
    description:
      "Juicy beef patty, lettuce, tomato, cheddar cheese and house sauce.",
    price: 280,
    categoryName: "Burgers & Sandwiches",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    ingredients: ["Beef patty", "Brioche bun", "Cheddar", "Lettuce", "Tomato"],
    preparationTime: 15,
    rating: 4.5,
    reviewCount: 110,
    isBestSeller: true,
    isPopular: true,
    variations: [
      { label: "Single", price: 280 },
      { label: "Double", price: 420 },
    ],
    extras: [{ name: "Extra cheese", price: 30 }],
  },
  {
    name: "Ethiopian Coffee (Buna)",
    nameAm: "ቡና",
    description:
      "Freshly roasted and brewed Ethiopian coffee, served traditionally.",
    price: 60,
    categoryName: "Hot Drinks",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    ingredients: ["Coffee beans", "Water", "Sugar"],
    preparationTime: 10,
    rating: 4.9,
    reviewCount: 210,
    isBestSeller: true,
    isPopular: true,
    variations: [
      { label: "Single", price: 60 },
      { label: "Jebena (pot)", price: 200 },
    ],
    extras: [],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB for seeding...");

    // 1. Clear existing data (Optional: comment this out if you don't want to wipe data)
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("🧹 Cleared existing Users, Categories, and Products.");

    // 2. Seed Categories
    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`✅ Added ${createdCategories.length} categories.`);

    // 3. Create a Category Map to easily look up the new MongoDB _id by name
    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // 4. Seed Products (replace categoryName with actual category ObjectId)
    const formattedProducts = productsData.map((prod) => {
      const { categoryName, ...rest } = prod;
      return {
        ...rest,
        category: categoryMap[categoryName],
      };
    });

    const createdProducts = await Product.insertMany(formattedProducts);
    console.log(`✅ Added ${createdProducts.length} products.`);

    // 5. Create an Admin User for testing
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("admin123", salt);

    await User.create({
      fullName: "System Admin",
      email: "admin@hotel.com",
      phone: "+251900000000",
      passwordHash,
      role: "admin",
    });
    console.log(
      "✅ Created Admin User (Email: admin@hotel.com, Password: admin123)",
    );

    console.log("🎉 Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
