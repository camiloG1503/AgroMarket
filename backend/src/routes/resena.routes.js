import { Router } from "express";
import { 
  createReview,
  getReviewsByProduct,
  updateReview,
  deleteReview
} from "../controllers/resena.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:productId", verifyToken, createReview);
router.get("/:productId", getReviewsByProduct);
router.put("/:id", verifyToken, updateReview);
router.delete("/:id", verifyToken, deleteReview);

export default router;
