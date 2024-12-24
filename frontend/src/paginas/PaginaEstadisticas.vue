<template>
  <Plantilla>
    <template #contenido>
      <div>
        <h1>Página de Estadisticas</h1>
        <p>Bienvenido a la página estadisticas.</p>
      </div>
    </template>
  </Plantilla>
</template>

<script>
import Plantilla from '@/components/PaginaPlantilla.vue';

export default {
  name: "PaginaEstadisticas",
  components: { Plantilla },
};
</script>