import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js";
import marcaRoutes from "./routes/marca.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";
import tagRoutes from "./routes/tag.routes.js";



dotenv.config(); 

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/marcas", marcaRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/tags", tagRoutes);
// Ruta para servir archivos estáticos (imágenes de perfil)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("AgroMarket Backend funcionando correctamente");
});

export default app;