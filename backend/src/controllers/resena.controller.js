import Resena from "../models/Resena.js";
import Producto from "../models/Producto.js";
import Pedido from "../models/Pedido.js";
import DetallePedido from "../models/DetallePedido.js";
import User from "../models/User.js";

// Validar si el usuario realmente compró el producto
const userPurchasedProduct = async (userId, productId) => {
  const exists = await DetallePedido.findOne({
    include: [{
      model: Pedido,
      where: { FK_id_usuario: userId }
    }],
    where: { FK_id_producto: productId }
  });
  return !!exists;
};

// Crear reseña
export const createReview = async (req, res) => {
  try {
    const userId = req.user.id_usuario;
    const { productId } = req.params;
    const { calificacion, comentario } = req.body;

    if (!calificacion || calificacion < 1 || calificacion > 5) {
      return res.status(400).json({ message: "Calificación debe ser entre 1 y 5" });
    }

    const purchased = await userPurchasedProduct(userId, productId);
    if (!purchased) {
      return res.status(403).json({ message: "Solo puedes reseñar productos que compraste" });
    }

    const review = await Resena.create({
      FK_id_usuario: userId,
      FK_id_producto: productId,
      calificacion,
      comentario
    });

    return res.status(201).json({ message: "Reseña creada", review });
  } catch (error) {
    console.error("createReview error:", error);
    return res.status(500).json({ message: "Error al crear reseña" });
  }
};

// Listar reseñas de un producto
export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Resena.findAll({
      where: { FK_id_producto: productId },
      include: [{ model: User, attributes: ["id_usuario", "nombre"] }],
      order: [["fecha_reseña", "DESC"]]
    });

    return res.json(reviews);
  } catch (error) {
    console.error("getReviewsByProduct:", error);
    return res.status(500).json({ message: "Error al obtener reseñas" });
  }
};

// Editar reseña
export const updateReview = async (req, res) => {
  try {
    const userId = req.user.id_usuario;
    const { id } = req.params;

    const review = await Resena.findByPk(id);
    if (!review) return res.status(404).json({ message: "Reseña no encontrada" });

    if (review.FK_id_usuario !== userId) {
      return res.status(403).json({ message: "No puedes editar esta reseña" });
    }

    const { calificacion, comentario } = req.body;
    if (calificacion !== undefined && (Number(calificacion) < 1 || Number(calificacion) > 5)) {
      return res.status(400).json({ message: "Calificación debe ser entre 1 y 5" });
    }
    await review.update({ calificacion, comentario });
    return res.json({ message: "Reseña actualizada", review });
  } catch (error) {
    console.error("updateReview:", error);
    return res.status(500).json({ message: "Error al actualizar reseña" });
  }
};

// Eliminar reseña
export const deleteReview = async (req, res) => {
  try {
    const userId = req.user.id_usuario;
    const { id } = req.params;

    const review = await Resena.findByPk(id);
    if (!review) return res.status(404).json({ message: "Reseña no encontrada" });

    if (review.FK_id_usuario !== userId && req.user.rol !== "admin") {
      return res.status(403).json({ message: "No puedes eliminar esta reseña" });
    }

    await review.destroy();
    return res.json({ message: "Reseña eliminada" });
  } catch (error) {
    console.error("deleteReview:", error);
    return res.status(500).json({ message: "Error al eliminar reseña" });
  }
};
