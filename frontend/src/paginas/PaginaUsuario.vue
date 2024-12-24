<template>
  <Plantilla>
    <template #contenido>
      <div>
        <h1>Página de Usuario</h1>
        <p>Usuario.</p>
      </div>
    </template>
  </Plantilla>
</template>

<script>
import Plantilla from '@/components/PaginaPlantilla.vue';

export default {
  name: "PaginaUsuario",
  components: { Plantilla },
};
</script>