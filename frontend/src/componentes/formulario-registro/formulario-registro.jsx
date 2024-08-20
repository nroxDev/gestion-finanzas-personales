import "./formulario-registro.css";

function FormularioRegistro(props) {

    return <div className="contenedor-formulario-registro">
        <h2>Formulario De Registro</h2>
        <form className="formulario-registro">
            <input type="text" placeholder="Nombre" className="input-formulario-registro" />
            <input type="text" placeholder="Primer apellido" className="input-formulario-registro" />
            <input type="text" placeholder="Segundo Apellido" className="input-formulario-registro" />
            <input type="date" className="input-formulario-registro" />
            <div>
                <label>Sexo Hombre</label> <input type="radio" />
                <label>Sexo Mujer</label><input type="radio" />
            </div>
            <input type="email" placeholder="Correo Electrónico" className="input-formulario-registro" />
            <input type="submit" value="Enviar" className="enviar-formulario-registro" />
        </form>
    </div>


}

export default FormularioRegistro;



