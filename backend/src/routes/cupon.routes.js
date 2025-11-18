import { Router } from "express";
import {
    createCoupon,
    getAllCoupons,
    getCouponByCode,
    validateCoupon,
    updateCoupon,
    activateCoupon,
    deactivateCoupon,
} from "../controllers/cupon.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyToken, isAdmin, createCoupon);
router.get("/", verifyToken, isAdmin, getAllCoupons);
router.get("/:code", verifyToken, getCouponByCode);
router.get("/validate/:code", verifyToken, validateCoupon);
router.put("/:id", verifyToken, isAdmin, updateCoupon);
router.put("/:id/activate", verifyToken, isAdmin, activateCoupon);
router.put("/:id/deactivate", verifyToken, isAdmin, deactivateCoupon);

export default router;
