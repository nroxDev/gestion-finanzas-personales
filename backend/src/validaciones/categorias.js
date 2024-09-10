

function validarCategoria(datos) {
    let error = null;

    if (datos.nombre == undefined || !(typeof datos.nombre == "string")) {
        error = "El campo nombre es reaquerido y debe de ser un string";
    }
    else if (datos.icono == undefined || !(typeof datos.icono == "string")) {
        error = " El campo icono es requerido ydebe de ser un string "

    }
    else if (datos.fkIdUsuario == undefined || !(typeof datos.fkIdUsuario == "number")) {
        error = " El campo fkIdUsuaruio es requerid y debe ser de tipo númerico"
    }

    return error;
};

module.exports = {
    validarCategoria

}