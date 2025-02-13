const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dato = sequelize.define('Dato', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  campo: {
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
  fkRegla: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'fk_regla',
  },
  fkDatoMaestro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'fk_dato_maestro',
  },
},{
  tableName: 'datos',
  timestamps: false,
});

module.exports = Dato;