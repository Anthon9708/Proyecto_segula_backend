/**
 * Función para establecer la conexión con la base de datos y sincronizarla.
 * @param {Object} sequelize - La instancia de Sequelize para la conexión a la base de datos.
 * @param {Object} app - La instancia de la aplicación Express.
 * @param {number} port - El puerto en el que el servidor escuchará.
 */
const conexionBD = (sequelize, app, port) => {
    sequelize.sync({ force: false }).then(() => {
        console.log('Base de datos sincronizada');
        app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
        });
    }).catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });
}

module.exports = conexionBD;