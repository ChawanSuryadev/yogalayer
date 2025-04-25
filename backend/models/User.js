// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    cart: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    wishlist: [
      {
        productId: String,
        name: String,
        price: Number,
        addedAt: { type: Date, default: Date.now },
      },
    ],
    orders: [
      {
        items: Array,
        total: Number,
        paidAt: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
