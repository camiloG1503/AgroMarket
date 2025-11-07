import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
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

// Recuperar contraseña
export const forgotPassword = async (req, res) => {
  try {
    const { correo } = req.body;
    console.log('[forgotPassword] called with correo:', correo);
    console.log('[forgotPassword] NODE_ENV=', process.env.NODE_ENV, 'BASE_URL=', process.env.BASE_URL || process.env.FRONTEND_URL);
    if (!correo) return res.status(400).json({ message: "El correo es requerido" });

  const user = await User.findOne({ where: { correo } });
  // Evitar enumeración de usuarios: responder siempre 200
  if (!user) return res.status(200).json({ message: "Si el correo existe, se ha enviado un enlace para restablecer la contraseña" });

    // Verificar que JWT_SECRET esté configurado
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET no está configurado en el .env");
      return res.status(500).json({ message: "Error interno: JWT no configurado" });
    }

    // Generar token JWT con expiración corta (15 minutos)
    const token = jwt.sign({ id_usuario: user.id_usuario }, process.env.JWT_SECRET, { expiresIn: "15m" });

  const baseUrl = process.env.BASE_URL || process.env.FRONTEND_URL || "http://localhost:5173";
  // Enlace al endpoint de reset del backend
  const resetUrl = `${baseUrl}/api/auth/reset-password/${token}`;

    // enviar correo si hay configuración SMTP/EMAIL, si no, loguear la URL en consola
    const smtpHost = process.env.SMTP_HOST || process.env.EMAIL_HOST;
    const smtpPort = process.env.SMTP_PORT || process.env.EMAIL_PORT;
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
    const smtpSecure = (process.env.SMTP_SECURE || process.env.EMAIL_SECURE) === "true";
    const mailFrom = process.env.SMTP_FROM || process.env.EMAIL_FROM || (smtpUser ? `AgroMarket <${smtpUser}>` : null);

    if (process.env.NODE_ENV === "development") {
      // En modo desarrollo devolver el token y enlace para pruebas locales (no enviar correo)
      return res.status(200).json({
        message: "Modo desarrollo: usa este enlace para restablecer la contraseña",
        resetLink: resetUrl,
        token,
      });
    }

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort ? Number(smtpPort) : 587,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: mailFrom,
        to: correo,
        subject: "Recuperación de contraseña - AgroMarket",
        html: `<p>Has solicitado recuperar tu contraseña. Haz clic en el siguiente enlace para restablecerla (válido 15 minutos):</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
      };

      await transporter.sendMail(mailOptions);
    } else {
      // En desarrollo: mostrar la URL en consola para que el frontend o QA la use.
      console.log("[forgotPassword] Reset URL:", resetUrl);
    }

    res.json({ message: "Si el correo existe, se ha enviado un enlace para restablecer la contraseña" });
  } catch (error) {
    console.error("Error en forgotPassword:", error?.stack || error);
    res.status(500).json({ message: "Error al solicitar recuperación de contraseña" });
  }
};

// Restablecer contraseña con token
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    console.log("🔐 resetPassword - token recibido:", !!token);

    // Aceptar múltiples nombres de campo para la nueva contraseña
    const nueva_contrasena = req.body.nueva_contrasena || req.body.password || req.body.newPassword || req.body.contrasena || req.body.contrasena_nueva;
    console.log("📥 Body recibido:", req.body);

    if (!nueva_contrasena) {
      console.warn("⚠️ resetPassword - falta nueva contraseña en body");
      return res.status(400).json({ message: "Datos incompletos" });
    }

    if (!token) {
      console.warn("⚠️ resetPassword - token ausente en params");
      return res.status(400).json({ message: "Token requerido" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("❌ resetPassword - token inválido/expirado:", err.message);
      return res.status(401).json({ message: "Token inválido o expirado" });
    }

    const user = await User.findByPk(decoded.id_usuario);
    if (!user) {
      console.warn("⚠️ resetPassword - usuario no encontrado con id:", decoded.id_usuario);
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const hashedPassword = await bcrypt.hash(nueva_contrasena, 10);
    // Modelo usa la propiedad 'contraseña'
    user.contraseña = hashedPassword;
    await user.save();

    console.log("✅ resetPassword - contraseña actualizada para usuario id:", user.id_usuario);
    return res.status(200).json({ message: "Contraseña restablecida correctamente" });
  } catch (error) {
    console.error("❌ Error en resetPassword:", error?.stack || error);
    return res.status(500).json({ message: "Error al restablecer la contraseña" });
  }
};


// Cambiar contraseña para usuarios autenticados
export const changePassword = async (req, res) => {
  try {
    // Aceptar múltiples nombres de campo para flexibilidad
    const actual = req.body.actual || req.body.contrasena_actual || req.body.contrasenaActual || req.body.contrasena || req.body.currentPassword || req.body.contrasena_actual;
    const nueva = req.body.nueva || req.body.nueva_contrasena || req.body.newPassword || req.body.password;
    const confirmar = req.body.confirmar || req.body.confirm || req.body.confirmPassword || req.body.confirmar_contrasena;

    // Obtener id de usuario desde verifyToken (req.user) o desde el header Authorization
    let id_usuario = req.user?.id || req.user?.id_usuario;
    if (!id_usuario) {
      const authHeader = req.headers.authorization || req.headers.Authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado o inválido" });
      }
      const token = authHeader.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        id_usuario = decoded.id_usuario || decoded.id || decoded.ID || null;
      } catch (err) {
        return res.status(401).json({ message: "Token inválido o expirado" });
      }
    }

    if (!id_usuario) return res.status(401).json({ message: "No autorizado" });

    // Validaciones de campos
    if (!actual || !nueva || !confirmar) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (nueva !== confirmar) {
      return res.status(400).json({ message: "Las contraseñas nuevas no coinciden" });
    }

    if (actual === nueva) {
      return res.status(400).json({ message: "La nueva contraseña no puede ser igual a la actual" });
    }

    const user = await User.findByPk(id_usuario);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Comparar contraseña actual
    const coincide = await bcrypt.compare(actual, user.contraseña);
    if (!coincide) return res.status(400).json({ message: "La contraseña actual es incorrecta" });

    const hashed = await bcrypt.hash(nueva, 10);
    user.contraseña = hashed;
    await user.save();

    return res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("❌ Error en changePassword:", error?.stack || error);
    return res.status(500).json({ message: "Error al cambiar la contraseña" });
  }
};
