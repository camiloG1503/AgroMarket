import { sequelize } from "../config/db.js";
import { QueryTypes } from "sequelize";

export const getLogisticaDashboard = async (req, res) => {
  try {
    const empresaId = req.user.id_empresa; // viene del token logístico

    // Total pedidos asignados
    const totalPedidos = await sequelize.query(
      `SELECT COUNT(*) AS total
       FROM Pedido
       WHERE FK_id_empresa = ?`,
      { replacements: [empresaId], type: QueryTypes.SELECT }
    );

    // Pedidos por estado
    const pedidosEstado = await sequelize.query(
      `SELECT estado, COUNT(*) AS cantidad
       FROM Pedido
       WHERE FK_id_empresa = ?
       GROUP BY estado`,
      { replacements: [empresaId], type: QueryTypes.SELECT }
    );

    // Últimos pedidos
    const ultimos = await sequelize.query(
      `SELECT id_pedido, estado, fecha_pedido, tipo_entrega
       FROM Pedido
       WHERE FK_id_empresa = ?
       ORDER BY fecha_pedido DESC
       LIMIT 10`,
      { replacements: [empresaId], type: QueryTypes.SELECT }
    );

    // Ganancias: suma de costos de envío
    const ganancias = await sequelize.query(
      `SELECT IFNULL(SUM(E.costo_envio), 0) AS total
       FROM Pedido P
       INNER JOIN Empresas_transporte E ON E.id_empresa = P.FK_id_empresa
       WHERE P.FK_id_empresa = ?`,
      { replacements: [empresaId], type: QueryTypes.SELECT }
    );

    return res.json({
      totalPedidos: totalPedidos[0],
      pedidosEstado,
      ultimos,
      ganancias: ganancias[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error cargando dashboard logístico" });
  }
};
