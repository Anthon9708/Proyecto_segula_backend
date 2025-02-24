//import useInterval
const LogService = require('../services/LogService');
const ActivoService = require('../services/ActivoService');

const interval = 1000;

const init = async () => {
    //console.log("Inicio");

    // setInterval(() => {
        console.log("Contando")

        //Consulta en Log los últimos datos ingresados para cada Origen desde la fecha mayor.
        //Obteniendo la fecha mayor.
        let ultimasFechas = await LogService.getFechas();

        const { activos, posiciones } = ultimasFechas;

        //console.log(activos);
        //Con la fecha busco en cada Origen todos los activos y posiciones, pero me quedo con la más actual
        //Por cada activo
        ActivoService.findByFecha(activos);

        //Con estos datos envío para generar la URL de salida


    // }, interval);
}



module.exports = { init };