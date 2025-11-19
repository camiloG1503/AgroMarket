import { Router } from "express";
import {
  getOrCreateCart,
  getCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from "../controllers/cart.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", authMiddleware, getCart);          // GET /api/cart/me
router.post("/me", authMiddleware, getOrCreateCart); // POST /api/cart/me (crear/obtener)
router.post("/me/items/:productId", authMiddleware, addItemToCart); // agregar item
router.put("/me/items/:productId", authMiddleware, updateCartItem); // actualizar cantidad
router.delete("/me/items/:productId", authMiddleware, removeCartItem); // eliminar item
router.delete("/me", authMiddleware, clearCart);     // vaciar carrito

export default router;

