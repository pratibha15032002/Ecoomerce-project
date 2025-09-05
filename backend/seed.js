import mongoose from "mongoose";
import 'dotenv/config.js';
import connectDB from "./config/mongodb.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";

const run = async () => {
  await connectDB();

  // Clear existing data
  await User.deleteMany({});
  await Product.deleteMany({});

  // Create admin user
  const admin = await User.create({
    name: "Admin",
    email: "admin@test.com",
    password: "123456",
    role: "admin",
  });

  // Sample products
  const products = [
    { name: "T-Shirt", description: "Comfortable cotton t-shirt", price: 499, stock: 50, category: "Clothes", image: "https://via.placeholder.com/400x300?text=T-Shirt" },
    { name: "Shoes", description: "Running shoes", price: 1999, stock: 20, category: "Footwear", image: "https://via.placeholder.com/400x300?text=Shoes" },
    { name: "Laptop", description: "14-inch laptop with 8GB RAM", price: 45999, stock: 10, category: "Electronics", image: "https://via.placeholder.com/400x300?text=Laptop" },
  ];

  await Product.insertMany(products);

  console.log("Seed data inserted:");
  console.log("Admin -> email: admin@test.com | password: 123456");
  process.exit();
};

run();
