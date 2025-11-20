import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Favorito = sequelize.define(
  "Favoritos",
  {
    id_favorito: {
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
    }
  },
  {
    tableName: "Favoritos",
    timestamps: false,
  }
);

export default Favorito;
