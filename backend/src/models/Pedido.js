import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Pedido = sequelize.define(
  "Pedido",
  {
    id_pedido: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    FK_id_usuario: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    tipo_entrega: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    fecha_pedido: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    },
    FK_id_empresa: { 
        type: DataTypes.INTEGER, 
        allowNull: true 
    },
    FK_id_cupon: { 
        type: DataTypes.INTEGER, 
        allowNull: true 
    },

    estado: { 
        type: DataTypes.STRING(50), 
        defaultValue: "pendiente" 
    },

    subtotal: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    },

    descuento_total: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false, 
        defaultValue: 0.0 
    },

    total: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    },

    codigo_transaccion: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true
    }
  },
  {
    tableName: "Pedido",
    timestamps: false,
  }
);

export default Pedido;
