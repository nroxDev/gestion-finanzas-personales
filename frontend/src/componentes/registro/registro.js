
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import "./registro.css";
import { Card, CardContent, Button, TextField, Typography, CardActionArea, Stack, Divider, FormGroup, FormLabel, Checkbox, FormControlLabel } from "@mui/material";


function Registro() {
    let [nombre, darNombre] = useState('');
    let [primerApellido, darPrimerApellido] = useState("");
    let [segundoApellido, darSegundoApellido] = useState("");
    let [fechaNacimiento, darFechaNacimiento] = useState(".");
    let [correo, darCorreo] = useState("");
    let [contrasena, darContrasena] = useState("");
    let [contrasenaRepetida, darContrasenaRepetida] = useState("");
    let navegar = useNavigate();

    return <Stack direction="column" alignItems="center" justifyContent="center" spacing={2} sx={{ height: "100vh", width: "100vw" }} padding="16pxpx">
        <Card variant="elevation" className="pagina-registro">
            <Stack direction="column" padding="16px" minWidth="504px">
                <Typography component="h1" variant="h4">Registro</Typography>

                <CardContent>
                    <Stack direction="column" spacing={2}>
                        <TextField
                            variant="outlined"
                            label="Nombre"
                            required
                            type="text"
                            value={nombre}
                            onChange={function (evento) {
                                darNombre(evento.target.value)
                            }}
                        />


                        <TextField
                            variant="outlined"
                            label="Primer Apellido"
                            required
                            type="text"
                            value={primerApellido}
                            onChange={function (evento) {
                                darPrimerApellido(evento.target.value)
                            }}

                        />


                        <TextField
                            variant="outlined"
                            label="Segundo Apellido"
                            type="text"
                            value={segundoApellido}
                            onChange={function (evento) {
                                darSegundoApellido(evento.target.value)
                            }}
                        />

                        <TextField
                            variant="outlined"
                            label="Fecha de nacimineto"
                            type="date" value={fechaNacimiento}
                            onChange={function (evento) {
                                darFechaNacimiento(evento.target.value);
                            }}

                        />

                        <Divider orientation="horizontal" />


                        <Stack direction="column" alignItems="start">
                            <FormLabel component="legend">Selecciona tu sexo</FormLabel>
                            <FormGroup row>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Hombre"
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Mujer"
                                />
                            </FormGroup>
                        </Stack>

                        <Divider orientation="horizontal" />

                        <TextField
                            variant="outlined"
                            label="Correo Electronico"
                            required
                            type="email"
                            value={correo}
                            onChange={function (evento) {
                                darCorreo(evento.target.value);
                            }}
                        />

                        <TextField
                            variant="outlined"
                            label="Contraseña"
                            required
                            type="password"
                            value={contrasena}
                            onChange={function (evento) {
                                darContrasena(evento.target.value)
                            }}

                        />

                        <TextField
                            variant="outlined"
                            label="Repetir Contraseña"
                            required
                            type="password"
                            value={contrasenaRepetida}
                            onChange={function (evento) {
                                darContrasenaRepetida(evento.target.value);
                            }}
                        />
                    </Stack>
                </CardContent>

                <CardActionArea>
                    <Button variant="contained" onClick={async function () {
                        let datos = {
                            nombre: nombre,
                            primerApellido: primerApellido,
                            segundoApellido: segundoApellido,
                            fechaNacimiento: fechaNacimiento,
                            sexo: "M",
                            correo: correo,
                            contrasena: contrasenaRepetida
                        }

                        await fetch("http://localhost:2000/usuarios", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(datos)
                        })
                        navegar('/login')
                    }}>Registrarse</Button>
                </CardActionArea>
            </Stack>
        </Card>
    </Stack>

}
export default Registro;