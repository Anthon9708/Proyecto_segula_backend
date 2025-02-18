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


router.get('/datosmaestros', DatoMaestroController.getAll);
router.get('/datosmaestros/:id', DatoMaestroController.getById);
router.post('/datosmaestros', DatoMaestroController.create);
router.put('/datosmaestros/:id', DatoMaestroController.update);

router.get('/reglas', ReglaController.getAll);
router.get('/reglas/:id', ReglaController.getById);
router.post('/reglas', ReglaController.create);
router.put('/reglas/:id', ReglaController.update);

router.get('/desencadenantes', DesencadenanteController.getAll);
router.get('/desencadenantes/:id', DesencadenanteController.getById);
router.post('/desencadenantes', DesencadenanteController.create);
router.put('/desencadenantes/:id', DesencadenanteController.update);

module.exports = router;