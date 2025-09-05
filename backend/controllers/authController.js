import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });
    const user = await User.create({ name, email, password });
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token: genToken(user._id) });
  } catch (e) {
    res.status(500).json({ message: "Signup failed", error: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token: genToken(user._id) });
  } catch (e) {
    res.status(500).json({ message: "Login failed", error: e.message });
  }
};
