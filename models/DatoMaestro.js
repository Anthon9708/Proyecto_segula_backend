const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DatoMaestro = sequelize.define('DatoMaestro', {
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
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nombre',
    },
    tipoDato: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'tipo_dato',
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
    tableName: 'datos_maestros',
    timestamps: true,
});

module.exports = DatoMaestro;