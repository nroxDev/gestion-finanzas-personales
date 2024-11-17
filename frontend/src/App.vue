<template>
  <CajaSombreada>
    <h1>APP</h1>
    <InputTexto texto="Nombre de usuario" />
    <InputTexto texto="Correo electronico" />
    <InputTexto texto="Contraseña" />

    <CheckboxOpcions texto="Sexo:" opcion1="M" opcion2="F"/>

    <CheckboxOpcions texto="MAcota favorita:" opcion1="pirulo" opcion2="Kismet"/>


    <BotonFormulario texto="Registrase" />
  </CajaSombreada>

</template>

<script>
import InputTexto from './components/InputTexto.vue';
import BotonFormulario from './components/BotonFormulario.vue';
import CajaSombreada from './components/CajaSombreada.vue';
import CheckboxOpcions from './components/CheckboxOpcions.vue';

export default {
  name: 'App',
  components: {
    InputTexto,
    BotonFormulario,
    CajaSombreada,
    CheckboxOpcions
  }
}
</script>

<style></style>
