import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('Yogalayer backend is working ✅');
});

// ✅ Register API routes
app.use("/api/user", userRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
