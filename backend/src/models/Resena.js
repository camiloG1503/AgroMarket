// models/Resena.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Resena = sequelize.define(
  "Reseña",
  {
    id_reseña: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FK_id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    FK_id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    calificacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 }
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fecha_reseña: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Reseña",
    timestamps: false,
  }
);

export default Resena;
