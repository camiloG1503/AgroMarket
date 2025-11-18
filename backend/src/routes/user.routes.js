import { Router } from "express";
import { uploadImage } from "../config/multer.js";
import {
  assignRole,
  listUsers,
  getUserProfile,
  updateProfile,
  deleteAccount,
  uploadProfilePicture,
} from "../controllers/user.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/assign-role", verifyToken, isAdmin, assignRole);
router.get("/", verifyToken, isAdmin, listUsers);

router.get("/profile", verifyToken, getUserProfile);
router.put("/update", verifyToken, updateProfile);
router.delete("/delete/:id", verifyToken, isAdmin, deleteAccount);

// FOTO DE PERFIL
router.post(
  "/upload",
  verifyToken,
  uploadImage("usuarios").single("foto"),
  uploadProfilePicture
);

export default router;
