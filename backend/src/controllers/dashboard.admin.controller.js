import { sequelize } from "../config/db.js";
import { QueryTypes } from "sequelize";

export const getDashboardData = async (req, res) => {
  try {

    // 1. Total de ventas (sumatoria total pagado)
    const totalVentas = await sequelize.query(
      `SELECT IFNULL(SUM(total), 0) AS total_ventas
       FROM Pedido
       WHERE estado IN ('entregado', 'pagado')`,
      { type: QueryTypes.SELECT }
    );

    // 2. Total de pedidos por estado
    const pedidosEstado = await sequelize.query(
      `SELECT estado, COUNT(*) AS cantidad
       FROM Pedido
       GROUP BY estado`,
      { type: QueryTypes.SELECT }
    );

    // 3. Pedidos por mes (últimos 12 meses)
    const pedidosMensuales = await sequelize.query(
      `SELECT DATE_FORMAT(fecha_pedido, '%Y-%m') AS mes, COUNT(*) AS total
       FROM Pedido
       GROUP BY mes
       ORDER BY mes ASC`,
      { type: QueryTypes.SELECT }
    );

    // 4. Productos más vendidos
    const topProductos = await sequelize.query(
      `SELECT P.nombre, SUM(DP.cantidad) AS vendidos
       FROM Detalle_pedido DP
       INNER JOIN Producto P ON P.id_producto = DP.FK_id_producto
       GROUP BY P.id_producto
       ORDER BY vendidos DESC
       LIMIT 5`,
      { type: QueryTypes.SELECT }
    );

    // 5. Categorías más vendidas
    const topCategorias = await sequelize.query(
      `SELECT C.nombre_categoria, SUM(DP.cantidad) AS vendidos
       FROM Detalle_pedido DP
       INNER JOIN Producto P ON P.id_producto = DP.FK_id_producto
       INNER JOIN Categoria C ON C.id_categoria = P.FK_id_categoria
       GROUP BY C.id_categoria
       ORDER BY vendidos DESC
       LIMIT 5`,
      { type: QueryTypes.SELECT }
    );

    // 6. Marcas más vendidas
    const topMarcas = await sequelize.query(
      `SELECT M.nombre_marca, SUM(DP.cantidad) AS vendidos
       FROM Detalle_pedido DP
       INNER JOIN Producto P ON P.id_producto = DP.FK_id_producto
       INNER JOIN Marca M ON M.id_marca = P.FK_id_marca
       GROUP BY M.id_marca
       ORDER BY vendidos DESC
       LIMIT 5`,
      { type: QueryTypes.SELECT }
    );

    // 7. Usuarios registrados
    const totalUsuarios = await sequelize.query(
      `SELECT COUNT(*) AS total FROM Usuario`,
      { type: QueryTypes.SELECT }
    );

    // 8. Pedidos por empresa de transporte
    const pedidosPorTransportadora = await sequelize.query(
      `SELECT E.nombre AS empresa, COUNT(*) AS total
       FROM Pedido P
       INNER JOIN Empresas_transporte E ON E.id_empresa = P.FK_id_empresa
       GROUP BY E.id_empresa`,
      { type: QueryTypes.SELECT }
    );

    // 9. Top clientes (los que más compran)
    const topClientes = await sequelize.query(
      `SELECT U.nombre, U.apellido, SUM(P.total) AS gastado
       FROM Pedido P
       INNER JOIN Usuario U ON U.id_usuario = P.FK_id_usuario
       GROUP BY U.id_usuario
       ORDER BY gastado DESC
       LIMIT 5`,
      { type: QueryTypes.SELECT }
    );

    return res.json({
      totalVentas: totalVentas[0],
      pedidosEstado,
      pedidosMensuales,
      topProductos,
      topCategorias,
      topMarcas,
      totalUsuarios: totalUsuarios[0],
      pedidosPorTransportadora,
      topClientes
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Error obteniendo dashboard" });
  }
};
