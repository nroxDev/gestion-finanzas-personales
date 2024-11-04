const categoriaModelo = require('../baseDeDatos/categorias');
const validaciones = require("../validaciones/categorias");

async function crearCategoria(peticion, respuesta) {
    let datos = peticion.body;

    let error = validaciones.validarCategoria(datos);

    if (error == null) {
        try {
            let resultado = await categoriaModelo.crearCategoria(datos);
            respuesta.send(resultado);
        } catch (e) {
            respuesta.status(400).send({ error: "El usuario para la categoria no existe" });
        }

    } else {
        respuesta.status(400).send({ error: error });
    }
}

async function obtenerCategoriaPorId(peticion, respuesta) {
    let id = peticion.params.id;
    let resultado = await categoriaModelo.obtenerCategoriasDeUsuario(id);
    respuesta.send(resultado);

}

async function actualzarCategoria(peticion, respuesta) {
    let datos = peticion.body;
    let error = validaciones.validarCategoria(datos);

    if (error == null) {
        let resultado = await categoriaModelo.actualizarCategoria(datos);
        respuesta.send(resultado);
    }
    else {
        respuesta.status(400).send({
            error: error
        })
    }
}

async function borrarCategoria(peticion, respuesta) {
    let id = peticion.params.id;
    let resultado = await categoriaModelo.borrarCategoria(id);
    respuesta.send(resultado);
}

module.exports = {
    crearCategoria,
    obtenerCategoriaPorId,
    actualzarCategoria,
    borrarCategoria
}