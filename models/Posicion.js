const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Posicion = sequelize.define('Posicion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idActivo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'fk_activo',
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitud: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    longitud: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    geofencing: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'fk_geofencing',
    },
    layout: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'fk_layout',
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
      allowNull: true,
      field: 'creado',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'modificado',
    }
},{
    tableName: 'posiciones',
    timestamps: true,
});

module.exports = Posicion;