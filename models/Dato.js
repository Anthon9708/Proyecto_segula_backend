const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const DatoMaestro = require('./DatoMaestro');
const Regla = require('./Regla');

const Dato = sequelize.define('Dato', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  regla: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'fk_regla',
  },
  datoMaestro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'fk_dato_maestro',
  },
  orden: {
    type: DataTypes.INTEGER,
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
    allowNull: true,
    field: 'creado',
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'modificado',
  }
},{
  tableName: 'datos',
  timestamps: true,
});

Dato.belongsTo(Regla, { foreignKey: 'regla' });
Dato.belongsTo(DatoMaestro, { foreignKey: 'datoMaestro' });

module.exports = Dato;