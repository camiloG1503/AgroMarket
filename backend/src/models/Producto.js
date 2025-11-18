import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Producto = sequelize.define(
  "Producto",
  {
    id_producto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },

    especificaciones: { 
      type: DataTypes.TEXT, 
      allowNull: true 
    },

    precio: { 
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false 
    },

    descuento: { 
      type: DataTypes.DECIMAL(5, 2), 
      defaultValue: 0.0 
    },

    stock: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      defaultValue: 0 
    },

    FK_id_categoria: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },

    FK_id_marca: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },

    imagen_principal: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "Producto",
    timestamps: false,
  }
);

export default Producto;
