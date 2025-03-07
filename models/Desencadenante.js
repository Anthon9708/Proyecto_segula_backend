const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Desencadenante = sequelize.define(
  "Desencadenante",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    codigo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    tabla: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "tabla_nombre",
    },
    consultaSql: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "consulta_sql",
    },
    fechaAlta: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "fecha_alta",
    },
    fechaBaja: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "fecha_baja",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "creado",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "modificado",
    },
  },
  {
    tableName: "desencadenantes",
    timestamps: true,
  }
);

module.exports = Desencadenante;
