import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const DetallePedido = sequelize.define(
  "Detalle_pedido",
  {
    id_detalle: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    FK_id_pedido: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    FK_id_producto: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    cantidad: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    precio_unitario: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    },
    subtotal: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    }
  },
  {
    tableName: "Detalle_pedido",
    timestamps: false,
  }
);

export default DetallePedido;
