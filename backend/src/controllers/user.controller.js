import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js";
import Rol from "../models/Rol.js";
import UsuarioRol from "../models/UsuarioRol.js";


/* ────────────────────────────────
   ACCIONES ADMINISTRATIVAS
──────────────────────────────── */

// Asignar rol a usuario
export const assignRole = async (req, res) => {
  try {
    const { id_usuario, nombre_rol } = req.body;

    if (!id_usuario || !nombre_rol)
      return res.status(400).json({ message: "Datos incompletos" });

    const user = await User.findByPk(id_usuario);
    const rol = await Rol.findOne({ where: { nombre_rol } });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    if (!rol) return res.status(404).json({ message: "Rol no encontrado" });

    await UsuarioRol.destroy({ where: { FK_id_usuario: id_usuario } });
    await UsuarioRol.create({ FK_id_usuario: id_usuario, FK_id_rol: rol.id_rol });

    res.status(200).json({
      message: `Rol '${nombre_rol}' asignado correctamente al usuario ${user.correo}`,
    });
  } catch (error) {
    console.error("Error en assignRole:", error);
    res.status(500).json({ message: "Error al asignar el rol" });
  }
};

// Listar usuarios (solo admin)
export const listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id_usuario", "nombre", "apellido", "correo", "foto_perfil"],
      include: [
        {
          model: Rol,
          through: { attributes: [] },
          attributes: ["nombre_rol"],
        },
      ],
    });
    res.json(users);
  } catch (error) {
    console.error("Error listUsers:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

// Eliminar cuenta de usuario (solo admin)
export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    // Solo el admin puede eliminar cuentas
    if (req.user.rol !== "admin") {
      return res.status(403).json({ message: "Acceso denegado. Solo el administrador puede eliminar cuentas." });
    }

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.destroy();
    res.status(200).json({ message: `Cuenta del usuario '${user.correo}' eliminada correctamente` });
  } catch (error) {
    console.error("Error deleteAccount:", error);
    res.status(500).json({ message: "Error al eliminar cuenta" });
  }
};

/* ────────────────────────────────
   ACCIONES DEL USUARIO
──────────────────────────────── */

// Ver perfil
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id_usuario, {
      attributes: ["id_usuario", "nombre", "apellido", "correo", "foto_perfil"],
      include: [
        {
          model: Rol,
          through: { attributes: [] },
          attributes: ["nombre_rol"],
        },
      ],
    });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getUserProfile:", error);
    res.status(500).json({ message: "Error al obtener perfil" });
  }
};

// Actualizar perfil
export const updateProfile = async (req, res) => {
  try {
    const { nombre, apellido } = req.body;

    if (!nombre?.trim() || !apellido?.trim()) {
      return res.status(400).json({ message: "Nombre y apellido son obligatorios" });
    }
    const user = await User.findByPk(req.user.id_usuario);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.update({ nombre, apellido });
    res.status(200).json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    console.error("Error updateProfile:", error);
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
};

// Subir foto de perfil
export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Debe adjuntar una imagen" });
    const user = await User.findByPk(req.user.id_usuario);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Eliminar imagen anterior si existe
    if (user.foto_perfil) {
      const oldPath = path.join("src/uploads/usuarios", user.foto_perfil);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    // Guardar la nueva imagen
    user.foto_perfil = req.file.filename;
    await user.save();

    res.json({
      message: "Foto de perfil actualizada",
      foto_perfil: user.foto_perfil,
    });
  } catch (error) {
    console.error("uploadProfilePicture error:", error);
    res.status(500).json({ message: "Error al subir imagen" });
  }
};