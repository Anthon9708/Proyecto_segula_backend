//import useInterval

const interval = 60000;

const init = () => {
    //console.log("Inicio");

    setInterval(() => {
        console.log("Contando")

    }, interval);
}

module.exports = { init };