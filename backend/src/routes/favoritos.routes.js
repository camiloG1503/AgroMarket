import { Router } from "express";
import { addFavorite, listFavorites, removeFavorite } from "../controllers/favoritos.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:productId", verifyToken, addFavorite);
router.get("/", verifyToken, listFavorites);
router.delete("/:productId", verifyToken, removeFavorite);

export default router;
