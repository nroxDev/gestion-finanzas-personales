function validarUsuario(datos) {
    let error = null;
    let patronFecha = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    let patronSexo = /^[MF]$/;
    let patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const patronContrasena = /^.{6,}$/;


    if (datos.nombre == undefined || typeof datos.nombre != "string") {
        error = "Campo nombre es requerido y debe ser un string.";
    } else if (datos.primerApellido == undefined || typeof datos.primerApellido != "string") {
        error = "El campo primer apellido es requerido y debe ser un string";
    }
    else if (typeof datos.segundApellido == "boolean" || typeof datos.segundApellido == "number") {
        error = "El campo debe ser un string o null";
    }
    else if (datos.fechaNacimiento == undefined || !patronFecha.test(datos.fechaNacimiento)) {
        error = "El campo fecha es requerido y debe tener el formato año-mes-dia (ejemplo: 2024-10-01)";

    }
    else if (datos.sexo == undefined || !patronSexo.test(datos.sexo)) {
        error = "El campo sexo es requerido y debe ser M o F";
    }
    else if (datos.correo == undefined || !patronCorreo.test(datos.correo)) {
        error = "el campo del correo es oblogatorio con formato de correo electronico.";
    }
    else if (datos.contrasena == undefined || !patronContrasena.test(datos.contrasena)) {
        error = "el campo contraeña es obligatorio y debe tener al menos 6 caracteres.";
    }

    return error;
}

module.exports = { validarUsuario }