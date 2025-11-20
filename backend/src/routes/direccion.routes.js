import { Router } from "express";
import {
  createAddress,
  getMyAddresses,
  updateAddress,
  deleteAddress
} from "../controllers/direccion.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyToken, createAddress);
router.get("/", verifyToken, getMyAddresses);
router.put("/:id", verifyToken, updateAddress);
router.delete("/:id", verifyToken, deleteAddress);

export default router;
