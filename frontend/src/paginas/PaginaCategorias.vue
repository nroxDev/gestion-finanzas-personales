<template>
  <Plantilla>
    <template #contenido>
      <div>
        <h1>Página de Categorias</h1>
        <p>Bienvenido a la página categorias.</p>
      </div>
    </template>
  </Plantilla>
</template>

<script>
import Plantilla from '@/components/PaginaPlantilla.vue';

export default {
  name: "PaginaCategorias",
  components: { Plantilla },
};
</script>