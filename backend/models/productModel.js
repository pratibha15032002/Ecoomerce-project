import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    image: { type: String },
    category: { type: String },
    stock: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
