import Router from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductPicture,
} from "../controllers/producto.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";
import { uploadImage } from "../config/multer.js";

const router = Router();

// CRUD
router.post("/", verifyToken, isAdmin, uploadImage("productos").single("imagen"), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", verifyToken, isAdmin, uploadImage("productos").single("imagen"), updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

// RUTA PARA SUBIR FOTO DE PRODUCTO
router.post(
  "/:id/upload",
  verifyToken,
  isAdmin,
  uploadImage("productos").single("imagen"),
  uploadProductPicture
);

export default router;
