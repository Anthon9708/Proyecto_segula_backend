//import useInterval
const LogService = require('../services/LogService');
const ActivoService = require('../services/ActivoService');
const PosicionService = require('../services/PosicionService');
const ReglaService = require('../services/ReglaService');
const ReglaController = require('../controllers/ReglaController');
const DesencadenanteService = require('../services/DesencadenanteService');

const sequelize = require('../config/database');
const { Sequelize } = require('sequelize');

const intervalo = 10000;

const procesarReglas = async() => {
    const reglas = await ReglaService.getAll();
    const reglasFiltradas = reglas.filter(regla => !regla.fechaBaja);
    reglasFiltradas.map(async regla => {
        let desencadenante = await DesencadenanteService.getById(regla.desencadenante);
        
        sequelize.query(`SELECT * FROM ${desencadenante.tabla} WHERE ${desencadenante.query}`, { type: Sequelize.QueryTypes.SELECT })
        .then(results => {
            console.log(results);
            results.map(async elemento => {
                const urlGenerada = await ReglaController.generateURL(elemento.id, regla);
                console.log('-----' + urlGenerada);
            });
        })
        .catch(error => {
            console.error('Error ejecutando la consulta:', error);
        });
    })
};

const init = () => {
    console.log('Iniciando proceso de envío de datos');
    setInterval(async () => {
        console.log('Iniciando ciclo');
        try {
            //Consulta en Log los últimos datos ingresados para cada Origen desde la fecha mayor.
            //Obteniendo la fecha mayor.
            const ultimasFechas = await LogService.getFechas();
            const { fechaActivos, fechaPosiciones } = ultimasFechas;

            //Con la fecha busco en cada Origen todos los activos y posiciones, pero me quedo con la más actual
            //Por cada activo
            const [activos, posiciones] = await Promise.all([
                ActivoService.findByFecha(fechaActivos),
                PosicionService.findByFecha(fechaPosiciones)
            ]);
            
            //Con estos datos envío para generar la URL de salida

            await procesarReglas();
            //await Promise.all([procesarActivos(activos), procesarPosiciones(posiciones)]);

            if (activos.length > 0 || posiciones.length > 0) {
                const fechaActual = new Date();
                const log = {
                    activos: fechaActual,
                    posiciones: fechaActual
                };
                await LogService.create(log);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }, intervalo);
};

module.exports = { init };