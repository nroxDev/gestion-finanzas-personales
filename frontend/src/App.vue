<template>
  <CajaSombreada>
    <h1>APP</h1>
    <InputTexto texto="Nombre de usuario" />
    <InputTexto texto="Correo electronico" />
    <InputTexto texto="Contraseña" />
    <BotonFormulario texto="Registrase" />
  </CajaSombreada>

</template>

<script>
import InputTexto from './components/InputTexto.vue';
import BotonFormulario from './components/BotonFormulario.vue';
import CajaSombreada from './components/CajaSombreada.vue';

export default {
  name: 'App',
  components: {
    InputTexto,
    BotonFormulario,
    CajaSombreada
  }
}
</script>

<style></style>
