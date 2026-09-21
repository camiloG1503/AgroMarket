import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import { User, Rol } from "../models/index.js";

dotenv.config();

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

    const users = [{ nombre: "Bairon", apellido: "Gomez", correo: process.env.SEED_ADMIN_EMAIL, contraseña: process.env.SEED_ADMIN_PASSWORD, rol: "admin" }
      ,
    { nombre: "Emerson", apellido: "Chara", correo: process.env.SEED_EMPLOYEE_EMAIL, contraseña: process.env.SEED_EMPLOYEE_PASSWORD, rol: "empleado" },
    { nombre: "Jason", apellido: "Ibarguen", correo: process.env.SEED_CLIENT_EMAIL, contraseña: process.env.SEED_CLIENT_PASSWORD, rol: "cliente" },
    ];

    for (const u of users) {
      if (!u.correo || !u.contraseña) throw new Error("Faltan variables SEED_*_EMAIL/SEED_*_PASSWORD");
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
