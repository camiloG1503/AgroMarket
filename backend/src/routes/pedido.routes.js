import { Router } from "express";
import {
  createOrderFromCart,
  getOrderById,
  listUserOrders,
  listAllOrders,
  changeOrderStatus
} from "../controllers/pedido.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/checkout", verifyToken, createOrderFromCart);
router.get("/me", verifyToken, listUserOrders);
router.get("/all", verifyToken, isAdmin, listAllOrders);
router.get("/:id", verifyToken, getOrderById);
router.put("/:id/status", verifyToken, isAdmin, changeOrderStatus);

export default router;
