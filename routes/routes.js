const express = require('express');
const DatoController = require('../controllers/DatoController');
const DatoMaestroController = require('../controllers/DatoMaestroController');
const ReglaController = require('../controllers/ReglaController');
const DesencadenanteController = require('../controllers/DesencadenanteController');
const router = express.Router();

router.get('/reglas', ReglaController.getAll);
router.get('/reglas/:id', ReglaController.getById);
router.post('/reglas', ReglaController.create);
router.put('/reglas/:id', ReglaController.update);
router.get('/reglas/baja/:id', ReglaController.baja);
router.get('/reglas/alta/:id', ReglaController.alta);

router.get('/datosmaestros', DatoMaestroController.getAll);
router.get('/datosmaestros/:id', DatoMaestroController.getById);
router.post('/datosmaestros', DatoMaestroController.create);
router.put('/datosmaestros/:id', DatoMaestroController.update);
router.get('/datos/baja/:id', DatoMaestroController.baja);
router.get('/datos/alta/:id', DatoMaestroController.alta);

router.get('/desencadenantes', DesencadenanteController.getAll);
router.get('/desencadenantes/:id', DesencadenanteController.getById);
router.post('/desencadenantes', DesencadenanteController.create);
router.put('/desencadenantes/:id', DesencadenanteController.update);
router.get('/desencadenantes/baja/:id', DesencadenanteController.baja);
router.get('/desencadenantes/alta/:id', DesencadenanteController.alta);

router.get('/datos', DatoController.getAll);
router.get('/datos/:id', DatoController.getById);
router.post('/datos', DatoController.create);
router.put('/datos/:id', DatoController.update);
router.get('/datos/baja/:id', DatoController.baja);
router.get('/datos/alta/:id', DatoController.alta);

router.get('/datosregla', DatoController.getByFields);
router.get('/datosregla/:id', DatoController.getByIdRegla);
router.put('/datosregla', DatoController.createOrUpdateByIdRegla);

router.get('/datosurl/:id', DatoController.getParamsById);

module.exports = router;