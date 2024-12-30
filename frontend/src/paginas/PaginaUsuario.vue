<template>
  <Plantilla>
    <template #contenido>
      <div class="contenedor">

        <h1>Datos económicos</h1>

        <form @submit.prevent="guardarDatosEconomicos" class="datos-economicos">
          <label for="ingreso-mensual">Ingreso Mensual</label>
          <input type="text" id="ingresoMensual" v-model="importe.ingresoMensual" class="formulario-control" required />
          <button type="submit" class="enviar">
            Guardar Cambios
          </button>
        </form>


        <h1 class="texto-centro">Datos de Usuario</h1>
        <div class="tarjeta">
          <form @submit.prevent="guardarUsuario">
            <!-- Nombre -->
            <div class="grupo-formulario">
              <label for="nombre">Nombre</label>
              <input type="text" id="nombre" v-model="usuario.nombre" class="formulario-control" required />
            </div>

            <!-- Primer Apellido -->
            <div class="grupo-formulario">
              <label for="primer_apellido">Primer Apellido</label>
              <input type="text" id="primer_apellido" v-model="usuario.primer_apellido" class="formulario-control"
                required />
            </div>

            <!-- Segundo Apellido -->
            <div class="grupo-formulario">
              <label for="segundo_apellido">Segundo Apellido</label>
              <input type="text" id="segundo_apellido" v-model="usuario.segundo_apellido" class="formulario-control" />
            </div>

            <!-- Fecha de Nacimiento -->
            <div class="grupo-formulario">
              <label for="fecha_nacimiento">Fecha de Nacimiento</label>
              <input type="date" id="fecha_nacimiento" v-model="usuario.fecha_nacimiento" class="formulario-control"
                required />
            </div>

            <!-- Sexo -->
            <div class="grupo-formulario">
              <label for="sexo">Sexo</label>
              <select id="sexo" v-model="usuario.sexo" class="formulario-control" required>
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
              </select>
            </div>

            <!-- Correo Electrónico -->
            <div class="grupo-formulario">
              <label for="correo_electronico">Correo Electrónico</label>
              <input type="email" id="correo_electronico" v-model="usuario.correo_electronico"
                class="formulario-control" required />
            </div>

            <!-- Checkbox para mostrar el cambio de contraseña -->
            <div class="check-formulario">
              <input type="checkbox" id="cambiar_contrasena" v-model="mostrarCambioContrasena"
                class="check-formulario-entrada" />
              <label class="check-formulario-etiqueta" for="cambiar_contrasena">
                Cambiar Contraseña
              </label>
            </div>

            <!-- Sección de cambio de contraseña, solo visible si el checkbox está marcado -->
            <div v-if="mostrarCambioContrasena">
              <h4>Cambiar Contraseña</h4>

              <div class="grupo-formulario">
                <label for="contrasena_actual">Contraseña Actual</label>
                <input type="password" id="contrasena_actual" v-model="cambioContrasena.contrasenaActual"
                  class="formulario-control" required />
              </div>

              <div class="grupo-formulario">
                <label for="nueva_contrasena">Nueva Contraseña</label>
                <input type="password" id="nueva_contrasena" v-model="cambioContrasena.nuevaContrasena"
                  class="formulario-control" :pattern="contrasenaPattern" required />
                <div v-if="cambioContrasena.nuevaContrasena && !contrasenaValida" class="alerta-error">
                  La contraseña debe contener al menos 6 caracteres, una letra y un carácter especial.
                </div>
              </div>

              <div class="grupo-formulario">
                <label for="repetir_nueva_contrasena">Repetir Nueva Contraseña</label>
                <input type="password" id="repetir_nueva_contrasena" v-model="cambioContrasena.repetirNuevaContrasena"
                  class="formulario-control" required />
              </div>

              <div v-if="contrasenaNoCoincide" class="alerta-error">
                Las contraseñas no coinciden.
              </div>
            </div>

            <!-- Botón Guardar -->
            <button type="submit" class="enviar">
              Guardar Cambios
            </button>
          </form>
        </div>
        <div class="baja">
          <button type="submit" class="btn-baja" @click="elminarDatos">
            ELIMINAR TODOS MIS DATOS
          </button>

        </div>
      </div>
    </template>
  </Plantilla>
</template>

<script>
import { obtenerUsuario, actualizarUsuario, obtenerIngresoMensual, darIngresoMensual, borrarUsuario, borrarDatos } from "@/api";
import Plantilla from "@/components/PaginaPlantilla.vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "PaginaUsuario",
  components: { Plantilla },
  setup() {
    let router = useRouter();

    const usuario = ref({
      id: null,
      nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      fecha_nacimiento: "",
      sexo: "",
      correo_electronico: "",
      contrasena: "",
    });

    const importe = ref({
      ingresoMensual: 0
    })

    const mostrarCambioContrasena = ref(false);

    const cambioContrasena = ref({
      contrasenaActual: "",
      nuevaContrasena: "",
      repetirNuevaContrasena: "",
    });

    const contrasenaNoCoincide = computed(() => {
      return cambioContrasena.value.nuevaContrasena !== cambioContrasena.value.repetirNuevaContrasena;
    });

    const contrasenaPattern = "^(?=.*[a-zA-Z])(?=.*[^ws]).{6}$"; // Expresión regular para validar la contraseña

    const contrasenaValida = computed(() => {
      return new RegExp(contrasenaPattern).test(cambioContrasena.value.nuevaContrasena);
    });

    // Cargar los datos del usuario
    const cargarUsuario = async () => {
      try {
        const data = await obtenerUsuario();

        // Asegurarse de que la fecha esté en el formato YYYY-MM-DD
        if (data.fecha_nacimiento) {
          data.fecha_nacimiento = new Date(data.fecha_nacimiento).toISOString().split('T')[0];
        }

        Object.assign(usuario.value, data);
      } catch (error) {
        console.error("Error al cargar el usuario:", error);
      }
    };

    async function guardarDatosEconomicos() {
      await darIngresoMensual(importe.value.ingresoMensual);
    }

    // Guardar los cambios del usuario
    const guardarUsuario = async () => {
      try {
        // Asegúrate de que la fecha esté en el formato correcto antes de enviarla
        if (usuario.value.fecha_nacimiento) {
          usuario.value.fecha_nacimiento = new Date(usuario.value.fecha_nacimiento).toISOString().split('T')[0];
        }

        let usuarioGuardado = await obtenerUsuario();

        let datosCompletosDeUsuario = {
          ...usuarioGuardado,
          ...usuario.value,
        }

        if (mostrarCambioContrasena.value) {
          datosCompletosDeUsuario.contrasena = cambioContrasena.value.nuevaContrasena;
        }

        const respuesta = await actualizarUsuario({
          id: usuarioGuardado.id,
          nombre: datosCompletosDeUsuario.nombre,
          primerApellido: datosCompletosDeUsuario.primer_apellido,
          segundoApellido: datosCompletosDeUsuario.segundo_apellido,
          fechaNacimiento: datosCompletosDeUsuario.fecha_nacimiento.split('T')[0],
          sexo: datosCompletosDeUsuario.sexo,
          correo: datosCompletosDeUsuario.correo_electronico,
          contrasena: datosCompletosDeUsuario.contrasena
        });

        localStorage.setItem('usuario', JSON.stringify(respuesta.usuario))


        if (respuesta.ok) {
          alert("Usuario actualizado con éxito");
        } else {
          console.error("Error al actualizar el usuario");
        }

      } catch (error) {
        console.error("Error al guardar el usuario:", error);
      }
    };

    async function elminarDatos () {
      const confirmacion = confirm("¿Está seguro que desea darse de baja?");
      if (confirmacion) {
        await borrarUsuario();
        borrarDatos();
        router.push({ name: 'registro'})

      }

    }

    onMounted(() => {
      async function cargarDatos() {
        importe.value.ingresoMensual = await obtenerIngresoMensual();
      }
      cargarDatos();
      cargarUsuario();
    });

    return {
      usuario,
      importe,
      mostrarCambioContrasena,
      cambioContrasena,
      contrasenaNoCoincide,
      contrasenaValida,
      contrasenaPattern,
      guardarUsuario,
      guardarDatosEconomicos,
      elminarDatos
    };
  },
};
</script>

<style scoped>
.contenedor {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.texto-centro {
  text-align: center;
}

.tarjeta {
  border-radius: 8px;
  background-color: #fff;
  width: 100%;
}

.grupo-formulario {
  width: 100%;
  margin-bottom: 15px;
}

.formulario-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

select.formulario-control {
  width: 100%;
}

.btn {
  padding: 10px 20px;
  font-size: 18px;
  width: 100%;
}

.mt-4 {
  margin-top: 20px;
}

.alerta-error {
  color: #f44336;
  padding: 10px;
  border-radius: 4px;
}

.check-formulario {
  margin-bottom: 15px;
}

.check-formulario-entrada {
  margin-right: 10px;
}

.check-formulario-etiqueta {
  font-size: 16px;
}

.enviar {
  background-color: #d40100;
  color: white;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-size: 16px;
  display: block;
  padding: 20px;
}

.datos-economicos {
  display: flex;
  flex-direction: column;
  height: 143px;
  align-items: center;
  justify-content: space-around;
}

.btn-baja {
  width: 100%;
  border-radius: 24px;
  background-color: red;
  color: #fff;
  height: 50px;
  border: none;
  cursor: pointer;

}
.baja {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 16px;
  padding: 16px;

}
</style>
