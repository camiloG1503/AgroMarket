import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        logging: false,
    }
);

export const connectDB = async() => {
    try{
        await sequelize.authenticate();
        await ensureSchema();
        console.log("Conexion a MySQL exitosamente"); 
    }catch(error){
        console.error("Error al conectar a la bases de datos", error);
        throw error
    }
};

const ensureSchema = async () => {
    const columns = [
        ["Producto", "imagen_principal", "VARCHAR(255) NULL"],
        ["Pedido", "estado", "VARCHAR(50) NOT NULL DEFAULT 'pendiente'"],
        ["Pedido", "subtotal", "DECIMAL(10,2) NOT NULL DEFAULT 0"],
        ["Pedido", "descuento_total", "DECIMAL(10,2) NOT NULL DEFAULT 0"],
        ["Pedido", "total", "DECIMAL(10,2) NOT NULL DEFAULT 0"],
        ["Pedido", "codigo_transaccion", "VARCHAR(100) NULL"],
    ];

    for (const [table, column, definition] of columns) {
        const [rows] = await sequelize.query(`SHOW COLUMNS FROM \`${table}\` LIKE ?`, {
            replacements: [column],
        });
        if (!rows.length) {
            await sequelize.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}`);
        }
    }
};
