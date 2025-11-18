import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Tag = sequelize.define(
  "Tag",
  {
    id_tag: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_tag: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    }
  },
  {
    tableName: "Tag",
    timestamps: false,
  }
);

export default Tag;
