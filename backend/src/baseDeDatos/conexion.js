const mysql2 = require("mysql2/promise");

let conexion = mysql2.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    database: "finanzas_personales",
    password: "roxana.mendoza",
});

module.exports = {
    conexion
}