import express from "express";
import { checkRoute } from "../middleware/auth.middleware.js";
import { getToken } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/token",checkRoute,getToken);

export default router;