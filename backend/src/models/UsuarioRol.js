import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./User.js"
import Rol from "./Rol.js";

const UsuarioRol = sequelize.define("Usuario_Rol", {
    id_usuario_rol: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    FK_id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    FK_id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: "Usuario_Rol",
    timestamps: false,
});

User.belongsToMany(Rol, {through: UsuarioRol, foreignKey: "FK_id_usuario"});
Rol.belongsToMany(User, {through: UsuarioRol, foreignKey: "FK_id_rol"});


export default UsuarioRol;