// routes/payment.js
const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency: "INR",
    });
    res.json(order);
  } catch (err) {
    res.status(500).send("Error creating Razorpay order");
  }
});

module.exports = router;
