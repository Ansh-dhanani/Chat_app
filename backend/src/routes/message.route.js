import express from "express";
import {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { rateLimiter } from "../middlewares/ratelimit.middleware.js";

const router = express.Router();
router.use(rateLimiter,protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats",getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;
