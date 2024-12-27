<template>
  <Plantilla>
    <template #contenido>
      <div>
        <h1 class="subtitulo">Gastos</h1>
        <div class="crear-gasto-contenedor">
          <BotonFormulario texto="Crear nuevo gasto" @click="abrirModal" />
        </div>
        <table class="tabla-gastos">
          <thead class="gastos-cabecera">
            <tr>
              <td>Fecha</td>
              <td>Importe</td>
              <td>Descripción</td>
              <td>Categoría</td>
              <td>Acciones</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="gasto in gastos" :key="gasto.id">
              <td>{{ new Date(gasto.fecha).toLocaleDateString() }}</td>
              <td>{{ Number(gasto.importe).toFixed(2) }} €</td>
              <td>{{ gasto.descripcion }}</td>
              <td>{{ gasto.categoria }}</td>
              <td>
                <button @click="eliminarGasto(gasto.gasto_id)" class="btn-eliminar">
                  <i class="fas fa-trash"></i>
                </button>
                <button @click="editarGasto(gasto)" class="btn-editar">
                  <i class="fas fa-edit"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Modal para crear/editar gasto -->
        <div v-if="modalVisible" class="modal-overlay" @click.self="cerrarModal">
          <div class="modal">
            <h2>{{ esEdicion ? 'Editar Gasto' : 'Crear Nuevo Gasto' }}</h2>
            <form @submit.prevent="guardarGasto">
              <label for="fecha">Fecha</label>
              <input type="date" v-model="gastoForm.fecha" required />

              <label for="importe">Importe (€)</label>
              <input v-model="gastoForm.importe" required />

              <label for="descripcion">Descripción</label>
              <input type="text" v-model="gastoForm.descripcion" required />

              <label for="categoria">Categoría</label>
              <select v-model="gastoForm.categoria" required>
                <option v-for="categoria in categorias" :key="categoria" :value="categoria">{{ categoria }}</option>
              </select>

              <div class="modal-buttons">
                <button type="submit" class="btn-guardar">Guardar</button>
                <button type="button" @click="cerrarModal" class="btn-cancelar">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </template>
  </Plantilla>
</template>

<script>
import { crearGasto, obtenerCategorias, obtenerGastos, actualizarGasto, borrarGasto } from '@/api';
import BotonFormulario from '@/components/BotonFormulario.vue';
import Plantilla from '@/components/PaginaPlantilla.vue';
import { onMounted, ref } from 'vue';

export default {
  name: "PaginaGastos",
  components: { Plantilla, BotonFormulario },
  setup() {
    // Lista de categorías
    const categorias = ref([]);

    const gastos = ref([]);

    const datosCategorias = ref([]);

    const modalVisible = ref(false);
    const esEdicion = ref(false);
    const gastoForm = ref({
      id: null,
      fecha: '',
      importe: '',
      descripcion: '',
      categoria: ''
    });

    async function eliminarGasto (id){
      await borrarGasto(id);
      gastos.value = gastos.value.filter(function (gasto) { return gasto.gasto_id !== id });
    }

    const abrirModal = () => {
      modalVisible.value = true;
      esEdicion.value = false;
      gastoForm.value = {
        id: null,
        fecha: '',
        importe: '',
        descripcion: '',
        categoria: ''
      };
    };

    function editarGasto(gasto) {
      modalVisible.value = true;
      esEdicion.value = true;
      gastoForm.value = { ...gasto };
      gastoForm.value.fecha = new Date(gasto.fecha).toISOString().split('T')[0];
    }

    const cerrarModal = () => {
      modalVisible.value = false;
    };

    const guardarGasto = async () => {
      if (esEdicion.value) {
        // Editar el gasto
        const index = gastos.value.findIndex(g => g.id === gastoForm.value.id);
        if (index !== -1) {
          gastos.value[index] = { ...gastoForm.value };
        }
        let idCategoria = datosCategorias.value.find(categoria => categoria.nombre === gastoForm.value.categoria).id

        await actualizarGasto(
          gastoForm.value.gasto_id,
          Number(gastoForm.value.importe),
          gastoForm.value.descripcion,
          gastoForm.value.fecha,
          idCategoria
        )
      } else {
        // Crear un nuevo gasto
        let idCategoria = datosCategorias.value.find(categoria => categoria.nombre === gastoForm.value.categoria).id

       const gastoRespuesta =  await crearGasto(
          gastoForm.value.importe,
          gastoForm.value.descripcion,
          gastoForm.value.fecha,
          idCategoria
        );

        gastoForm.value.id = gastoRespuesta.insertId;

        gastos.value.push({ ...gastoForm.value });
      }
      cerrarModal();
    };

    onMounted(function () {
      async function cargarDatos() {
        let datosGastos = await obtenerGastos();
        datosCategorias.value = await obtenerCategorias();

        datosGastos.sort(function (a, b) {
          const fechaA = new Date(a.fecha);
          const fechaB = new Date(b.fecha);
          return fechaB - fechaA;
        });



        gastos.value = datosGastos;

        categorias.value = datosCategorias.value.map(function (categoria) { return categoria.nombre });

      }

      cargarDatos();
    })

    return {
      categorias,
      gastos,
      eliminarGasto,
      abrirModal,
      editarGasto,
      modalVisible,
      cerrarModal,
      gastoForm,
      esEdicion,
      guardarGasto
    };
  }
};
</script>

<style scoped>
.subtitulo {
  color: #030303;
  font-size: 32px;
  font-family: "Montserrat";
  font-weight: 700;
  line-height: 42px;
}

.gastos-cabecera {
  top: 212px;
  left: 41px;
  width: 1358px;
  height: 63px;
  background-color: rgba(212, 1, 0, 0.7);
  border-radius: 24px;
}

.tabla-gastos {
  width: 100%;
  text-align: center;
  color: #030303;
  font-size: 16px;
  font-family: "Montserrat";
  line-height: 19px;
}

.tabla-gastos td {
  padding: 14px;
}

.tabla-gastos th {
  padding: 0;
}

.tabla-gastos td:first-child,
.tabla-gastos th:first-child {
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
}

.tabla-gastos td:last-child,
.tabla-gastos th:last-child {
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
}

.tabla-gastos td {
  border-bottom: 1px solid #ccc;
  padding: 10px;
}

.btn-eliminar,
.btn-editar {
  background-color: transparent;
  color: #d40100;
  border: none;
  cursor: pointer;
}

.crear-gasto-contenedor {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin: 20px;
  margin-left: 0px;
  max-width: 150px;
  color: white;
  font-size: 16px;
  font-family: "Montserrat";
  line-height: 19px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 24px;
  width: 300px;
}

.modal h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

.modal form {
  display: flex;
  flex-direction: column;
}

.modal label {
  margin-bottom: 5px;
}

.modal input,
.modal select {
  margin-bottom: 15px;
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.modal button {
  background-color: #d40100;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 24px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.modal button[type="button"] {
  background-color: #ccc;
}

.modal button:hover {
  background-color: #b30000;
}

.modal button[type="button"]:hover {
  background-color: #999;
}
</style>
