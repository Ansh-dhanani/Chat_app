import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { authLimiter } from "../middlewares/ratelimit.middleware.js";

const router = express.Router();

// Apply auth rate limiter to login and signup routes
router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/logout", logout);

export default router; 