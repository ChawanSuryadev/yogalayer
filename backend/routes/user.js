import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { fullName, mobile, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      mobile,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update cart
router.put("/cart/:id", async (req, res) => {
  try {
    const { cart } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { cart },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update wishlist
router.put("/wishlist/:id", async (req, res) => {
  try {
    const { wishlist } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { wishlist },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Checkout - save order
router.post("/checkout/:id", async (req, res) => {
  try {
    const { items, total } = req.body;
    const user = await User.findById(req.params.id);
    user.orders.push({ items, total, paidAt: new Date() });
    user.cart = []; // clear cart
    await user.save();
    res.json({ message: "Order placed", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
