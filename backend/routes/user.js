import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { verifyToken, verifyAdmin, verifySelfOrAdmin } from "../middleware/auth.js";

const router = express.Router();

// ✅ Test route
router.post('/register/test', (req, res) => {
  res.json({ message: 'Register route hit!' });
});

// ✅ Register
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

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.status(201).json({ message: "User registered", user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update profile
router.put("/profile/:id", verifyToken, verifySelfOrAdmin, async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Update address
router.put("/address/:id", verifyToken, async (req, res) => {
  try {
    const { address } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { address },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update cart
router.put("/cart/:id", verifyToken, async (req, res) => {
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

// ✅ Update wishlist
router.put("/wishlist/:id", verifyToken, async (req, res) => {
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

// ✅ Checkout
router.post("/checkout/:id", verifyToken, async (req, res) => {
  try {
    const { items, total } = req.body;
    const user = await User.findById(req.params.id);
    user.orders.push({ items, total, paidAt: new Date() });
    user.cart = [];
    await user.save();
    res.json({ message: "Order placed", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add a single product order (used by Razorpay handler)
router.post("/add-order", async (req, res) => {
  const { userId, product, paymentInfo } = req.body;

  try {
    const user = await User.findById(userId);
    user.orders.push({
      product,
      paymentInfo,
      date: new Date(),
    });

    await user.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to add order" });
  }
});

// ✅ Get all orders for a user
router.get("/orders/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ orders: user.orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
