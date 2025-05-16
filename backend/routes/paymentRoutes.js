import express from "express";
import crypto from "crypto";
import Razorpay from "razorpay";
import dotenv from 'dotenv';

dotenv.config(); // ✅ Load environment variables

const router = express.Router();

// ✅ Create Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID); // ✅ Log the Razorpay Key ID

// ✅ Create Razorpay Order
router.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    console.log("Razorpay Order Created:", order);
    res.status(200).json(order); // ✅ Send entire order object
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ error: "Unable to create order" });
  }
});

// ✅ Verify Razorpay Signature
router.post("/verify", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    console.log("Payment verified successfully");
    res.json({ status: "success" });
  } else {
    console.error("Invalid payment signature");
    res.status(400).json({ status: "failure" });
  }
});

export default router;
