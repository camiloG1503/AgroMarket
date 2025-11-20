import { sequelize } from "../config/db.js";
import { QueryTypes } from "sequelize";

export const getReportesDashboard = async (req, res) => {
  try {

    // Total reportes
    const totalReportes = await sequelize.query(
      `SELECT COUNT(*) AS total FROM Reportes`,
      { type: QueryTypes.SELECT }
    );

    // Reportes por tipo
    const reportesPorTipo = await sequelize.query(
      `SELECT T.nombre_tipo, COUNT(R.id_reporte) AS cantidad
       FROM Reportes R
       INNER JOIN Tipo_reporte T ON T.id_tipo = R.FK_id_tipo
       GROUP BY T.id_tipo`,
      { type: QueryTypes.SELECT }
    );

    // Últimos reportes
    const ultimos = await sequelize.query(
      `SELECT R.id_reporte, U.nombre, T.nombre_tipo, R.fecha_reporte
       FROM Reportes R
       INNER JOIN Usuario U ON U.id_usuario = R.FK_id_usuario
       INNER JOIN Tipo_reporte T ON T.id_tipo = R.FK_id_tipo
       ORDER BY R.fecha_reporte DESC
       LIMIT 10`,
      { type: QueryTypes.SELECT }
    );

    // Usuarios con más reportes
    const topUsuarios = await sequelize.query(
      `SELECT U.nombre, U.apellido, COUNT(*) AS total
       FROM Reportes R
       INNER JOIN Usuario U ON U.id_usuario = R.FK_id_usuario
       GROUP BY U.id_usuario
       ORDER BY total DESC
       LIMIT 5`,
      { type: QueryTypes.SELECT }
    );

    // Tendencia mensual
    const tendencia = await sequelize.query(
      `SELECT DATE_FORMAT(fecha_reporte, '%Y-%m') AS mes, COUNT(*) AS total
       FROM Reportes
       GROUP BY mes
       ORDER BY mes ASC`,
      { type: QueryTypes.SELECT }
    );

    return res.json({
      totalReportes: totalReportes[0],
      reportesPorTipo,
      ultimos,
      topUsuarios,
      tendencia
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error cargando dashboard de reportes" });
  }
};
