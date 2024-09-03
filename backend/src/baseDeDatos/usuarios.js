const { conexion } = require("./conexion");

async function crearUsuario({ nombre, primerApellido, segundoApellido, fechaNacimiento, sexo, correo, contrasena }) {
    let [resultado] = await conexion.query(
        "INSERT INTO usuarios (nombre, primer_apellido, segundo_apellido, fecha_nacimiento, correo_electronico, sexo, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [nombre, primerApellido, segundoApellido, fechaNacimiento, correo, sexo, contrasena]
    );

    return resultado;

}

async function obtenerUsuarioPorCorreo(corrreo) {
    let [resultado] = await conexion.query("SELECT * FROM usuarios WHERE correo_electronico = ?", [corrreo]);
    return resultado[0];
}

async function obtenerUsuarios() {
    let [resultado] = await conexion.query("SELECT * FROM usuarios");
    return resultado;
}


async function borrarUsuario(id) {
    let [resultado] = await conexion.query("DELETE FROM usuarios WHERE id = ?", [id]);
    return resultado;

}

async function actualizarUsuario({ id, nombre, primerApellido, segundoApellido, fechaNacimiento, sexo, correo, contrasena }) {
    let [resultado] = await conexion.query(
        `UPDATE usuarios 
         SET nombre = ?, primer_apellido = ?, segundo_apellido = ?, fecha_nacimiento = ?, sexo = ?, correo_electronico = ?, contrasena = ?
         WHERE id = ?`,
        [nombre, primerApellido, segundoApellido, fechaNacimiento, sexo, correo, contrasena, id]
    );

    return resultado;
}


module.exports = { crearUsuario, borrarUsuario, obtenerUsuarioPorCorreo, actualizarUsuario, obtenerUsuarios };