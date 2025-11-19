import { sequelize } from "../config/db";

import User from "./User.js";
import Rol from "./Rol.js";
import UsuarioRol from "./UsuarioRol.js";
import Marca from "./Marca.js";
import Producto from "./Producto.js";
import Categoria from "./Categoria.js";
import Tag from "./Tag.js"
import Carrito from "./Carrito.js";
import DetalleCarrito from "./DetalleCarrito.js";

// RELACIONES DE USUARIO / ROL
User.belongsToMany(Rol, { through: UsuarioRol, foreignKey: "FK_id_usuario" });
Rol.belongsToMany(User, { through: UsuarioRol, foreignKey: "FK_id_rol" });


// RELACIONES DE MARCA / PRODUCTO
Marca.hasMany(Producto, { foreignKey: "FK_id_marca" });
Producto.belongsTo(Marca, { foreignKey: "FK_id_marca" });

// Usuario 1 - N Carrito
Usuario.hasMany(Carrito, { foreignKey: "FK_id_usuario" });
Carrito.belongsTo(Usuario, { foreignKey: "FK_id_usuario" });

// Carrito 1 - N Detalle_carrito
Carrito.hasMany(DetalleCarrito, { foreignKey: "FK_id_carrito" });
DetalleCarrito.belongsTo(Carrito, { foreignKey: "FK_id_carrito" });

// Producto 1 - N Detalle_carrito
Producto.hasMany(DetalleCarrito, { foreignKey: "FK_id_producto" });
DetalleCarrito.belongsTo(Producto, { foreignKey: "FK_id_producto" });

export {
  User,
  Rol,
  UsuarioRol,
  Marca,
  Producto,
  Categoria,
  Tag,
  Carrito,
  DetalleCarrito,
};