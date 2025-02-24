//import useInterval
const LogService = require('../services/LogService');
const ActivoService = require('../services/ActivoService');
const PosicionService = require('../services/PosicionService');
const ReglaService = require('../services/ReglaService');
const ReglaController = require('../controllers/ReglaController');

const interval = 1000;

const init = async () => {
    //console.log("Inicio");

    // setInterval(() => {

        //Consulta en Log los últimos datos ingresados para cada Origen desde la fecha mayor.
        //Obteniendo la fecha mayor.
        let ultimasFechas = await LogService.getFechas();

        const { fechaActivos, fechaPosiciones } = ultimasFechas;

        //Con la fecha busco en cada Origen todos los activos y posiciones, pero me quedo con la más actual
        //Por cada activo
        const activos = await ActivoService.findByFecha(fechaActivos);
        const posiciones = await PosicionService.findByFecha(fechaPosiciones);

        //console.log(activos);
        //console.log(posiciones);
        
        //Con estos datos envío para generar la URL de salida
        
        activos.map(async (activo) => {
            if (!activo.fechaBaja) {
                //Envía URL con el alta como desencadenante
                const regla = await ReglaService.getByFields({ desencadenante: 12});
                //console.log(regla);
                ReglaController.generateURL(regla.id);

            }
        });


        //Inserta un registro en la tabla Log, con las fechas actuales


    // }, interval);
}



module.exports = { init };