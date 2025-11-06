import User from "../models/User.js";
import Rol from "../models/Rol.js";
import UsuarioRol from "../models/UsuarioRol.js";

export const assignRole = async (req, res) => {
  try {
    const { id_usuario, nombre_rol } = req.body;

    if (!id_usuario || !nombre_rol) return res.status(400).json({ message: "Datos incompletos" });

    const user = await User.findByPk(id_usuario);
    const rol = await Rol.findOne({ where: { nombre_rol } });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    if (!rol) return res.status(404).json({ message: "Rol no encontrado" });

    await UsuarioRol.destroy({ where: { FK_id_usuario: id_usuario } });
    await UsuarioRol.create({ FK_id_usuario: id_usuario, FK_id_rol: rol.id_rol });

    res.status(200).json({ message: `Rol '${nombre_rol}' asignado correctamente al usuario ${user.correo}` });
  } catch (error) {
    console.error("Error en assignRole:", error);
    res.status(500).json({ message: "Error al asignar el rol" });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id_usuario", "nombre", "correo", "foto_perfil"],
      include: [
        {
          model: Rol,
          through: { attributes: [] },
          attributes: ["nombre_rol"]
        }
      ]
    });
    res.json(users);
  } catch (error) {
    console.error("Error listUsers:", error);
    res.status(500).json({ message: "Error interno" });
  }
};
