import express from "express";
import { sendMessage, getMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessage)
// ：id 是接收者的用户ID      表示“你要发送给谁”
router.post('/send/:id', protectRoute, sendMessage)


export default router;