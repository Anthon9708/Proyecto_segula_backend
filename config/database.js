const { Sequelize } = require("sequelize");

/**
 * Configuración de la conexión a la base de datos utilizando Sequelize.
 *
 * @constant {Sequelize} sequelize - La instancia de Sequelize configurada para la conexión a la base de datos.
 */
const sequelize = new Sequelize("iolocate_segula", "root", "root", {
  //host: '192.168.10.113',
  host: "localhost",
  port: "3306",
  dialect: "mysql",
  logging: false,
  timezone: "+01:00",
});

module.exports = sequelize;
