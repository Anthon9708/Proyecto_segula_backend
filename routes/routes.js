const express = require('express');
const DatoController = require('../controllers/DatoController');
const DatoMaestroController = require('../controllers/DatoMaestroController');
const ReglaController = require('../controllers/ReglaController');
const DesencadenanteController = require('../controllers/DesencadenanteController');
const router = express.Router();

router.get('/datos', DatoController.getAll);
router.get('/datos/:id', DatoController.getById);
router.post('/datos', DatoController.create);
router.put('/datos/:id', DatoController.update);
router.get('/datos/baja/:id', DatoController.baja);

router.get('/datosregla', DatoController.getByFields);
router.get('/datosregla/:id', DatoController.getByIdRegla);
//router.post('/datosregla', DatoController.createByIdRegla);
router.put('/datosregla', DatoController.createOrUpdateByIdRegla);

router.get('/datosurl/:id', DatoController.getParamsById);

router.get('/datosmaestros', DatoMaestroController.getAll);
router.get('/datosmaestros/:id', DatoMaestroController.getById);
router.post('/datosmaestros', DatoMaestroController.create);
router.put('/datosmaestros/:id', DatoMaestroController.update);

router.get('/reglas', ReglaController.getAll);
router.get('/reglas/:id', ReglaController.getById);
router.post('/reglas', ReglaController.create);
router.put('/reglas/:id', ReglaController.update);
// router.get('/reglas/baja/:id', ReglaController.baja);

router.get('/desencadenantes', DesencadenanteController.getAll);
router.get('/desencadenantes/:id', DesencadenanteController.getById);
router.post('/desencadenantes', DesencadenanteController.create);
router.put('/desencadenantes/:id', DesencadenanteController.update);

module.exports = router;