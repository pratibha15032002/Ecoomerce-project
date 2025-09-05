import express from "express";
import cors from "cors";
import morgan from "morgan";
import 'dotenv/config.js';
import connectDB from "./config/mongodb.js";
import { connectCloudinary } from "./config/cloudinary.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

// core
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

// connect services
connectDB();
connectCloudinary();

// health
app.get("/", (_req, res) => res.send("API is running"));

import paymentRoute from "./routes/paymentRoute.js";

// routes
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

app.use("/api/payment", paymentRoute);

// error handler
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server error", error: err.message });
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
