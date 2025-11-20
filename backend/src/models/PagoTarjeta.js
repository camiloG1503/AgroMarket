import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const PagoTarjeta = sequelize.define(
  "PagoTarjeta",
  {
    id_tarjeta: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    FK_id_pago: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    nombre_titular: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    numero_tarjeta: { 
        type: DataTypes.STRING(20), 
        allowNull: false 
    },
    tipo_tarjeta: { 
        type: DataTypes.STRING(50) 
    },
    franquicia: { 
        type: DataTypes.STRING(50) 
    },
    CVV: { 
        type: DataTypes.STRING(4) 
    },
    fecha_vencimiento: { 
        type: DataTypes.DATE, 
        allowNull: false 
    },
  },
  {
    tableName: "Pago_tarjeta",
    timestamps: false,
  }
);

export default PagoTarjeta;
