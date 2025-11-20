import { Router } from "express";
import {
  createMarca,
  getAllMarca,
  getMarcaById,
  updateMarca,
  deleteMarca,
} from "../controllers/marca.controller.js";

import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// Solo admin puede crear / editar / eliminar marcas
router.post("/", verifyToken, isAdmin, createMarca);
router.get("/", getAllMarca);
router.get("/:id", getMarcaById);
router.put("/:id", verifyToken, isAdmin, updateMarca);
router.delete("/:id", verifyToken, isAdmin, deleteMarca);

export default router;
