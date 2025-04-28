import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();

// ✅ Use Helmet for securing HTTP headers
app.use(helmet());

// ✅ Define allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://yogalayer-oofcb4eyl-suryas-projects-ddd73cd2.vercel.app"
];

// ✅ Manually set CORS headers for preflight handling
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

// ✅ Use cors middleware with allowed origins
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('Yogalayer backend is working ✅');
});

// ✅ Register user-related routes
app.use("/api/user", userRoutes);

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
