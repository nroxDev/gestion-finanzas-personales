<template>
  <Plantilla>
    <template #contenido>
      <div>
        <h1 class="subtitulo">Categorías</h1>
        <div class="crear-categoria-contenedor">
          <BotonFormulario texto="Crear nueva categoría" @click="abrirModal" />
        </div>
        <div class="categorias-contenedor">
          <div v-for="categoria in categorias" :key="categoria.id" class="categoria-card">
            <div class="categoria-header">
              <i :class="categoria.icono" class="categoria-icono"></i>
              <h3>{{ categoria.nombre }}</h3>
            </div>
            <div class="categoria-actions">
              <button @click="editarCategoria(categoria)" class="btn-editar">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button @click="eliminarCategoria(categoria.id)" class="btn-eliminar">
                <i class="fas fa-trash"></i> Eliminar
              </button>
            </div>
          </div>
        </div>

        <!-- Modal para crear/editar categoría -->
        <div v-if="modalVisible" class="modal-overlay" @click.self="cerrarModal">
          <div class="modal">
            <h2>{{ esEdicion ? 'Editar Categoría' : 'Crear Nueva Categoría' }}</h2>
            <form @submit.prevent="guardarCategoria">
              <label for="nombre">Nombre</label>
              <input type="text" v-model="categoriaForm.nombre" required />

              <label for="icono">Seleccionar Icono</label>
              <div class="iconos-grid">
                <div 
                  v-for="icono in iconosDisponibles" 
                  :key="icono" 
                  class="icono-selector"
                  :class="{'selected': categoriaForm.icono === icono}"
                  @click="categoriaForm.icono = icono">
                  <i :class="icono" class="icono"></i>
                </div>
              </div>

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
  name: "PaginaCategorias",
  components: { Plantilla, BotonFormulario },
  setup() {
    // Lista de iconos disponibles (FontAwesome)
    const iconosDisponibles = ref([
  'fas fa-home', 'fas fa-shopping-cart', 'fas fa-car', 'fas fa-film', 'fas fa-heartbeat',
  'fas fa-laptop', 'fas fa-bicycle', 'fas fa-users', 'fas fa-utensils', 'fas fa-sun',
  'fas fa-plane', 'fas fa-cogs', 'fas fa-archive', 'fas fa-paint-brush', 'fas fa-apple-alt',
  'fas fa-mobile-alt', 'fas fa-cloud', 'fas fa-tree', 'fas fa-dumbbell', 'fas fa-book',
  'fas fa-bed', 'fas fa-briefcase', 'fas fa-coffee', 'fas fa-headphones', 'fas fa-glass-martini',
  'fas fa-lightbulb', 'fas fa-trophy', 'fas fa-calendar-alt', 'fas fa-pencil-alt', 'fas fa-map-marker-alt',
  'fas fa-clock', 'fas fa-credit-card', 'fas fa-luggage-cart', 'fas fa-wifi', 'fas fa-search'
])

    // Lista de categorías con nombre, icono y id
    const categorias = ref([
      { id: 1, nombre: "Casa", icono: "fas fa-home" },
      { id: 2, nombre: "Supermercado", icono: "fas fa-shopping-cart" },
      { id: 3, nombre: "Transporte", icono: "fas fa-car" },
      { id: 4, nombre: "Entretenimiento", icono: "fas fa-film" },
      { id: 5, nombre: "Salud", icono: "fas fa-heartbeat" }
    ]);

    const modalVisible = ref(false);
    const esEdicion = ref(false);
    const categoriaForm = ref({
      id: null,
      nombre: '',
      icono: ''
    });

    const eliminarCategoria = (id) => {
      categorias.value = categorias.value.filter(categoria => categoria.id !== id);
    };

    const abrirModal = () => {
      modalVisible.value = true;
      esEdicion.value = false;
      categoriaForm.value = {
        id: null,
        nombre: '',
        icono: ''
      };
    };

    const editarCategoria = (categoria) => {
      modalVisible.value = true;
      esEdicion.value = true;
      categoriaForm.value = { ...categoria };
    };

    const cerrarModal = () => {
      modalVisible.value = false;
    };

    const guardarCategoria = () => {
      if (esEdicion.value) {
        // Editar categoría
        const index = categorias.value.findIndex(c => c.id === categoriaForm.value.id);
        if (index !== -1) {
          categorias.value[index] = { ...categoriaForm.value };
        }
      } else {
        // Crear nueva categoría
        categoriaForm.value.id = Date.now();
        categorias.value.push({ ...categoriaForm.value });
      }
      cerrarModal();
    };

    return { 
      categorias, 
      eliminarCategoria, 
      abrirModal, 
      editarCategoria, 
      modalVisible, 
      cerrarModal, 
      categoriaForm, 
      esEdicion, 
      guardarCategoria, 
      iconosDisponibles 
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

.crear-categoria-contenedor {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin: 20px;
  margin-left: 0px;
  max-width: 150px;
}

.categorias-contenedor {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.categoria-card {
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.categoria-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
}

.categoria-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.categoria-icono {
  font-size: 30px;
  color: #d40100;
}

.categoria-card h3 {
  font-size: 20px;
  font-family: "Montserrat";
  font-weight: 600;
  margin: 0;
}

.categoria-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.btn-editar,
.btn-eliminar {
  background-color: transparent;
  border: 1px solid #d40100;
  color: #d40100;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s;
}

.btn-editar:hover,
.btn-eliminar:hover {
  background-color: #d40100;
  color: white;
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

.iconos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

.icono-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  transition: transform 0.3s ease, border 0.3s ease;
}

.icono-selector:hover {
  transform: scale(1.1);
  border-color: #d40100;
}

.selected {
  background-color: #d40100;
  color: white;
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
