export function obtenerUsuario() {
    const datos = localStorage.getItem('usuario');

    if (!datos) {
        throw new Error('El usuario no existe');
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
    return 2500.00;
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