function validarGastos(datos) {
    const patronFecha = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    let error = null;

    if (datos.importe == undefined || typeof datos.importe != "number") {
        error = "El campo importe es requerido y debe de ser un número";
    }
    else if (datos.descripcion == undefined || typeof datos.descripcion != "string") {
        error = "el campo descripcion es requerido y debe de ser un string";
    }
    else if (datos.fecha == undefined || !patronFecha.test(datos.fecha)) {
        error = "El campo fecha  es requerido y debe tener el siguiente formato AAAA-MM-DD"

    } else if (datos.fkIdUsuario == undefined || typeof datos.fkIdUsuario != "number") {
        error = "El campo fkIdUsuario  es equerido  y debe ser de tipo numero "
    } else if (datos.fkIdCategoria == undefined || typeof datos.fkIdCategoria != "number") {
        error = " El campo fkIdCategoria es requerido ydebe de ser de tipo numero"
    }
    return error;
}

module.exports = {
    validarGastos
}