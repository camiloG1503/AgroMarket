import { sequelize } from "../config/db.js";
import Carrito from "../models/Carrito.js";
import DetalleCarrito from "../models/DetalleCarrito.js";
import Producto from "../models/Producto.js";
import { Op } from "sequelize";

// Helper: calcula totales (subtotales, descuento, total)
const calculateCartTotals = (items) => {
  let subtotal = 0;
  let totalDiscount = 0;
  items.forEach((it) => {
    const price = parseFloat(it.Producto.precio);
    const discount = parseFloat(it.Producto.descuento || 0);
    const effectivePrice = price - (price * (discount / 100));
    subtotal += effectivePrice * it.cantidad;
    totalDiscount += (price * (discount / 100)) * it.cantidad;
  });
  const total = subtotal; // si es necesario agregar shipping/iva, hacerlo aquí
  return { subtotal: Number(subtotal.toFixed(2)), totalDiscount: Number(totalDiscount.toFixed(2)), total: Number(total.toFixed(2)) };
};

// Obtener o crear carrito activo del usuario
export const getOrCreateCart = async (req, res) => {
  try {
    const userId = req.user.id_usuario;

    let cart = await Carrito.findOne({ where: { FK_id_usuario: userId, estado: "activo" } });

    if (!cart) {
      cart = await Carrito.create({ FK_id_usuario: userId });
    }

    return res.json(cart);
  } catch (error) {
    console.error("Error in getOrCreateCart:", error);
    return res.status(500).json({ message: "Error getting or creating cart" });
  }
};

// Obtener carrito con items
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id_usuario;

    const cart = await Carrito.findOne({
      where: { FK_id_usuario: userId, estado: "activo" },
      include: [
        {
          model: DetalleCarrito,
          include: [
            {
              model: Producto,
              attributes: ["id_producto", "nombre", "precio", "descuento", "stock"]
            }
          ]
        }
      ]
    });

    if (!cart) {
      return res.json({ items: [], totals: { subtotal: 0, totalDiscount: 0, total: 0 } });
    }

    const totals = calculateCartTotals(cart.Detalle_carrito || cart.DetalleCarrito || []);
    return res.json({ cart, items: cart.Detalle_carrito || cart.DetalleCarrito, totals });
  } catch (error) {
    console.error("Error in getCart:", error);
    return res.status(500).json({ message: "Error fetching cart" });
  }
};

// Agregar producto al carrito (o aumentar cantidad)
export const addItemToCart = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id_usuario;
    const { productId } = req.params;
    const { quantity = 1 } = req.body;

    // comprobar producto y stock
    const product = await Producto.findByPk(productId);
    if (!product) {
      await t.rollback();
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.stock < quantity) {
      await t.rollback();
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // obtener o crear carrito
    let cart = await Carrito.findOne({ where: { FK_id_usuario: userId, estado: "activo" }, transaction: t });
    if (!cart) {
      cart = await Carrito.create({ FK_id_usuario: userId }, { transaction: t });
    }

    // existe item?
    let item = await DetalleCarrito.findOne({ where: { FK_id_carrito: cart.id_carrito, FK_id_producto: productId }, transaction: t });

    if (item) {
      item.cantidad += quantity;
      await item.save({ transaction: t });
    } else {
      item = await DetalleCarrito.create({
        FK_id_carrito: cart.id_carrito,
        FK_id_producto: productId,
        cantidad: quantity
      }, { transaction: t });
    }

    await t.commit();
    return res.status(201).json({ message: "Product added to cart", item });
  } catch (error) {
    await t.rollback();
    console.error("Error in addItemToCart:", error);
    return res.status(500).json({ message: "Error adding item to cart" });
  }
};

// Actualizar cantidad de un item
export const updateCartItem = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id_usuario;
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      await t.rollback();
      return res.status(400).json({ message: "Quantity must be greater than 0" });
    }

    const cart = await Carrito.findOne({ where: { FK_id_usuario: userId, estado: "activo" }, transaction: t });
    if (!cart) {
      await t.rollback();
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = await DetalleCarrito.findOne({ where: { FK_id_carrito: cart.id_carrito, FK_id_producto: productId }, transaction: t });
    if (!item) {
      await t.rollback();
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const product = await Producto.findByPk(productId, { transaction: t });
    if (!product || product.stock < quantity) {
      await t.rollback();
      return res.status(400).json({ message: "Insufficient stock or product not found" });
    }

    item.cantidad = quantity;
    await item.save({ transaction: t });

    await t.commit();
    return res.json({ message: "Cart item updated", item });
  } catch (error) {
    await t.rollback();
    console.error("Error in updateCartItem:", error);
    return res.status(500).json({ message: "Error updating cart item" });
  }
};

// Eliminar item del carrito
export const removeCartItem = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id_usuario;
    const { productId } = req.params;

    const cart = await Carrito.findOne({ where: { FK_id_usuario: userId, estado: "activo" }, transaction: t });
    if (!cart) {
      await t.rollback();
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = await DetalleCarrito.findOne({ where: { FK_id_carrito: cart.id_carrito, FK_id_producto: productId }, transaction: t });
    if (!item) {
      await t.rollback();
      return res.status(404).json({ message: "Item not in cart" });
    }

    await item.destroy({ transaction: t });
    await t.commit();
    return res.json({ message: "Item removed from cart" });
  } catch (error) {
    await t.rollback();
    console.error("Error in removeCartItem:", error);
    return res.status(500).json({ message: "Error removing item from cart" });
  }
};

// Vaciar carrito
export const clearCart = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id_usuario;

    const cart = await Carrito.findOne({ where: { FK_id_usuario: userId, estado: "activo" }, transaction: t });
    if (!cart) {
      await t.rollback();
      return res.status(404).json({ message: "Cart not found" });
    }

    await DetalleCarrito.destroy({ where: { FK_id_carrito: cart.id_carrito }, transaction: t });

    await t.commit();
    return res.json({ message: "Cart cleared" });
  } catch (error) {
    await t.rollback();
    console.error("Error in clearCart:", error);
    return res.status(500).json({ message: "Error clearing cart" });
  }
};
