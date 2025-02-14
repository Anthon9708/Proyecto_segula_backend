const express = require('express');
const DatoController = require('../controllers/DatoController');
const DatoMaestroController = require('../controllers/DatoMaestroController');
const ReglaController = require('../controllers/ReglaController');
const DesencadenanteController = require('../controllers/DesencadenanteController');
const router = express.Router();

router.get('/datos', DatoController.getAll);
router.get('/datos/:id', DatoController.getById);

router.get('/datosmaestros', DatoMaestroController.getAll);
router.get('/datosmaestros/:id', DatoMaestroController.getById);

router.get('/reglas', ReglaController.getAll);
router.get('/reglas/:id', ReglaController.getById);

router.get('/desencadenantes', DesencadenanteController.getAll);
router.get('/desencadenantes/:id', DesencadenanteController.getById);

module.exports = router;