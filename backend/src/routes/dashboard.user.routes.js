import { Router } from "express";
import { getUserDashboard } from "../controllers/dashboard.user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, getUserDashboard);

export default router;
