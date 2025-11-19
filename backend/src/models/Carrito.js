import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Carrito = sequelize.define(
  "Carrito",
  {
    id_carrito: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FK_id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_agregado: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    estado: {
      type: DataTypes.STRING(50),
      defaultValue: "activo",
    },
  },
  {
    tableName: "Carrito",
    timestamps: false,
  }
);

export default Carrito;
