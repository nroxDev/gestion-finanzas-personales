<template>
  <h1>APP</h1>
     <InputTexto texto="Nombre de usuario"/>
     <InputTexto texto="Correo electronico"/>
     <InputTexto texto="Contraseña"/>

</template>

<script>
import InputTexto from './components/InputTexto.vue';

export default {
  name: 'App',
  components: {
   
    InputTexto
  }
}
</script>

<style>

</style>
