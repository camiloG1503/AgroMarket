import { Router } from "express";
import { getReportesDashboard } from "../controllers/dashboard.reportes.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, isAdmin, getReportesDashboard);

export default router;
