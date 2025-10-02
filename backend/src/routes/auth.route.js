import express from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
import { authLimiter } from "../middlewares/ratelimit.middleware.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Apply auth rate limiter to login and signup routes
router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/logout", logout);

router.put("/update-profile",protectRoute,updateProfile)

router.get("/check", protectRoute, (req, res) => {
    res.status(200).json(req.user);
});

export default router; 