const gastosModelo = require('../baseDeDatos/gastos');
const validaciones = require("../validaciones/gastos")

async function crearGasto(peticion, respuesta) {
    let datos = peticion.body;
    let error = validaciones.validarGastos(datos)

    if (error == null) {
        try {
            let resultado = await gastosModelo.crearGastos(datos);
            respuesta.send(resultado)
        } catch (e) {
            respuesta.status(400).send({ error: "No existen la categoría o usuario que intenta vincular" })
        }

    }
    else {
        respuesta.status(400).send({
            error: error
        })
    }
}

async function obtenerGastosDeUnUsuario(peticion, respuesta) {
    let id = peticion.params.id;
    let resultado = await gastosModelo.obtenerGastosDeUnUsuario(id);
    respuesta.send(resultado);
}

async function actualizarGasto(peticion, respuesta) {
    let datos = peticion.body;
    let error = validaciones.validarGastos(datos);

    if (error == null) {
        try {
            let resultado = await gastosModelo.actualizarGasto(datos);
            respuesta.send(resultado);
        } catch (e) {
            respuesta.status(400).send({ error: "No existen la categoría o usuario que intenta vincular" })
        }
    } else {
        respuesta.status(400).send({ error: error })
    }

}

async function borrarGasto(peticion, respuesta) {
    let id = peticion.params.id;
    let resultado = await gastosModelo.borrarGasto(id);
    respuesta.send(resultado);
}

module.exports = {
    crearGasto,
    obtenerGastosDeUnUsuario,
    actualizarGasto,
    borrarGasto
}