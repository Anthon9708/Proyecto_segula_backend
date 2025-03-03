const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('iolocate_segula', 'segula', 'root', {
  host: '192.168.10.113',
  //host: '127.0.0.1',
  port: '3306',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;