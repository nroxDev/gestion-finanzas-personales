import "./login.css";
import { Stack, Card, Typography, CardContent, CardActionArea, TextField, Button, Alert } from "@mui/material";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    let [correo, darCorreo] = useState('');
    let [contrasena, darContrasena] = useState('');
    let [hayErrorDeCredenciales, darHayErrorDeCredenciales] = useState(false);
    let navegar = useNavigate();


    return <Stack direction="column" alignItems="center" justifyContent="center" spacing={2} sx={{ height: "100vh", width: "100vw" }} padding="16px">

        <Card variant="elevation">
            <Stack minWidth="504px" minHeight="600px" direction="column" alignItems="center" justifyContent="center" spacing={2}>
                <Typography component="h1" variant="h4">Login</Typography>

                <CardContent minWidth="504px">
                    <Stack direction="column" spacing={2}>

                        <TextField
                            variant="outlined"
                            label="Correo"
                            required
                            type="email"
                            fullWidth
                            onChange={function (evento) {
                                darCorreo(evento.target.value);
                            }}

                        />

                        <TextField
                            variant="outlined"
                            label="Passowrd"
                            required
                            type="password"
                            fullWidth
                            onChange={function (evento) {
                                darContrasena(evento.target.value);
                            }}
                        />

                        {hayErrorDeCredenciales && <Alert severity="warning">Credenciales incorrectas, eres nuevo? <Link to="/registro">ir a registro</Link></Alert>}




                    </Stack>
                </CardContent>

                <CardActionArea>

                    <Button
                        variant="contained"
                        onClick={async function () {
                            try {
                                let datos = {
                                    correo: correo,
                                    contrasena: contrasena
                                }

                                let peticion = await fetch("http://localhost:2000/autorizacion", {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(datos)
                                })

                                let respuesta = await peticion.json();


                                if (respuesta.token) {
                                    sessionStorage.setItem('token', respuesta.token);
                                    navegar('/');
                                }
                                else {
                                    darHayErrorDeCredenciales(true)
                                }
                            } catch (e) {
                                alert("Error")
                            }






                        }}
                    >Entrar</Button>


                </CardActionArea>
            </Stack>
        </Card>
    </Stack>

}

export default Login;