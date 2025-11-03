import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Rol = sequelize.define("Rol",
  {
    id_rol: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_rol: {
      type: DataTypes.ENUM("admin", "empleado", "cliente"),
      allowNull: false,
      unique: true,
    },
    descripcion: DataTypes.STRING,
  },
  {
    tableName: "Rol",
    timestamps: false,
  }
);

export default Rol;