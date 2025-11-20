import { Router } from "express";
import {
  getOrCreateCart,
  getCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from "../controllers/cat.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", verifyToken, getCart);          // GET /api/cart/me
router.post("/me", verifyToken, getOrCreateCart); // POST /api/cart/me (crear/obtener)
router.post("/me/items/:productId", verifyToken, addItemToCart); // agregar item
router.put("/me/items/:productId", verifyToken, updateCartItem); // actualizar cantidad
router.delete("/me/items/:productId", verifyToken, removeCartItem); // eliminar item
router.delete("/me", verifyToken, clearCart);     // vaciar carrito
export default router;

