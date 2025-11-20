import { sequelize } from "../config/db.js";
import { QueryTypes } from "sequelize";

export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id_usuario;

    // Total gastado por el cliente
    const totalGastado = await sequelize.query(
      `SELECT IFNULL(SUM(total), 0) AS total
       FROM Pedido
       WHERE FK_id_usuario = ?`,
      { replacements: [userId], type: QueryTypes.SELECT }
    );

    // Contar pedidos por estado
    const pedidosEstado = await sequelize.query(
      `SELECT estado, COUNT(*) AS cantidad
       FROM Pedido
       WHERE FK_id_usuario = ?
       GROUP BY estado`,
      { replacements: [userId], type: QueryTypes.SELECT }
    );

    // Últimos 5 pedidos
    const ultimosPedidos = await sequelize.query(
      `SELECT id_pedido, total, estado, fecha_pedido
       FROM Pedido
       WHERE FK_id_usuario = ?
       ORDER BY fecha_pedido DESC
       LIMIT 5`,
      { replacements: [userId], type: QueryTypes.SELECT }
    );

    // Productos más comprados por él
    const topUserProductos = await sequelize.query(
      `SELECT P.nombre, SUM(DP.cantidad) AS total
       FROM Detalle_pedido DP
       INNER JOIN Pedido Pe ON Pe.id_pedido = DP.FK_id_pedido
       INNER JOIN Producto P ON P.id_producto = DP.FK_id_producto
       WHERE Pe.FK_id_usuario = ?
       GROUP BY P.id_producto
       ORDER BY total DESC
       LIMIT 5`,
      { replacements: [userId], type: QueryTypes.SELECT }
    );

    // Categorías más compradas
    const topUserCategorias = await sequelize.query(
      `SELECT C.nombre_categoria, SUM(DP.cantidad) AS total
       FROM Detalle_pedido DP
       INNER JOIN Pedido Pe ON Pe.id_pedido = DP.FK_id_pedido
       INNER JOIN Producto P ON P.id_producto = DP.FK_id_producto
       INNER JOIN Categoria C ON C.id_categoria = P.FK_id_categoria
       WHERE Pe.FK_id_usuario = ?
       GROUP BY C.id_categoria
       ORDER BY total DESC
       LIMIT 5`,
      { replacements: [userId], type: QueryTypes.SELECT }
    );

    return res.json({
      totalGastado: totalGastado[0],
      pedidosEstado,
      ultimosPedidos,
      topUserProductos,
      topUserCategorias
    });

  } catch (error) {
    console.error("User Dashboard error:", error);
    res.status(500).json({ message: "Error cargando dashboard del usuario" });
  }
};
