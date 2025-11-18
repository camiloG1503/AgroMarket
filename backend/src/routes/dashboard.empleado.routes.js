import { Router } from "express";
import { getLogisticaDashboard } from "../controllers/dashboardLogistica.controller.js";
import { verifyToken, isLogistico } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, isLogistico, getLogisticaDashboard);

export default router;
