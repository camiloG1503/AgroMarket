import { Router } from "express";
import {
  processPayment,
  getPaymentForOrder,
  listAllPayments,
  changePaymentStatus
} from "../controllers/pago.controller.js";

import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// pagar pedido
router.post("/:idPedido", verifyToken, processPayment);

// obtener pago del pedido
router.get("/:idPedido", verifyToken, getPaymentForOrder);

// admin: listar todos
router.get("/admin/all", verifyToken, isAdmin, listAllPayments);

// admin: cambiar estado
router.put("/admin/status/:idPago", verifyToken, isAdmin, changePaymentStatus);

export default router;
