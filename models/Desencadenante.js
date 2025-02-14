const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Desencadenante = sequelize.define('Desencadenante', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaAlta: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'fecha_alta',
    },
    fechaBaja: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'fecha_baja',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'creado',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'modificado',
    }
},{
    tableName: 'desencadenantes',
    timestamps: true,
});

module.exports = Desencadenante;