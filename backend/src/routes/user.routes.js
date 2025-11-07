import { Router } from "express";
import {
  assignRole,
  listUsers,
  getUserProfile,
  updateProfile,
  deleteAccount,
  uploadProfilePicture,
} from "../controllers/user.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = Router();

// ⚙️ Configuración de multer
const storage = multer.diskStorage({
  destination: "src/uploads",
  filename: (req, file, cb) => {
    cb(null, `user_${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

// Rutas administrativas
router.post("/assign-role", verifyToken, isAdmin, assignRole);
router.get("/", verifyToken, isAdmin, listUsers);

// Rutas de usuario
router.get("/profile", verifyToken, getUserProfile);
router.put("/update", verifyToken, updateProfile);
router.delete("/delete/:id", verifyToken, isAdmin, deleteAccount);
router.post("/upload", verifyToken, upload.single("foto"), uploadProfilePicture);

export default router;