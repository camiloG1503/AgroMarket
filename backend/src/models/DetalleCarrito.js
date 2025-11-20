import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const DetalleCarrito = sequelize.define(
  "Detalle_carrito",
  {
    id_detalle_carrito: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FK_id_carrito: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    FK_id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    fecha_agregado: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Detalle_carrito",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["FK_id_carrito", "FK_id_producto"],
      },
    ],
  }
);

export default DetalleCarrito;
