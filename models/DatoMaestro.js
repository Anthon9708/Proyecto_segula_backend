const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DatoMaestro = sequelize.define('DatoMaestro', {
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
    idActivo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'id_activo',
    },
    tipoEvento: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'tipo_evento',
    },
    posicionX: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'posicion_x',
    },
    posicionY: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'posicion_y',
    },
    geofencing: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    layout: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    baliza: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tablaOrigen: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'tabla_origen',
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
},{
    tableName: 'datos_maestros',
    timestamps: false,
});

module.exports = DatoMaestro;