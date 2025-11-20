import User from "./User.js";
import Rol from "./Rol.js";
import UsuarioRol from "./UsuarioRol.js";
import Marca from "./Marca.js";
import Producto from "./Producto.js";
import Categoria from "./Categoria.js";
import Tag from "./Tag.js";
import Pedido from "./Pedido.js";
import DetallePedido from "./DetallePedido.js";
import Carrito from "./Carrito.js";
import DetalleCarrito from "./DetalleCarrito.js";
import Cupon from "./Cupon.js";
import Direccion from "./Direccion.js";
import Favorito from "./Favoritos.js";
import Resena from "./Resena.js";

// USUARIO - ROL
User.belongsToMany(Rol, { through: UsuarioRol, foreignKey: "FK_id_usuario" });
Rol.belongsToMany(User, { through: UsuarioRol, foreignKey: "FK_id_rol" });


// MARCA - PRODUCTO
Marca.hasMany(Producto, { foreignKey: "FK_id_marca" });
Producto.belongsTo(Marca, { foreignKey: "FK_id_marca" });


// USUARIO - CARRITO
User.hasMany(Carrito, { foreignKey: "FK_id_usuario" });
Carrito.belongsTo(User, { foreignKey: "FK_id_usuario" });


// CARRITO - DETALLE
Carrito.hasMany(DetalleCarrito, { foreignKey: "FK_id_carrito" });
DetalleCarrito.belongsTo(Carrito, { foreignKey: "FK_id_carrito" });

Producto.hasMany(DetalleCarrito, { foreignKey: "FK_id_producto" });
DetalleCarrito.belongsTo(Producto, { foreignKey: "FK_id_producto" });


// PRODUCTO - TAG (tu MER real: Producto_Tag)
Producto.belongsToMany(Tag, { through: "Producto_Tag", foreignKey: "FK_id_producto" });
Tag.belongsToMany(Producto, { through: "Producto_Tag", foreignKey: "FK_id_tag" });


// USUARIO - PEDIDO
User.hasMany(Pedido, { foreignKey: "FK_id_usuario" });
Pedido.belongsTo(User, { foreignKey: "FK_id_usuario" });


// PEDIDO - DETALLE
Pedido.hasMany(DetallePedido, { foreignKey: "FK_id_pedido" });
DetallePedido.belongsTo(Pedido, { foreignKey: "FK_id_pedido" });

Producto.hasMany(DetallePedido, { foreignKey: "FK_id_producto" });
DetallePedido.belongsTo(Producto, { foreignKey: "FK_id_producto" });


// CUPON - PEDIDO
Cupon.hasMany(Pedido, { foreignKey: "FK_id_cupon" });
Pedido.belongsTo(Cupon, { foreignKey: "FK_id_cupon" });

// USUARIO - DIRECCION
User.hasMany(Direccion, { foreignKey: "FK_id_usuario" });
Direccion.belongsTo(User, { foreignKey: "FK_id_usuario" });

// FAVORITOS - USUARIO / PRODUCTO
User.hasMany(Favorito, { foreignKey: "FK_id_usuario" });
Favorito.belongsTo(User, { foreignKey: "FK_id_usuario" });

Producto.hasMany(Favorito, { foreignKey: "FK_id_producto" });
Favorito.belongsTo(Producto, { foreignKey: "FK_id_producto" });

// USUARIO - RESEÑA / PRODUCTO - RESEÑA
// Producto 1 - N Reseñas
Producto.hasMany(Resena, { foreignKey: "FK_id_producto" });
Resena.belongsTo(Producto, { foreignKey: "FK_id_producto" });

// Usuario 1 - N Reseñas
User.hasMany(Resena, { foreignKey: "FK_id_usuario" });
Resena.belongsTo(User, { foreignKey: "FK_id_usuario" });


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
  Pedido,
  DetallePedido,
  Cupon,
  Direccion,
  Favorito,
};
