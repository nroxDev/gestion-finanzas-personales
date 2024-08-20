import { useState } from "react";
import "./formulario-registro.css";

function FormularioRegistro(props) {
    let [nombre, darNombre] = useState('');
    let [primerApellido, darPrimerApellido] = useState('');
    let [segundoApellido, darSegundoApellido] = useState('');
    let [fechaNacimiento, darFechaDeNacimiento] = useState('');
    let [correoElectronico, darCorreo] = useState('');
    let [sexo, darSexo] = useState('');

    return <div className="contenedor-formulario-registro">
        <h2>Formulario De Registro</h2>
        <form className="formulario-registro" onSubmit={function (evento) {
            evento.preventDefault();
            
            let datos = {
                nombre: nombre,
                primerApellido: primerApellido,
                segundoApellido: segundoApellido,
                fechaNacimiento: fechaNacimiento,
                correoElectronico: correoElectronico,
                sexo: sexo
            };

           props.alTenerDatosCompletos(datos)

        }} >
            <input
                type="text"
                placeholder="Nombre"
                className="input-formulario-registro"
                value={nombre}
                onChange={(evento) => darNombre(evento.target.value)}

            />
            <input
                type="text" placeholder="Primer apellido"
                className="input-formulario-registro"
                value={primerApellido}
                onChange={(evento) => darPrimerApellido(evento.target.value)}
            />

            <input
                type="text" placeholder="Segundo Apellido"
                className="input-formulario-registro"
                value={segundoApellido}
                onChange={(evento) => darSegundoApellido(evento.target.value)}
            />
            <input
                type="date"
                className="input-formulario-registro"
                value={fechaNacimiento}
                onChange={(evento) => darFechaDeNacimiento(evento.target.value)
                }
            />

            <div>
                <label>Sexo Hombre</label>
                <input type="radio" value="H" checked={sexo === "H"} onChange={(evento)=>darSexo(evento.target.value)} />
                <label>Sexo Mujer</label>
                <input type="radio" value="M" checked={sexo === "M"} onChange={(evento)=>darSexo(evento.target.value)}/>
            </div>
            <input
                type="email" placeholder="Correo Electrónico"
                className="input-formulario-registro"
                value={correoElectronico}
                onChange={(evento) => darCorreo(evento.target.value)}
            />
            <input type="submit" value="Enviar" className="enviar-formulario-registro" />
        </form>
    </div>


}

export default FormularioRegistro;



