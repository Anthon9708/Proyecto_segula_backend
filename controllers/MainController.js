//import useInterval
const LogService = require('../services/LogService');
const ActivoService = require('../services/ActivoService');
const PosicionService = require('../services/PosicionService');
const ReglaService = require('../services/ReglaService');
const ReglaController = require('../controllers/ReglaController');

const desencadenanteAlta = 1;
const desencadenanteBaja = 2;
const desencadenanteArranque = 3;
const desencadenanteParada = 4;
const cabecera = 'http://www.url.com';
const intervalo = 10000;

const init =  () => {
    console.log('Iniciando proceso de envío de datos');
    setInterval( async () => {
        console.log('Iniciando ciclo');
        try {
            //Consulta en Log los últimos datos ingresados para cada Origen desde la fecha mayor.
            //Obteniendo la fecha mayor.
            let ultimasFechas = await LogService.getFechas();
            const { fechaActivos, fechaPosiciones } = ultimasFechas;

            //Con la fecha busco en cada Origen todos los activos y posiciones, pero me quedo con la más actual
            //Por cada activo
            const activos = await ActivoService.findByFecha(fechaActivos);
            const posiciones = await PosicionService.findByFecha(fechaPosiciones);
            //Con estos datos envío para generar la URL de salida
            activos.map(async (activo) => {
                if (!activo.fechaBaja) {
                    //Envía URL con el alta como desencadenante
                    const regla = await ReglaService.getByFields({ desencadenante: desencadenanteAlta});
                    const urlGenerada = await ReglaController.generateURL(activo.id,cabecera, regla);
                    console.log('--altaActivo---' + urlGenerada);
                }
                if(activo.fechaBaja){
                    //Envía URL con la baja como desencadenante
                    const regla = await ReglaService.getByFields({ desencadenante: desencadenanteBaja});
                    const urlGenerada = await ReglaController.generateURL(activo.id,cabecera, regla);
                    console.log('--bajaActivo---'+urlGenerada);
                }
            });
            

            posiciones.map(async (posicion) => {
                if (posicion.tipo === 'Arranque') {
                    //Envía URL con el arranque como desencadenante
                    const regla = await ReglaService.getByFields({ desencadenante: desencadenanteArranque});
                    const urlGenerada = await ReglaController.generateURL(posicion.id,cabecera, regla);
                    console.log('--arranque---'+urlGenerada);
                }
                
                if(posicion.tipo === 'Parada'){
                    //Envía URL con la parada como desencadenante
                    const regla = await ReglaService.getByFields({ desencadenante: desencadenanteParada});
                    const urlGenerada = await ReglaController.generateURL(posicion.id,cabecera, regla);
                    console.log('--parada---'+urlGenerada);
                }
            });

            if(activos.length > 0 || posiciones.length > 0){
                const fechaActual = new Date();
                const log = {
                    activos: fechaActual,
                    posiciones: fechaActual
                };
                await LogService.create(log);
            }

        }catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }, intervalo);
}

module.exports = { init };