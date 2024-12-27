const jwt = require('jsonwebtoken');
const usuariosModelo = require('../baseDeDatos/usuarios');
const { desencriptar } = require('../utilidades/seguridad');

let secreto = "clave_secreta_especial";

async function crearToken(peticion, respuesta) {
    let datos = peticion.body;

    let usuario = await usuariosModelo.obtenerUsuarioPorCorreo(datos.correo);

    if(usuario == null) {
        respuesta.status(401).send({ error: 'Usuario o contraseña incorrecta '})
    }else if (desencriptar(usuario.contrasena) == datos.contrasena) {
        let token = jwt.sign(usuario, secreto, { expiresIn: '3h'});
        respuesta.status(200).send({ token: token, usuario });
    }else {
        respuesta.status(401).send({ error: 'Datos invalidso.'})
    }
}

async function validarToken(peticion, resputa, seguir) {
    const token = peticion.headers.authorization;

    if(token == null) {
        resputa.status(401).send({ error: 'El token no viene en cabecera'})
    }else {
      jwt.verify(token, secreto, function(error, usurio) {
        if(error == null) {
            seguir();
        }else {
            resputa.status(403).send({ error: 'Usuario no autorizado'})
        }
      })  
    }
}



module.exports = {
    crearToken,
    validarToken
}