import { Router } from "express";
import { register, login, forgotPassword, resetPassword, changePassword } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
// reset with token in URL (frontend will POST new password to this endpoint)
router.post("/reset-password/:token", resetPassword);
// change password for authenticated users
router.post("/change-password", verifyToken, changePassword);

export default router;
