import { Router } from "express";
import { register, login, forgotPassword, resetPassword, changePassword } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
// Rutas para recuperación y cambio de contraseña
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Ruta para cambiar la contraseña (requiere autenticación)
router.post("/change-password", verifyToken, changePassword);

export default router;
