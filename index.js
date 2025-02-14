const express = require('express');
const sequelize = require('./config/database');
const routes = require('./routes/routes');
const conexionBD = require('./bd/ConexionBD');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', routes);

conexionBD(sequelize,app,port);