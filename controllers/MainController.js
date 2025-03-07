const LogService = require("../services/LogService");
const ReglaController = require("../controllers/ReglaController");

const intervalo = 10000;

/**
 * Función de inicialización que configura un intervalo para el envío de datos.
 */
const init = () => {
  console.log("Iniciando proceso de envío de datos");
  setInterval(async () => {
    console.log("Iniciando ciclo");
    try {
      //Consulta en Log los últimos datos ingresados para cada Origen desde la fecha mayor.
      //Obteniendo la fecha mayor.
      const ultimasFechas = await LogService.getFechas();
      const { fechaActivos, fechaPosiciones } = ultimasFechas;
      // Procesar reglas con las fechas obtenidas
      let urls = await ReglaController.procesarReglas(
        fechaActivos,
        fechaPosiciones
      );
      if (urls.length > 0) {
        urls.map((url) => console.log("-----URL:----", url));

        // Crear un nuevo registro en el log con la fecha actual
        const fechaActual = new Date();
        const log = {
          activos: fechaActual,
          posiciones: fechaActual,
        };
        await LogService.create(log);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }, intervalo);
};

module.exports = { init };
