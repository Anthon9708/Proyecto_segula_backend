const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Log = sequelize.define('Log', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    activos: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    posiciones: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fkDesencadenante: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'fk_desencadenante',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'creado',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'modificado',
    }
},{
    tableName: 'log',
    timestamps: true,
});

module.exports = Log;