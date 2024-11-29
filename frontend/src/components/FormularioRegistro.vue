<template>
    <CajaSombreada>
    <div class="formularo-registro">
        <h1>Formulario de registro</h1>
        <InputTexto texto="Nombre de usuario" mensaje-de-error="El nombre es invalido solo acepta letras y no puede estar vacio" :patron="patornNombre" v-model="datosFormulario.nombre" />
        <InputTexto texto="Primer Apellido" mensaje-de-error="El Apellido es invalido solo acepta letras y es obligatorio" :patron="patronPrimerApellido" v-model="datosFormulario.primerApellido" />
        <InputTexto texto="Segundo Apellido" mensaje-de-error="El Segundo Apelldo es invalido solo acepta letras" :patron="patronSegundoApellido"  v-model="datosFormulario.segundoApellido" />
        <InputTexto texto="Fecha de nacimiento" mensaje-de-error="Fecha de nacimiento invalida" tipo="date" :patron="patronFecha" v-model="datosFormulario.fechaNacimiento" />
        <CheckboxOpcions texto="Sexo:" opcion1="M" opcion2="F" v-model="datosFormulario.sexo" />
        <InputTexto texto="Correo Electronico" mensaje-de-error="Formato del correo electronico Incorrecto" tipo="email" :patron="patronEmail" v-model="datosFormulario.correo" />
        <InputTexto texto="Contraseña" mensaje-de-error="La contraseña debe contener 6 carácteres 1 simbolo y 1 letra" tipo="password" :patron="patronContraseña" v-model="datosFormulario.contrasena" />
        <InputTexto text="Repetir contraseña" mensaje-de-error="La contraseña no coincide" tipo="password" :patron="patronContraseña"  v-model="datosFormulario.repetirContrasena" />
        <BotonFormulario texto="Registrarse" @enviar="onEnviar" />
    </div>
    </CajaSombreada>
</template>
<script>
import { ref } from 'vue';
import CajaSombreada from './CajaSombreada.vue';
import InputTexto from './InputTexto.vue';
import CheckboxOpcions from './CheckboxOpcions.vue';
import BotonFormulario from './BotonFormulario.vue';

export default {
    name: "FormularioRegistro",
    props: {
        enviar: Function
    },
    components: { CajaSombreada, CheckboxOpcions, InputTexto, BotonFormulario },
    setup: function (props) {
        let patornNombre = /^[A-Z][a-zÁáÉéÍíÓóÚúÑñ]+(?:\s[A-Za-zÁáÉéÍíÓóÚúÑñ]+)*$/;
        let patronPrimerApellido = /^[A-Z][a-záéíóúüñ\s]*$/;
        let patronSegundoApellido = /^[A-Z][a-záéíóúüñ\s]*$|^$/
        let patronFecha = /^.*$/;
        let patronEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let patronContraseña = /^(?=.*[a-zA-Z])(?=.*[^\w\s]).{6}$/;


        const datosFormulario = ref({
            nombre: '',
            primerApellido: '',
            segundoApellido: '',
            fechaNacimiento: '',
            correo: '',
            sexo: '',
            contrasena: '',
            repetirContrasena: '',
        })


        function onEnviar() {
            props.enviar({
                ...datosFormulario.value
            })
        }


        return {
            patornNombre,
            patronPrimerApellido,
            patronSegundoApellido,
            patronFecha,
            patronEmail,
            patronContraseña,
            onEnviar,
            datosFormulario,
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