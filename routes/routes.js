const express = require('express');
const { obtenerDatos, obtenerDatoPorId } = require('../controllers/DatoController');
const { obtenerDatosMaestros, obtenerDatoMaestroPorId } = require('./controllers/DatoMaestroController');
const { obtenerReglas, obtenerReglaPorId } = require('../controllers/ReglaController');
const { obtenerDesencadenantes, obtenerDesencadenantePorId } = require('../controllers/DesencadenanteController');
const router = express.Router();

router.get('/datos', obtenerDatos);
router.get('/datos/:id', obtenerDatoPorId);

router.get('/datosmaestros', obtenerDatosMaestros);
router.get('/datosmaestros/:id', obtenerDatoMaestroPorId);

router.get('/reglas', obtenerDatosMaestros);
router.get('/reglas/:id', obtenerDatoMaestroPorId);

router.get('/desencadenantes', obtenerDesencadenantes);
router.get('/desencadenantes/:id', obtenerDesencadenantePorId);

module.exports = router;