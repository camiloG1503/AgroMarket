import { Router } from "express";
import { assignRole } from "../controllers/user.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/assign-role", verifyToken, isAdmin, assignRole);

export default router;
