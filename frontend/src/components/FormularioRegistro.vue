<template>
    <CajaSombreada>
    <div class="formularo-registro">
        <h1>Formulario de registro</h1>
        <InputTexto texto="Nombre de usuario" mensaje-de-error="El nombre es invalido solo acepta letras y no puede estar vacio" :patron="patornNombre" />
        <InputTexto texto="Primer Apellido" mensaje-de-error="El Apellido es invalido solo acepta letras y es obligatorio" :patron="patronPrimerApellido" />
        <InputTexto texto="Segundo Apellido" mensaje-de-error="El Segundo Apelldo es invalido solo acepta letras" :patron="patronSegundoApellido" />
        <InputTexto texto="Fecha de nacimiento" mensaje-de-error="Fecha de nacimiento invalida" tipo="date" :patron="patronFecha" />
        <CheckboxOpcions texto="Sexo:" opcion1="M" opcion2="F" />
        <InputTexto texto="Correo Electronico" mensaje-de-error="Formato del correo electronico Incorrecto" tipo="email" :patron="patronEmail"/>
        <InputTexto texto="Contraseña" mensaje-de-error="La contraseña debe contener 6 carácteres 1 simbolo y 1 letra" tipo="password" :patron="patronContraseña" />
        <InputTexto text="Repetir contraseña" mensaje-de-error="La contraseña no coincide" tipo="password" :patron="patronContraseña"/>
        <BotonFormulario texto="Registrarse" />
    </div>
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
    components: { CajaSombreada, CheckboxOpcions, InputTexto, BotonFormulario },
    setup: function () {
        let patornNombre = /^[A-Z][a-zÁáÉéÍíÓóÚúÑñ]+(?:\s[A-Za-zÁáÉéÍíÓóÚúÑñ]+)*$/;
        let patronPrimerApellido = /^[A-Z][a-záéíóúüñ\s]*$/;
        let patronSegundoApellido = /^[A-Z][a-záéíóúüñ\s]*$|^$/
        let patronFecha = /^.*$/;
        let patronEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let patronContraseña = /^(?=.*[a-zA-Z])(?=.*[^\w\s]).{6}$/;





        return {
            patornNombre,
            patronPrimerApellido,
            patronSegundoApellido,
            patronFecha,
            patronEmail,
            patronContraseña
        }
    }
}
</script>
<style>
.formularo-registro {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}  
</style>