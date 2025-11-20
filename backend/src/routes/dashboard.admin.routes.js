import { Router } from "express";
import { getDashboardData } from "../controllers/dashboard.admin.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// Dashboard SOLO ADMIN
router.get("/", verifyToken, isAdmin, getDashboardData);

export default router;
