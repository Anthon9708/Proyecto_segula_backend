const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Regla = sequelize.define('Regla', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cabecera: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fkDesencadenante: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'fk_desencadenante',
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
    tableName: 'reglas',
    timestamps: false,
});

module.exports = Regla;