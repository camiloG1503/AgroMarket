import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Direccion = sequelize.define(
  "Direccion",
  {
    id_direccion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FK_id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    barrio: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ciudad: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    departamento: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  },
  {
    tableName: "Direccion",
    timestamps: false,
  }
);

export default Direccion;
