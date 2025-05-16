import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin/admin.js";
import paymentRoutes from "./routes/paymentRoutes.js"; // ⬅️ New import

dotenv.config();
const app = express();

// ✅ Use Helmet for securing HTTP headers
app.use(helmet());

// ✅ Define allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://yogalayer.vercel.app"
];

// ✅ Manually handle CORS headers and preflight OPTIONS
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // ⚡ Reply OK for preflight
  }
  next();
});

// ✅ Use cors middleware with dynamic origin check
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("Yogalayer backend is working ✅");
});

// ✅ Register routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes); // ⬅️ Payment route added


// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
