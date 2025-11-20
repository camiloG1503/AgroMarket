import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Cupon = sequelize.define(
    "Cupon",
    {
        id_cupon: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        descripcion: DataTypes.TEXT,
        porcentaje_descuento: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING(50),
            defaultValue: "activo", // activo | inactivo | vencido
        },
    },
    {
        tableName: "Cupon",
        timestamps: false,
    }
);

export default Cupon;
