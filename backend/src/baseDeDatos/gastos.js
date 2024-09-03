const { conexion } = require("./conexion");


async function crearGastos({ descripcion, importe, fecha, fkIdUsuario, fkIdCategoria }) {
    let [resultado] = await conexion.query("INSERT INTO gastos (descripcion, importe,fecha, fk_id_usuario, fk_id_categoria) VALUES (?, ?,?,?,?)", [descripcion, importe, fecha, fkIdUsuario, fkIdCategoria]);
    return resultado;

};

async function obtenerGastosDeUnUsuario(idUsuario) {
    let [resultado] = await conexion.query("SELECT * FROM gastos WHERE fk_id_usuario = ?", [idUsuario]);
    return resultado;
}


async function actualizarGasto({ descripcion, importe, fecha, fkIdUsuario, fkIdCategoria, id }) {
    let [resultado] = await conexion.query(
        "UPDATE gastos SET descripcion = ?, importe = ?,fecha =?,fk_id_usuario  = ?,fk_id_categoria = ? WHERE id = ?",
        [descripcion, importe, fecha, fkIdUsuario, fkIdCategoria, id]);
    return resultado;
}


async function borrarGasto(id) {
    let [resultado] = await conexion.query("DELETE FROM gastos WHERE id = ?", [id]);
    return resultado;
}

module.exports = { crearGastos, obtenerGastosDeUnUsuario, actualizarGasto, borrarGasto };
