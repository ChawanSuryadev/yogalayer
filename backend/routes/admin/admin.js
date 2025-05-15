import express from "express";
import { verifyToken, verifyAdmin } from "../../middleware/auth.js"; // You’ll create these middleware

const router = express.Router();

router.get("/dashboard-data", verifyToken, verifyAdmin, (req, res) => {
  // Example: send stats about users, orders etc
  res.json({
    usersCount: 100,
    ordersCount: 150,
    revenue: 50000,
  });
});

export default router;
