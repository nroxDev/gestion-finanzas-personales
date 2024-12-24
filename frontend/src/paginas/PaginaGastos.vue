<template>
  <Plantilla>
    <template #contenido>
      <div>
        <h1>Página de Gastos</h1>
        <p>Bienvenido a la página gastos.</p>
      </div>
    </template>
  </Plantilla>
</template>

<script>
import Plantilla from '@/components/PaginaPlantilla.vue';

export default {
  name: "PaginaGastos",
  components: { Plantilla },
};
</script>