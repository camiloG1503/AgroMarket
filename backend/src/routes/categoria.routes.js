import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoria.controller.js";

import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// Solo admin puede crear / editar / eliminar categorías
router.post("/", verifyToken, isAdmin, createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", verifyToken, isAdmin, updateCategory);
router.delete("/:id", verifyToken, isAdmin, deleteCategory);
export default router;
