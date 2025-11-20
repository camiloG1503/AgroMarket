import { sequelize } from "../config/db.js";
import Pedido from "../models/Pedido.js";
import DetallePedido from "../models/DetallePedido.js";
import Carrito from "../models/Carrito.js";
import DetalleCarrito from "../models/DetalleCarrito.js";
import Producto from "../models/Producto.js";
import Cupon from "../models/Cupon.js";
import Usuario from "../models/User.js";

const ALLOWED_STATUSES = [
  "pendiente",
  "procesando",
  "pagado",
  "preparando",
  "enviado",
  "entregado",
  "cancelado",
  "rechazado",
];

// Genera un código único para el pedido
const generateTransactionCode = () =>
  "TRX-" + Math.random().toString(36).substring(2, 10).toUpperCase();

// Calcula subtotal aplicando descuentos por producto
const calculateCartTotals = (items) => {
  let subtotal = 0;
  items.forEach((it) => {
    const price = parseFloat(it.Producto.precio);
    const productDiscount = parseFloat(it.Producto.descuento || 0);
    const effective = price - (price * (productDiscount / 100));
    subtotal += effective * it.cantidad;
  });
  return { subtotal: Number(subtotal.toFixed(2)) };
};


// POST /api/pedidos
export const createOrderFromCart = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id_usuario;
    const { tipo_entrega, FK_id_empresa = null, coupon_code = null } = req.body;

    if (!tipo_entrega)
      return res.status(400).json({ message: "tipo_entrega es obligatorio" });

    // Obtener carrito
    const cart = await Carrito.findOne({
      where: { FK_id_usuario: userId, estado: "activo" },
      include: [{ model: DetalleCarrito, include: [Producto] }],
      transaction: t,
      lock: t.LOCK.UPDATE
    });

    if (!cart || cart.Detalle_carrito.length === 0)
      return res.status(400).json({ message: "El carrito está vacío" });

    // Validar stock
    for (const item of cart.Detalle_carrito) {
      const prod = item.Producto;
      if (!prod)
        return res.status(400).json({ message: `Producto no encontrado` });

      if (prod.stock < item.cantidad)
        return res.status(400).json({
          message: `Stock insuficiente para ${prod.nombre}`
        });
    }

    // Calcular subtotal
    const { subtotal } = calculateCartTotals(cart.Detalle_carrito);

    // Aplicar cupón
    let coupon = null;
    let discountAmount = 0;

    if (coupon_code) {
      coupon = await Cupon.findOne({
        where: { codigo: coupon_code },
        transaction: t
      });

      if (!coupon || coupon.estado !== "activo")
        return res.status(400).json({ message: "Cupón inválido o inactivo" });

      const now = new Date();
      if (!(now >= new Date(coupon.fecha_inicio) && now <= new Date(coupon.fecha_fin)))
        return res.status(400).json({ message: "Cupón expirado" });

      const pct = parseFloat(coupon.porcentaje_descuento);
      discountAmount = Number((subtotal * (pct / 100)).toFixed(2));
    }

    const total = Number((subtotal - discountAmount).toFixed(2));

    // Crear pedido
    const newOrder = await Pedido.create({
      FK_id_usuario: userId,
      tipo_entrega,
      fecha_pedido: new Date(),
      FK_id_empresa,
      FK_id_cupon: coupon ? coupon.id_cupon : null,
      estado: "pendiente",
      subtotal,
      descuento_total: discountAmount,
      total,
      codigo_transaccion: generateTransactionCode()
    }, { transaction: t });

    // Crear detalles & actualizar stock
    for (const item of cart.Detalle_carrito) {
      const prod = item.Producto;

      const price = parseFloat(prod.precio);
      const d = parseFloat(prod.descuento || 0);
      const finalPrice = Number((price - (price * (d / 100))).toFixed(2));

      const qty = item.cantidad;
      const lineSubtotal = Number((finalPrice * qty).toFixed(2));

      await DetallePedido.create({
        FK_id_pedido: newOrder.id_pedido,
        FK_id_producto: prod.id_producto,
        cantidad: qty,
        precio_unitario: finalPrice,
        subtotal: lineSubtotal
      }, { transaction: t });

      await prod.update({ stock: prod.stock - qty }, { transaction: t });
    }

    // Vaciar carrito
    await DetalleCarrito.destroy({
      where: { FK_id_carrito: cart.id_carrito },
      transaction: t
    });

    await cart.update({ estado: "closed" }, { transaction: t });

    await t.commit();

    const fullOrder = await Pedido.findByPk(newOrder.id_pedido, {
      include: [
        { model: DetallePedido, include: [Producto] },
        Cupon
      ]
    });

    res.status(201).json({ message: "Pedido creado", order: fullOrder });

  } catch (error) {
    console.error("createOrderFromCart error:", error);
    await t.rollback();
    res.status(500).json({ message: "Error al crear pedido" });
  }
};


// GET /api/pedidos/:id
export const getOrderById = async (req, res) => {
  try {
    const order = await Pedido.findByPk(req.params.id, {
      include: [
        { model: DetallePedido, include: [Producto] },
        Cupon,
        Usuario
      ]
    });

    if (!order) return res.status(404).json({ message: "Pedido no encontrado" });

    const isAdmin = req.user.roles.includes("admin");
    if (!isAdmin && order.FK_id_usuario !== req.user.id_usuario)
      return res.status(403).json({ message: "No autorizado" });

    res.json(order);

  } catch (error) {
    console.error("getOrderById:", error);
    res.status(500).json({ message: "Error al obtener pedido" });
  }
};


// GET /api/pedidos/me
export const listUserOrders = async (req, res) => {
  try {
    const orders = await Pedido.findAll({
      where: { FK_id_usuario: req.user.id_usuario },
      include: [
        { model: DetallePedido, include: [Producto] },
        Cupon
      ],
      order: [["fecha_pedido", "DESC"]]
    });

    res.json(orders);

  } catch (error) {
    console.error("listUserOrders:", error);
    res.status(500).json({ message: "Error al listar pedidos" });
  }
};


// GET /api/pedidos (admin)
export const listAllOrders = async (req, res) => {
  try {
    const orders = await Pedido.findAll({
      include: [
        { model: DetallePedido, include: [Producto] },
        Cupon,
        Usuario
      ],
      order: [["fecha_pedido", "DESC"]]
    });

    res.json(orders);

  } catch (error) {
    console.error("listAllOrders:", error);
    res.status(500).json({ message: "Error al listar pedidos" });
  }
};


// PUT /api/pedidos/:id/status
export const changeOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!ALLOWED_STATUSES.includes(status))
      return res.status(400).json({ message: "Estado inválido" });

    const order = await Pedido.findByPk(req.params.id);
    if (!order)
      return res.status(404).json({ message: "Pedido no encontrado" });

    order.estado = status;
    await order.save();

    res.json({ message: "Estado actualizado", order });

  } catch (error) {
    console.error("changeOrderStatus:", error);
    res.status(500).json({ message: "Error al cambiar estado" });
  }
};
