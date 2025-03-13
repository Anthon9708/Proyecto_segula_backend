const express = require("express");
const sequelize = require("./config/database");
require("dotenv").config();
const routes = require("./routes/routes");
const cors = require("cors");
const conexionBD = require("./bd/ConexionBD");
const MainController = require("./controllers/MainController");

const app = express();
const port = process.env.PORT;

// Configuración de CORS para permitir solicitudes desde 'http://localhost:5173'
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Middleware para parsear solicitudes JSON
app.use(express.json());

// Configuración de las rutas de la aplicación
app.use("/", routes);

// Establecer la conexión con la base de datos y sincronizarla
conexionBD(sequelize, app, port);

// Inicializar el controlador principal
MainController.init();
