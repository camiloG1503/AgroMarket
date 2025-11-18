import Pago from "../models/Pago.js";
import PagoTarjeta from "../models/PagoTarjeta.js";
import Pedido from "../models/Pedido.js";

export const processPayment = async (req, res) => {
  try {
    const { metodo, tarjeta } = req.body;
    const { idPedido } = req.params;

    const pedido = await Pedido.findByPk(idPedido);
    if (!pedido) return res.status(404).json({ message: "Pedido no encontrado" });

    // Validar que el pedido pertenezca al usuario (si no es admin)
    if (!req.user.roles.includes("admin")) {
      if (pedido.FK_id_usuario !== req.user.id_usuario) {
        return res.status(403).json({ message: "No autorizado" });
      }
    }

    // Crear pago base
    const pago = await Pago.create({
      FK_id_pedido: pedido.id_pedido,
      total: pedido.total,
      estado_pago: "pendiente",
      efectivo: metodo === "efectivo" ? true : false
    });

    // Si es tarjeta, guardar datos de tarjeta
    if (metodo === "tarjeta") {
      if (!tarjeta)
        return res.status(400).json({ message: "Faltan datos de tarjeta" });

      await PagoTarjeta.create({
        FK_id_pago: pago.id_pago,
        nombre_titular: tarjeta.nombre_titular,
        numero_tarjeta: tarjeta.numero_tarjeta,
        tipo_tarjeta: tarjeta.tipo_tarjeta,
        franquicia: tarjeta.franquicia,
        CVV: tarjeta.CVV,
        fecha_vencimiento: tarjeta.fecha_vencimiento
      });
    }

    // Simulación (se marca como aprobado)
    pago.estado_pago = "aprobado";
    await pago.save();

    // Actualizar estado del pedido
    pedido.estado = "pagado";
    pedido.codigo_transaccion = `TRX-${Date.now()}`;
    await pedido.save();

    return res.json({
      message: "Pago procesado",
      pago,
      pedido
    });

  } catch (error) {
    console.error("processPayment error:", error);
    return res.status(500).json({ message: "Error al procesar pago" });
  }
};

// Obtener pago de un pedido
export const getPaymentForOrder = async (req, res) => {
  try {
    const { idPedido } = req.params;

    const pago = await Pago.findOne({
      where: { FK_id_pedido: idPedido },
      include: [PagoTarjeta]
    });

    if (!pago) return res.status(404).json({ message: "Pago no encontrado" });

    return res.json(pago);

  } catch (error) {
    console.error("getPaymentForOrder error:", error);
    return res.status(500).json({ message: "Error al obtener pago" });
  }
};

// Listar todos los pagos (admin)
export const listAllPayments = async (req, res) => {
  try {
    const pagos = await Pago.findAll({
      include: [PagoTarjeta, Pedido]
    });

    return res.json(pagos);

  } catch (error) {
    console.error("listAllPayments error:", error);
    return res.status(500).json({ message: "Error al obtener pagos" });
  }
};

// Cambiar estado de pago (admin)
export const changePaymentStatus = async (req, res) => {
  try {
    const { idPago } = req.params;
    const { estado } = req.body;

    const pago = await Pago.findByPk(idPago);
    if (!pago) return res.status(404).json({ message: "Pago no encontrado" });

    pago.estado_pago = estado;
    await pago.save();

    return res.json({ message: "Estado actualizado", pago });

  } catch (error) {
    console.error("changePaymentStatus error:", error);
    return res.status(500).json({ message: "Error al cambiar estado" });
  }
};
