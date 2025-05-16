import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }, // <-- Admin flag
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
        // For Razorpay one-product flow
        product: {
          type: Object, // Store full product info or use ref if needed
        },
        paymentInfo: Object,
        date: Date,

        // For traditional checkout flow
        items: Array,
        total: Number,
        paidAt: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
