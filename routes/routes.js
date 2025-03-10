const express = require("express");
const DatoController = require("../controllers/DatoController");
const DatoMaestroController = require("../controllers/DatoMaestroController");
const ReglaController = require("../controllers/ReglaController");
const DesencadenanteController = require("../controllers/DesencadenanteController");
const ActivoController = require("../controllers/ActivoController");
const PosicionController = require("../controllers/PosicionController");
const LogController = require("../controllers/LogController");
const IolocateController = require("../controllers/IolocateController")
const router = express.Router();

// Rutas para 'reglas'
router.get("/reglas", ReglaController.getAll);
router.get("/reglas/:id", ReglaController.getById);
router.post("/reglas", ReglaController.create);
router.put("/reglas/:id", ReglaController.update);
router.put("/reglas/baja/:id", ReglaController.baja);
router.put("/reglas/alta/:id", ReglaController.alta);

// Rutas para 'datos maestros'
router.get("/datosmaestros", DatoMaestroController.getAll);
router.get("/datosmaestros/:id", DatoMaestroController.getById);
router.post("/datosmaestros", DatoMaestroController.create);
router.put("/datosmaestros/:id", DatoMaestroController.update);
router.put("/datosmaestros/baja/:id", DatoMaestroController.baja);
router.put("/datosmaestros/alta/:id", DatoMaestroController.alta);

// Rutas para 'desencadenantes'
router.get("/desencadenantes", DesencadenanteController.getAll);
router.get("/desencadenantes/:id", DesencadenanteController.getById);
router.post("/desencadenantes", DesencadenanteController.create);
router.put("/desencadenantes/:id", DesencadenanteController.update);
router.put("/desencadenantes/baja/:id", DesencadenanteController.baja);
router.put("/desencadenantes/alta/:id", DesencadenanteController.alta);

// Rutas para 'datos'
router.get("/datos", DatoController.getAll);
router.get("/datos/:id", DatoController.getById);
router.post("/datos", DatoController.create);
router.put("/datos/:id", DatoController.update);
router.put("/datos/baja/:id", DatoController.baja);
router.put("/datos/alta/:id", DatoController.alta);

// Rutas para 'datosregla'
router.get("/datosregla", DatoController.getByFields);
router.get("/datosregla/:id", DatoController.getByIdRegla);
router.put("/datosregla", DatoController.createOrUpdateByIdRegla);
router.get("/datosregla/vaciar/:id", DatoController.bajaAllByIdRegla);

// Rutras para 'datosurl'
router.get("/datosurl/:id", DatoController.getParamsById);

// Rutas para 'activos'
router.get("/activos", ActivoController.getAll);
router.get("/activos/:id", ActivoController.getById);
router.post("/activos", ActivoController.create);
router.put("/activos/:id", ActivoController.update);
router.put("/activos/baja/:id", ActivoController.baja);
router.put("/activos/alta/:id", ActivoController.alta);

// Rutas para 'posiciones'
router.get("/posiciones", PosicionController.getAll);
router.get("/posiciones/:id", PosicionController.getById);
router.post("/posiciones", PosicionController.create);
router.put("/posiciones/:id", PosicionController.update);
router.put("/posiciones/baja/:id", PosicionController.baja);
router.put("/posiciones/alta/:id", PosicionController.alta);

// Rutas para 'logs'
router.get("/logs", LogController.getAll);
router.get("/logs/:id", LogController.getById);
router.post("/logs", LogController.create);
router.put("/logs/:id", LogController.update);
router.put("/logs/baja/:id", LogController.baja);
router.put("/logs/alta/:id", LogController.alta);

// IOLOCATE RUTAS

router.get("/companies", IolocateController.getCompanies); 
router.get("/companies/:companyId/devices", IolocateController.getDeviceId);
router.get("/devices/:deviceId/history", IolocateController.getDeviceIdHistory);

module.exports = router;
