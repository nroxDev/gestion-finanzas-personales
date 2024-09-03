const { conexion } = require("./conexion");

async function crearCategoria({ icono, nombre, fkIdUsuario }) {
    let [resultado] = await conexion.query("INSERT INTO categorias (icono,nombre, fk_id_usuario) VALUES (?, ?, ?)", [icono, nombre, fkIdUsuario]);
    return resultado;
};

async function obtenerCategoriasDeUsuario(fkIdUsuario) {
    let [resultado] = await conexion.query("SELECT * FROM categorias WHERE fk_id_usuario = ?", [fkIdUsuario]);
    return resultado;

};

async function actualizarCategoria({ id, nombre, icono, fkIdUsuario }) {
    let [resultado] = await conexion.query("UPDATE categorias SET nombre = ?, icono = ?, fk_id_usuario = ? WHERE id = ?", [nombre, icono, fkIdUsuario, id]);
    return resultado;
}


async function borrarCategoria(id) {
    let [resultado] = await conexion.query("DELETE FROM categorias WHERE id = ?", [id]);
    return resultado;

}

module.exports = { crearCategoria, obtenerCategoriasDeUsuario, actualizarCategoria, borrarCategoria }

