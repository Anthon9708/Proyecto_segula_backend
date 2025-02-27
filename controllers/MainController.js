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

const procesarActivos = async (activos) => {
    for (const activo of activos) {
        if (!activo.fechaBaja) {
            const regla = await ReglaService.getByFields({ desencadenante: desencadenanteAlta });
            if (!regla.fechaBaja) {
                const urlGenerada = await ReglaController.generateURL(activo.id, cabecera, regla);
                console.log('--altaActivo---' + urlGenerada);
            }
        } else {
            const regla = await ReglaService.getByFields({ desencadenante: desencadenanteBaja });
            if (!regla.fechaBaja) {
                const urlGenerada = await ReglaController.generateURL(activo.id, cabecera, regla);
                console.log('--bajaActivo---' + urlGenerada);
            }
        }
    }
};

const procesarPosiciones = async (posiciones) => {
    for (const posicion of posiciones) {
        if (posicion.tipo === 'Arranque') {
            const regla = await ReglaService.getByFields({ desencadenante: desencadenanteArranque });
            if (!regla.fechaBaja) {
                const urlGenerada = await ReglaController.generateURL(posicion.id, cabecera, regla);
                console.log('--arranque---' + urlGenerada);
            }
        } else if (posicion.tipo === 'Parada') {
            const regla = await ReglaService.getByFields({ desencadenante: desencadenanteParada });
            if (!regla.fechaBaja) {
                const urlGenerada = await ReglaController.generateURL(posicion.id, cabecera, regla);
                console.log('--parada---' + urlGenerada);
            }
        }
    }
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
            await Promise.all([procesarActivos(activos), procesarPosiciones(posiciones)]);

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