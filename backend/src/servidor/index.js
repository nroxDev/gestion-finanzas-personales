const express = require("express");
const cors = require("cors");

const usuarioControlador = require('../controlador/usuarios');
const categoriaControlador = require('../controlador/categorias');
const gastosContorlador = require('../controlador/gastos');
const autorizacionControaldor = require('../controlador/autorizacion');

const servidor = express();

servidor.use(cors());
servidor.use(express.json());

servidor.post('/autorizacion', autorizacionControaldor.crearToken);

servidor.post("/usuarios", usuarioControlador.crearUsuario);
servidor.get("/usuarios", autorizacionControaldor.validarToken, usuarioControlador.obtenerUsuarios);
servidor.get("/usuarios/:correo", autorizacionControaldor.validarToken, usuarioControlador.obtenerUsuarioPorCorreo);
servidor.put("/usuarios", autorizacionControaldor.validarToken, usuarioControlador.actualizarUsuario);
servidor.delete("/usuarios/:id", autorizacionControaldor.validarToken, usuarioControlador.borrarUsuario);

servidor.post("/categorias", autorizacionControaldor.validarToken, categoriaControlador.crearCategoria);
servidor.get("/categorias/:id", autorizacionControaldor.validarToken, categoriaControlador.obtenerCategoriaPorId);
servidor.put("/categorias", autorizacionControaldor.validarToken, categoriaControlador.actualzarCategoria);
servidor.delete("/categorias/:id", autorizacionControaldor.validarToken, categoriaControlador.borrarCategoria);

servidor.post("/gastos", autorizacionControaldor.validarToken, gastosContorlador.crearGasto);
servidor.get("/gastos/:id", autorizacionControaldor.validarToken, gastosContorlador.obtenerGastosDeUnUsuario);
servidor.put("/gastos", autorizacionControaldor.validarToken, gastosContorlador.actualizarGasto);
servidor.delete("/gastos/:id", autorizacionControaldor.validarToken, gastosContorlador.borrarGasto);

servidor.listen(2000, function () {
    console.log("Servidor corriendo.")
});

