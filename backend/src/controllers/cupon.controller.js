import Cupon from "../models/Cupon.js";
import Carrito from "../models/Carrito.js";
import DetalleCarrito from "../models/DetalleCarrito.js";
import Producto from "../models/Producto.js";
import { Op } from "sequelize";

// Helper: validar fechas
const isDateValid = (start, end) => {
    const now = new Date();
    return now >= start && now <= end;
};

// Crear cupón
export const createCoupon = async (req, res) => {
    try {
        const { codigo, porcentaje_descuento, fecha_inicio, fecha_fin, descripcion } = req.body;

        if (!codigo || !porcentaje_descuento || !fecha_inicio || !fecha_fin) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const exists = await Cupon.findOne({ where: { codigo } });
        if (exists) {
            return res.status(409).json({ message: "Este cupón ya existe" });
        }

        const nuevo = await Cupon.create({
            codigo,
            porcentaje_descuento,
            fecha_inicio,
            fecha_fin,
            descripcion,
            estado: "activo",
        });

        return res.status(201).json({
            message: "Cupón creado correctamente",
            cupon: nuevo,
        });
    } catch (error) {
        console.error("createCoupon:", error);
        return res.status(500).json({ message: "Error al crear el cupón" });
    }
};

// Obtener todos los cupones
export const getAllCoupons = async (req, res) => {
    try {
        const cupones = await Cupon.findAll();
        return res.json(cupones);
    } catch (error) {
        console.error("getAllCoupons:", error);
        return res.status(500).json({ message: "Error al obtener cupones" });
    }
};

// Obtener cupón por código
export const getCouponByCode = async (req, res) => {
    try {
        const { code } = req.params;

        const cupon = await Cupon.findOne({ where: { codigo: code } });
        if (!cupon) return res.status(404).json({ message: "Cupón no encontrado" });

        return res.json(cupon);
    } catch (error) {
        console.error("getCouponByCode:", error);
        return res.status(500).json({ message: "Error al obtener cupón" });
    }
};

// Validar cupón y calcular descuento
export const validateCoupon = async (req, res) => {
    try {
        const { code } = req.params;
        const userId = req.user.id_usuario;

        const cupon = await Cupon.findOne({ where: { codigo: code } });
        if (!cupon) return res.status(404).json({ message: "Cupón no encontrado" });

        // Validar estado
        if (cupon.estado !== "activo") {
            return res.status(400).json({ message: "Cupón inactivo" });
        }

        // Validar fechas
        if (!isDateValid(cupon.fecha_inicio, cupon.fecha_fin)) {
            return res.status(400).json({ message: "Cupón vencido" });
        }

        // Obtener carrito del usuario
        const cart = await Carrito.findOne({
            where: { FK_id_usuario: userId, estado: "activo" },
            include: [
                {
                    model: DetalleCarrito,
                    include: [
                        {
                            model: Producto,
                            attributes: ["precio", "descuento"],
                        },
                    ],
                },
            ],
        });

        if (!cart) {
            return res.status(400).json({ message: "El carrito está vacío" });
        }

        // Calcular total
        let total = 0;
        cart.Detalle_carrito.forEach((item) => {
            const price = parseFloat(item.Producto.precio);
            const discount = parseFloat(item.Producto.descuento || 0);
            const priceAfterDiscount = price - price * (discount / 100);
            total += priceAfterDiscount * item.cantidad;
        });

        const porcentaje = parseFloat(cupon.porcentaje_descuento);
        const amountDiscount = total * (porcentaje / 100);
        const totalFinal = total - amountDiscount;

        return res.json({
            message: "Cupón válido",
            cupon: cupon.codigo,
            porcentaje_descuento: cupon.porcentaje_descuento,
            subtotal: total.toFixed(2),
            descuento: amountDiscount.toFixed(2),
            total_final: totalFinal.toFixed(2),
        });
    } catch (error) {
        console.error("validateCoupon:", error);
        return res.status(500).json({ message: "Error al validar cupón" });
    }
};

// Actualizar cupón
export const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;

        const cupon = await Cupon.findByPk(id);
        if (!cupon) return res.status(404).json({ message: "Cupón no encontrado" });

        await cupon.update(req.body);

        return res.json({ message: "Cupón actualizado", cupon });
    } catch (error) {
        console.error("updateCoupon:", error);
        return res.status(500).json({ message: "Error al actualizar cupón" });
    }
};

// Activar cupón
export const activateCoupon = async (req, res) => {
    try {
        const { id } = req.params;

        const cupon = await Cupon.findByPk(id);
        if (!cupon) return res.status(404).json({ message: "Cupón no encontrado" });

        cupon.estado = "activo";
        await cupon.save();

        return res.json({ message: "Cupón activado", cupon });
    } catch (error) {
        return res.status(500).json({ message: "Error al activar cupón" });
    }
};

// Desactivar cupón
export const deactivateCoupon = async (req, res) => {
    try {
        const { id } = req.params;

        const cupon = await Cupon.findByPk(id);
        if (!cupon) return res.status(404).json({ message: "Cupón no encontrado" });

        cupon.estado = "inactivo";
        await cupon.save();

        return res.json({ message: "Cupón desactivado", cupon });
    } catch (error) {
        return res.status(500).json({ message: "Error al desactivar cupón" });
    }
};
