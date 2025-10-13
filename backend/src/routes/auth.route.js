import express from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
import { rateLimiter } from "../middlewares/ratelimit.middleware.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import User from "../models/user.model.js";

const router = express.Router();

// Apply auth rate limiter to all routes
router.use(rateLimiter);


router.get("/test",(req,res)=>{
    res.status(200).json({message:"Test Route"});
})
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile",protectRoute,updateProfile)

router.get("/check", protectRoute, async (req, res) => {
    try {
        const user = req.user;
        
        // Only update if lastSeen is older than 1 minute to reduce database writes
        const oneMinuteAgo = new Date(Date.now() - 60000);
        if (!user.lastSeen || user.lastSeen < oneMinuteAgo) {
            const updatedUser = await User.findByIdAndUpdate(
                req.user._id,
                { isOnline: true, lastSeen: new Date() },
                { new: true }
            ).select("-password");
            return res.status(200).json(updatedUser);
        }
        
        // Return existing user data without update
        const currentUser = await User.findById(req.user._id).select("-password");
        res.status(200).json(currentUser);
    } catch (error) {
        console.log("Error in check auth:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router; 