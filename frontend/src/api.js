export function obtenerUsuario() {
    const datos = localStorage.getItem('usuario');

    if (!datos) {
        return null;
    }
    const usuario = JSON.parse(datos);
    return usuario
}

export function obtenerTokenDeSeguridad() {
    let token = localStorage.getItem('tokenDeSeguridad');

    if (!token) {
        throw new Error('No existe el token de seguridad');
    }

    return token;
}

export async function obtenerCategorias() {
    let usuario = obtenerUsuario();
    let token = obtenerTokenDeSeguridad();

    const respuesta = await fetch(`http://localhost:2000/categorias/${usuario.id}`, {
        method: "GET",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    });

    const datos = await respuesta.json();
    return datos;
}

export async function obtenerGastos() {
    let usuario = obtenerUsuario();
    let token = obtenerTokenDeSeguridad();

    const respuesta = await fetch(`http://localhost:2000/gastos/${usuario.id}`, {
        method: "GET",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    });

    const datos = await respuesta.json();
    return datos;
}

export async function obtenerIngresoMensual() {
    return Number(localStorage.getItem('ingresoMensual'));
}

export async function darIngresoMensual(importe) {
    localStorage.setItem('ingresoMensual', Number(importe));
}


export async function crearGasto(importe, descripcion, fecha, fkIdCategoria) {
    let usuario = obtenerUsuario();
    let token = obtenerTokenDeSeguridad();

    const response = await fetch('http://localhost:2000/gastos', {
        method: 'POST',
        headers: {
            "Authorization": token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            descripcion,
            importe: Number(importe),
            fecha: fecha,
            fkIdUsuario: usuario.id,
            fkIdCategoria
        }),
    });

    const datos = await response.json();
    return datos;
}

export async function actualizarGasto(idGasto, importe, descripcion, fecha, fkIdCategoria) {
    let usuario = obtenerUsuario();
    let token = obtenerTokenDeSeguridad();

    const response = await fetch("http://localhost:2000/gastos", {
        method: 'PUT',
        headers: {
            "Authorization": token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: idGasto,
            descripcion,
            importe: Number(importe),
            fecha: fecha,
            fkIdUsuario: usuario.id,
            fkIdCategoria
        }),
    });


    const datos = await response.json();
    return datos;
}

export async function borrarGasto(idGasto) {
    let token = obtenerTokenDeSeguridad();

    const response = await fetch(`http://localhost:2000/gastos/${idGasto}`, {
        method: 'DELETE',
        headers: {
            "Authorization": token,
            'Content-Type': 'application/json',
        },
    });

    const datos = await response.json();
    return datos;
}

export async function borrarCategoria(id) {
    let token = obtenerTokenDeSeguridad();

    const response = await fetch(`http://localhost:2000/categorias/${id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": token,
            'Content-Type': 'application/json',
        },
    });

    const datos = await response.json();
    return datos;
}


export async function actualizarCategoria(id, nombre, icono) {
    let token = obtenerTokenDeSeguridad();
    let usuario = obtenerUsuario();


    const response = await fetch("http://localhost:2000/categorias", {
        method: 'PUT',
        headers: {
            "Authorization": token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            nombre: nombre,
            icono: icono,
            fkIdUsuario: usuario.id
        }),
    });

    const datos = await response.json();
    return datos;
}

export async function crearCategoria(nombre, icono) {
    let usuario = obtenerUsuario();
    let token = obtenerTokenDeSeguridad();

    const response = await fetch('http://localhost:2000/categorias', {
        method: 'POST',
        headers: {
            "Authorization": token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nombre,
            icono: icono,
            fkIdUsuario: usuario.id,
        }),
    });

    const datos = await response.json();
    return datos;
}

export async function actualizarUsuario({ id,
    nombre,
    primerApellido,
    segundoApellido,
    fechaNacimiento,
    sexo,
    correo,
    contrasena }) {
    let token = obtenerTokenDeSeguridad();


    const response = await fetch("http://localhost:2000/usuarios", {
        method: 'PUT',
        headers: {
            "Authorization": token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
            nombre,
            primerApellido,
            segundoApellido,
            fechaNacimiento,
            sexo,
            correo,
            contrasena
        })
    });

    const datos = await response.json();
    return datos;

}

export async function borrarDatos() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('tokenDeSeguridad');
}

export async function borrarUsuario() {
    let token = obtenerTokenDeSeguridad();
    let usuario = obtenerUsuario();

    const response = await fetch(`http://localhost:2000/usuarios/${usuario.id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": token,
            'Content-Type': 'application/json',
        },
    });

    const datos = await response.json();
    return datos;
}