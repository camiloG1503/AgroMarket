import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try{
        await connectDB();
        app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
    }catch(error){
        console.error("Error al iniciar el servidor:", error.message);      
    }
};

startServer();