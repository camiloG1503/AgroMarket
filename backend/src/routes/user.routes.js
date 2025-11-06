import { Router } from "express";
import { assignRole, listUsers } from "../controllers/user.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/assign-role", verifyToken, isAdmin, assignRole);
router.get("/", verifyToken, isAdmin, listUsers);

export default router;
