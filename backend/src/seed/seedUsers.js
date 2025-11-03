import bcrypt from "bcrypt";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Rol from "../models/Rol.js";
import UsuarioRol from "../models/UsuarioRol.js";

const seedUsers = async () => {
  try {
    await connectDB();

    const roles = ["admin", "empleado", "cliente"];
    for (const nombre_rol of roles) {
      await Rol.findOrCreate({
        where: { nombre_rol },
        defaults: { descripcion: `Rol ${nombre_rol}` },
      });
    }

    const users = [
      { nombre: "Admin", apellido: "Principal", correo: "admin@agromarket.com", contraseña: "admin123", rol: "admin" },
      { nombre: "Empleado", apellido: "Perez", correo: "empleado@agromarket.com", contraseña: "empleado123", rol: "empleado" },
      { nombre: "Cliente", apellido: "Gomez", correo: "cliente@agromarket.com", contraseña: "cliente123", rol: "cliente" },
    ];

    for (const u of users) {
      const hashedPassword = await bcrypt.hash(u.contraseña, 10);
      const [user] = await User.findOrCreate({
        where: { correo: u.correo },
        defaults: { nombre: u.nombre, apellido: u.apellido, contraseña: hashedPassword },
      });

      const rol = await Rol.findOne({ where: { nombre_rol: u.rol } });
      await user.addRol(rol);
    }

    console.log("🌱 Seed completado correctamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al insertar usuarios:", error);
    process.exit(1);
  }
};

seedUsers();
