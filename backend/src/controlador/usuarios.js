const usuariosModelo = require('../baseDeDatos/usuarios');
const usuarioValidaciones = require('../validaciones/usuarios');

async function crearUsuario(peticion, respuesta) {
    let datos = peticion.body;
    let error = usuarioValidaciones.validarUsuario(datos);

    if (error === null) {
        try {
            let resultado = await usuariosModelo.crearUsuario(datos);
            respuesta.status(201).send(resultado)
        } catch (e) {
            respuesta.status(400).send({ error: "El correo electronico que quiere usar ya existe." })
        }
    } else {
        respuesta.status(400).send({ error: error })
    }
}

async function obtenerUsuarios(peticion, respuesta) {
    let resultado = await usuariosModelo.obtenerUsuarios();
    respuesta.status(200).send(resultado);
}

async function obtenerUsuarioPorCorreo(peticion, respuesta) {
    let correo = peticion.params.correo;
    let resultado = await usuariosModelo.obtenerUsuarioPorCorreo(correo);
    respuesta.status(200).send(resultado);
}

async function actualizarUsuario(peticion, respuesta) {
    let datos = peticion.body;
    let error = usuarioValidaciones.validarUsuario(datos);

    if (error == null) {
        let resultado = await usuariosModelo.actualizarUsuario(datos);
        respuesta.status(200).send(resultado);
    }
    else {
        respuesta.status(400).send({ error: error })
    }
}

async function borrarUsuario(peticion, respuesta) {
    let id = peticion.params.id;
    let resultado = await usuariosModelo.borrarUsuario(id);
    respuesta.send(resultado);
}

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorCorreo,
    actualizarUsuario,
    borrarUsuario
}