import bcrypt from "bcrypt";
import User from "../models/User.js";
import Rol from "../models/Rol.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { nombre, apellido, correo, contraseña } = req.body;

    const existingUser = await User.findOne({ where: { correo } });
    if (existingUser) return res.status(400).json({ message: "El correo ya está registrado" });

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const user = await User.create({ nombre, apellido, correo, contraseña: hashedPassword });

    const rolCliente = await Rol.findOne({ where: { nombre_rol: "cliente" } });
    await user.addRol(rolCliente);

    const token = generateToken({ ...user.dataValues, rol: "cliente" });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      token,
      user: { id: user.id_usuario, nombre: user.nombre, correo: user.correo, rol: "cliente" },
    });
  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({ message: "Error en el registro" });
  }
};

export const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const user = await User.findOne({ where: { correo }, include: Rol });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

    const roles = user.Rols?.map((r) => r.nombre_rol) || ["cliente"];
    const token = generateToken({ ...user.dataValues, rol: roles[0] });

    res.json({
      message: "Login exitoso",
      token,
      user: { id: user.id_usuario, nombre: user.nombre, correo: user.correo, rol: roles[0] },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
