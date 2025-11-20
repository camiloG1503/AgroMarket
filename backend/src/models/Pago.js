import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Pago = sequelize.define(
  "Pago",
  {
    id_pago: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    FK_id_pedido: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    total: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    },
    efectivo: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    estado_pago: { 
        type: DataTypes.STRING(50), 
        allowNull: true 
    },
  },
  {
    tableName: "Pago",
    timestamps: false,
  }
);

export default Pago;
