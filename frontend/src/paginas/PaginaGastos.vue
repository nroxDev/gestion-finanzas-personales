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
                <button @click="eliminarGasto(gasto.id)" class="btn-eliminar">
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
import BotonFormulario from '@/components/BotonFormulario.vue';
import Plantilla from '@/components/PaginaPlantilla.vue';
import { ref } from 'vue';

export default {
  name: "PaginaGastos",
  components: { Plantilla, BotonFormulario },
  setup() {
    // Lista de categorías
    const categorias = ref([
      "Casa",
      "Supermercado",
      "Transporte",
      "Entretenimiento",
      "Salud"
    ]);

    const gastos = ref([
      {
        id: 1,
        titulo: "Compra supermercado",
        importe: 45.20,
        fecha: "2024-01-20T14:30:00Z",
        categoria: "Casa",
        descripcion: "Compra de alimentos y productos de limpieza",
        icono: "fas fa-shopping-cart"
      },
      // (Resto de los gastos...)
    ]);

    const modalVisible = ref(false);
    const esEdicion = ref(false);
    const gastoForm = ref({
      id: null,
      fecha: '',
      importe: '',
      descripcion: '',
      categoria: ''
    });

    const eliminarGasto = (id) => {
      gastos.value = gastos.value.filter(gasto => gasto.id !== id);
    };

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

    const editarGasto = (gasto) => {
      modalVisible.value = true;
      esEdicion.value = true;
      gastoForm.value = { ...gasto };
      
      // Convertir la fecha al formato adecuado para el input tipo date
      gastoForm.value.fecha = new Date(gasto.fecha).toISOString().split('T')[0];
    };

    const cerrarModal = () => {
      modalVisible.value = false;
    };

    const guardarGasto = () => {
      if (esEdicion.value) {
        // Editar el gasto
        const index = gastos.value.findIndex(g => g.id === gastoForm.value.id);
        if (index !== -1) {
          gastos.value[index] = { ...gastoForm.value };
        }
      } else {
        // Crear un nuevo gasto
        gastoForm.value.id = Date.now();
        gastos.value.push({ ...gastoForm.value });
      }
      cerrarModal();
    };

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
