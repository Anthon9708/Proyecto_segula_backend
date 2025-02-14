const express = require('express');
const sequelize = require('./config/database');
const routes = require('./routes/routes');
const cors = require('cors');
const conexionBD = require('./bd/ConexionBD');

const app = express();
const port = 3000;
app.use(cors({
    origin: 'http://localhost:5173'
  }));

app.use(express.json());
app.use('/', routes);

conexionBD(sequelize,app,port);