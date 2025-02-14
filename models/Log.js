const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Log = sequelize.define('Log', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    origen: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'origen',
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'fecha',
    },
    fkDesencadenante: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'fk_desencadenante',
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
    tableName: 'activos',
    timestamps: true,
});

module.exports = Log;