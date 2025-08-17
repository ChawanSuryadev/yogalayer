import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin/admin.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
const app = express();

// ✅ Secure headers
app.use(helmet());

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://yogalayer.vercel.app"
];

// ✅ CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Yogalayer backend is working ✅");
});

// ✅ Routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
