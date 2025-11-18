import { sequelize } from "../config/db";

import User from "./User.js";
import Rol from "./Rol.js";
import UsuarioRol from "./UsuarioRol.js";
import Marca from "./Marca.js";
import Producto from "./Producto.js";
import Categoria from "./Categoria.js";
import Tag from "./Tag.js"

// RELACIONES DE USUARIO / ROL
User.belongsToMany(Rol, { through: UsuarioRol, foreignKey: "FK_id_usuario" });
Rol.belongsToMany(User, { through: UsuarioRol, foreignKey: "FK_id_rol" });


// RELACIONES DE MARCA / PRODUCTO
Marca.hasMany(Producto, { foreignKey: "FK_id_marca" });
Producto.belongsTo(Marca, { foreignKey: "FK_id_marca" });

export {
  User,
  Rol,
  UsuarioRol,
  Marca,
  Producto,
  Categoria,
  Tag
};