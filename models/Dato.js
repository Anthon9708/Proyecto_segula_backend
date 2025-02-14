const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dato = sequelize.define('Dato', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
    field: 'creado',
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'modificado',
  }
},{
  tableName: 'datos',
  timestamps: true,
});

module.exports = Dato;