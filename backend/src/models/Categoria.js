import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Categoria = sequelize.define(
  "Categoria",
  {
    id_categoria: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_categoria: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion_categoria: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    tableName: "Categoria",
    timestamps: false,
  }
);

export default Categoria;
