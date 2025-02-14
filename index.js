const express = require('express');
const sequelize = require('./config/database');
const Dato = require('./models/Dato');
const { obtenerDatos, obtenerDatoPorId } = require('./controllers/DatoController');
const conexionBD = require('./bd/ConexionBD');

const app = express();
const port = 3000;
app.use(express.json());

app.get('/datos', obtenerDatos);
app.get('/datos/:id', obtenerDatoPorId);


conexionBD(sequelize,app,port);