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
      { nombre: "Bairon", apellido: "Gomez", correo: "baironG@agromarket.com", contraseña: "admin123", rol: "admin" },
      { nombre: "Emerson", apellido: "Chara", correo: "emersonC@agromarket.com", contraseña: "empleado123", rol: "empleado" },
      { nombre: "Jason", apellido: "Ibarguen", correo: "jasonI@agromarket.com", contraseña: "cliente123", rol: "cliente" },
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

    console.log("Seed completado correctamente");
    process.exit(0);
  } catch (error) {
    console.error("Error al insertar usuarios:", error);
    process.exit(1);
  }
};

seedUsers();
