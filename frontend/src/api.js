export function obtenerUsuario() {
    const datos = sessionStorage.getItem('usuario');

    if(!datos) {
        throw new Error('El usuario no existe');
    }
    const usuario = JSON.parse(datos);
    return usuario
}

export function obtenerTokenDeSeguridad () {
  let token = sessionStorage.getItem('tokenDeSeguridad');

  if(!token) {
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