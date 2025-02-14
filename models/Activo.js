const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Activo = sequelize.define('Activo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombreActivo: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nombre_activo',
    },
    numeroSerie: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'numero_serie',
    },
    tipoActivo: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'tipo_activo',
    },
    tipoDispositivo: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'tipo_dispositivo',
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'estado',
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

module.exports = Activo;