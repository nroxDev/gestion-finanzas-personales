const express = require("express");
const cors = require("cors");
const { crearUsuario, obtenerUsuarios, actualizarUsuario, borrarUsuario } = require("../baseDeDatos/usuarios");
const { crearCategoria, obtenerCategoriasDeUsuario, actualizarCategoria, borrarCategoria } = require("../baseDeDatos/categorias");
const { crearGastos, actualizarGasto, obtenerGastosDeUnUsuario, borrarGasto } = require("../baseDeDatos/gastos");

const servidor = express();

servidor.use(cors());
servidor.use(express.json());

servidor.post("/usuarios", async function (peticion, respuesta) {
    let datos = peticion.body;
    let resultado = await crearUsuario(datos);
    respuesta.send(resultado)
});

servidor.get("/usuarios", async function (peticion, respuesta) {
    let resultado = await obtenerUsuarios();
    respuesta.send(resultado);

});

servidor.put("/usuarios", async function (peticion, respuesta) {
    let datos = peticion.body;
    let resultado = await actualizarUsuario(datos);
    respuesta.send(resultado);
})


servidor.delete("/usuarios/:id", async function (peticion, respuesta) {
    let id = peticion.params.id;
    let resultado = await borrarUsuario(id);
    respuesta.send(resultado);
})


servidor.post("/categorias", async function (peticion, respuesta) {
    let datos = peticion.body;
    let resultado = await crearCategoria(datos);
    respuesta.send(resultado)
});

servidor.get("/categorias/:id", async function (peticion, respuesta) {
    let id = peticion.params.id;
    let resultado = await obtenerCategoriasDeUsuario(id);
    respuesta.send(resultado);

});

servidor.put("/categorias", async function (peticion, respuesta) {
    let datos = peticion.body;
    let resultado = await actualizarCategoria(datos);
    respuesta.send(resultado);
})

servidor.delete("/categorias/:id", async function (peticion, respuesta) {
    let id = peticion.params.id;
    let resultado = await borrarCategoria(id);
    respuesta.send(resultado);
})

servidor.post("/gastos", async function (peticion, respuesta) {
    let datos = peticion.body;
    let resultado = await crearGastos(datos);
    respuesta.send(resultado)
});

servidor.get("/gastos/:id", async function (peticion, respuesta) {
    let id = peticion.params.id;
    let resultado = await obtenerGastosDeUnUsuario(id);
    respuesta.send(resultado);
});

servidor.put("/gastos", async function (peticion, respuesta) {
    let datos = peticion.body;
    let resultado = await actualizarGasto(datos);
    respuesta.send(resultado);

});

servidor.delete("/gastos/:id", async function (peticion, respuesta) {
    let id = peticion.params.id;
    let resultado = await borrarGasto(id);
    respuesta.send(resultado);
});

servidor.listen(2000, function () {
    console.log("Servidor corriendo.")
});

