import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try{
        await connectDB();
        const server = app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

        process.on('unhandledRejection', (reason, promise) => {
            console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        });

        process.on('uncaughtException', (err) => {
            console.error('Uncaught Exception:', err);
        });

        // Graceful shutdown on SIGINT/SIGTERM
        const shutdown = () => {
            console.log('Cerrando servidor...');
            server.close(() => {
                console.log('Servidor cerrado');
                process.exit(0);
            });
        };
        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    }catch(error){
        console.error("Error al iniciar el servidor:", error.message);      
    }
};

startServer();