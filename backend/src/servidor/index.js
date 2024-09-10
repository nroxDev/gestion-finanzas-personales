const express = require("express");
const cors = require("cors");

const usuarioControlador = require('../controlador/usuarios');
const categoriaControlador = require('../controlador/categorias');
const gastosContorlador = require('../controlador/gastos');

const servidor = express();

servidor.use(cors());
servidor.use(express.json());

servidor.post("/usuarios", usuarioControlador.crearUsuario);
servidor.get("/usuarios", usuarioControlador.obtenerUsuarios);
servidor.get("/usuarios/:correo", usuarioControlador.obtenerUsuarioPorCorreo);
servidor.put("/usuarios", usuarioControlador.actualizarUsuario);
servidor.delete("/usuarios/:id", usuarioControlador.borrarUsuario);

servidor.post("/categorias", categoriaControlador.crearCategoria);
servidor.get("/categorias/:id", categoriaControlador.obtenerCategoriaPorId);
servidor.put("/categorias", categoriaControlador.actualzarCategoria);
servidor.delete("/categorias/:id", categoriaControlador.borrarCategoria);

servidor.post("/gastos", gastosContorlador.crearGasto);
servidor.get("/gastos/:id", gastosContorlador.obtenerGastosDeUnUsuario);
servidor.put("/gastos", gastosContorlador.actualizarGasto);
servidor.delete("/gastos/:id", gastosContorlador.borrarGasto);

servidor.listen(2000, function () {
    console.log("Servidor corriendo.")
});

