import Favorito from "../models/Favoritos.js";
import Producto from "../models/Producto.js";

// Agregar producto a favoritos
export const addFavorite = async (req, res) => {
  try {
    const userId = req.user.id_usuario;
    const { productId } = req.params;

    // Validar producto
    const producto = await Producto.findByPk(productId);
    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });

    // Verificar si ya está en favoritos
    const exists = await Favorito.findOne({
      where: { FK_id_usuario: userId, FK_id_producto: productId }
    });

    if (exists)
      return res.status(409).json({ message: "Ya está en favoritos" });

    // Crear favorito
    const fav = await Favorito.create({
      FK_id_usuario: userId,
      FK_id_producto: productId
    });

    return res.status(201).json({ message: "Agregado a favoritos", fav });
  } catch (error) {
    console.error("addFavorite error:", error);
    return res.status(500).json({ message: "Error al agregar favorito" });
  }
};

// Listar favoritos del usuario
export const listFavorites = async (req, res) => {
  try {
    const userId = req.user.id_usuario;

    const favoritos = await Favorito.findAll({
      where: { FK_id_usuario: userId },
      include: [
        {
          model: Producto,
          attributes: ["id_producto", "nombre", "precio", "descuento", "imagen_principal"]
        }
      ]
    });

    return res.json(favoritos);
  } catch (error) {
    console.error("listFavorites error:", error);
    return res.status(500).json({ message: "Error al listar favoritos" });
  }
};

// Eliminar favorito
export const removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id_usuario;
    const { productId } = req.params;

    const fav = await Favorito.findOne({
      where: { FK_id_usuario: userId, FK_id_producto: productId }
    });

    if (!fav)
      return res.status(404).json({ message: "Este producto no está en favoritos" });

    await fav.destroy();

    return res.json({ message: "Eliminado de favoritos" });
  } catch (error) {
    console.error("removeFavorite error:", error);
    return res.status(500).json({ message: "Error al eliminar favorito" });
  }
};
