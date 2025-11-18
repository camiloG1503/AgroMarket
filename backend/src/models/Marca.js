import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Marca = sequelize.define(
  "Marca",
  {
    id_marca: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_marca: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion_marca: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    calificacion_promedio: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true,
      defaultValue: 0.0,
    },
  },
  {
    tableName: "Marca",
    timestamps: false,
  }
);

export default Marca;
