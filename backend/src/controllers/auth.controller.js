import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { User, Rol } from "../models/index.js";
import { generateToken } from "../utils/generateToken.js";

/* ==========================
   REGISTRO Y LOGIN
========================== */
export const register = async (req, res) => {
  try {
    const { nombre, apellido, correo, contraseña } = req.body;
    if (!nombre || !apellido || !correo || !contraseña)
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    if (typeof correo !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo))
      return res.status(400).json({ message: "El correo no es válido" });
    if (typeof contraseña !== "string" || contraseña.length < 8)
      return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres" });

    const normalizedEmail = correo.trim().toLowerCase();
    const existing = await User.findOne({ where: { correo: normalizedEmail } });
    if (existing) return res.status(400).json({ message: "El correo ya está registrado" });

    const hashed = await bcrypt.hash(contraseña, 10);
    const user = await User.create({ nombre: nombre.trim(), apellido: apellido.trim(), correo: normalizedEmail, contraseña: hashed });

    const rolCliente = await Rol.findOne({ where: { nombre_rol: "cliente" } });
    if (rolCliente) await user.addRol(rolCliente);

    const token = generateToken({
      id_usuario: user.id_usuario,
      nombre: user.nombre,
      correo: user.correo,
      rol: "cliente",
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      token,
      user: { id: user.id_usuario, nombre: user.nombre, correo: user.correo, rol: "cliente" },
    });
  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
    const user = await User.findOne({ where: { correo: correo.trim().toLowerCase() }, include: Rol });
    if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

    const valid = await bcrypt.compare(contraseña, user.contraseña);
    if (!valid) return res.status(401).json({ message: "Credenciales inválidas" });

    const roles = user.Rols?.map((r) => r.nombre_rol) || ["cliente"];
    const token = generateToken({
      id_usuario: user.id_usuario,
      nombre: user.nombre,
      correo: user.correo,
      rol: roles[0],
    });

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: { id: user.id_usuario, nombre: user.nombre, correo: user.correo, rol: roles[0] },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

/* ==========================
   RECUPERAR CONTRASEÑA
========================== */
export const forgotPassword = async (req, res) => {
  try {
    const { correo } = req.body;
    if (!correo) return res.status(400).json({ message: "El correo es obligatorio" });

    const user = await User.findOne({ where: { correo } });
    if (!user)
      return res.status(200).json({
        message: "Si el correo existe, se enviará un enlace para restablecer la contraseña",
      });

    const token = jwt.sign({ id_usuario: user.id_usuario }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    /*
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetUrl = ${baseUrl}/reset-password/${token};
    */

    // Crear transporte SMTP real
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || `Soporte AgroMarket <${process.env.SMTP_USER}>`,
      to: correo,
      subject: "Recuperación de contraseña - AgroMarket",
      html: `
        <p>Hola ${user.nombre},</p>
        <p>Has solicitado recuperar tu contraseña. Utiliza el siguiente token para restablecerla:</p>
        <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px; font-family: monospace; font-size: 14px; word-break: break-all;">
          <strong>Token:</strong><br>
          ${token}
        </div>
        <p><strong>Este token es válido por 15 minutos.</strong></p>
        <p>Para restablecer tu contraseña, deberás enviar una petición POST al endpoint correspondiente con este token.</p>
        <br>
        <p>Atentamente,<br>Equipo AgroMarket. </p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Correo enviado correctamente. Revisa tu bandeja de entrada o spam.",
    });
  } catch (error) {
    console.error("Error en forgotPassword:", error);
    res.status(500).json({ message: "Error al solicitar recuperación de contraseña" });
  }
};

/* ==========================
   RESTABLECER CONTRASEÑA
========================== */
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { nueva_contrasena } = req.body;

    if (!token || !nueva_contrasena)
      return res.status(400).json({ message: "Token y nueva contraseña son requeridos" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }
    const user = await User.findByPk(decoded.id_usuario);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (typeof nueva_contrasena !== "string" || nueva_contrasena.length < 8)
      return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres" });
    const hashed = await bcrypt.hash(nueva_contrasena, 10);
    user.contraseña = hashed;
    await user.save();

    res.status(200).json({ message: "Contraseña restablecida correctamente" });
  } catch (error) {
    console.error("Error en resetPassword:", error);
    res.status(500).json({ message: "Error al restablecer contraseña" });
  }
};


/* ==========================
   CAMBIAR CONTRASEÑA (auth)
========================== */
export const changePassword = async (req, res) => {
  try {
    const { contrasena_actual, nueva_contrasena, confirmar_contrasena } = req.body;
    const user = await User.findByPk(req.user.id_usuario);

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    if (!contrasena_actual || !nueva_contrasena || !confirmar_contrasena)
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    if (nueva_contrasena !== confirmar_contrasena)
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    if (nueva_contrasena.length < 8)
      return res.status(400).json({ message: "La nueva contraseña debe tener al menos 8 caracteres" });

    const match = await bcrypt.compare(contrasena_actual, user.contraseña);
    if (!match) return res.status(401).json({ message: "Contraseña actual incorrecta" });

    const hashed = await bcrypt.hash(nueva_contrasena, 10);
    user.contraseña = hashed;
    await user.save();

    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error en changePassword:", error);
    res.status(500).json({ message: "Error al cambiar la contraseña" });
  }
};