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
  },
  fechaBaja: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  fkRegla: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fkDatoMaestro: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
  tableName: 'datos'
});

module.exports = Dato;