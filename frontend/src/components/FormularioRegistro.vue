<template>
    <CajaSombreada>
        <h1>Formulario de registro</h1>

        <InputTexto texto="Nombre de usuario" />
        <InputTexto texto="Primer Apellido" />
        <InputTexto texto="Segundo Apellido" />
        <InputTexto texto="Fecha de nacimiento" />
        <CheckboxOpcions texto="Sexo:" opcion1="M" opcion2="F" />
        <InputTexto texto="Correo Electronico" />
        <InputTexto texto="Contraseña" />
        <InputTexto texto="Repetir contraseña" />
        <BotonFormulario texto="Registrarse" />


    </CajaSombreada>

</template>
<script>
import CajaSombreada from './CajaSombreada.vue';
import InputTexto from './InputTexto.vue';
import CheckboxOpcions from './CheckboxOpcions.vue';
import BotonFormulario from './BotonFormulario.vue';

export default {
    name: "FormularioRegistro",
    props: {},
    components: { CajaSombreada, CheckboxOpcions, InputTexto, BotonFormulario }
}
</script>
<style></style>