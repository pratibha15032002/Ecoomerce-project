import Product from "../models/productModel.js";
import { cloudinary } from "../config/cloudinary.js";

export const listProducts = async (_req, res) => {
  const items = await Product.find().sort({ createdAt: -1 });
  res.json(items);
};

export const getProduct = async (req, res) => {
  const item = await Product.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    let imageUrl = req.body.image || "";
    if (req.file?.path) {
      const upload = await cloudinary.uploader.upload(req.file.path, { folder: "ecommerce" });
      imageUrl = upload.secure_url;
    }
    const item = await Product.create({ name, description, price, category, stock, image: imageUrl });
    res.status(201).json(item);
  } catch (e) {
    res.status(500).json({ message: "Create failed", error: e.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file?.path) {
      const upload = await cloudinary.uploader.upload(req.file.path, { folder: "ecommerce" });
      updates.image = upload.secure_url;
    }
    const item = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: "Update failed", error: e.message });
  }
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
