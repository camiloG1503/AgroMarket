import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Importar rutas
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import marcaRoutes from "./routes/marca.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";
import tagRoutes from "./routes/tag.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import cuponRoutes from "./routes/cupon.routes.js";
import pedidoRoutes from "./routes/pedido.routes.js";
import direccionRoutes from "./routes/direccion.routes.js";
import favoritosRoutes from "./routes/favoritos.routes.js";
import pagoRoutes from "./routes/pago.routes.js";
import dashboardRoutes from "./routes/dashboard.admin.routes.js";
import dashboardEmpleadoRoutes from "./routes/dashboard.empleado.routes.js";
import dashboardReportesRoutes from "./routes/dashboard.reportes.routes.js";
import dashboardUserRoutes from "./routes/dashboard.user.routes.js";
import resenaRoutes from "./routes/resena.routes.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/marcas", marcaRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", cuponRoutes);
app.use("/api/orders", pedidoRoutes);
app.use("/api/addresses", direccionRoutes);
app.use("/api/favorites", favoritosRoutes);
app.use("/api/payments", pagoRoutes);
app.use("/api/reviews", resenaRoutes);


// Rutas Dashboard Admin, Usuario, Empleado y Reportes
app.use("/api/dashboard/admin", dashboardRoutes);
app.use("/api/dashboard/user", dashboardUserRoutes);
app.use("/api/dashboard/empleado", dashboardEmpleadoRoutes);
app.use("/api/dashboard/reportes", dashboardReportesRoutes);


// Servir imágenes (usuarios + productos)
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "src/uploads"))
);

app.get("/", (req, res) => {
  res.send("AgroMarket Backend funcionando correctamente");
});

export default app;