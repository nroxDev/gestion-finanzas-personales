<template>
    <CajaSombreada>
    <div class="formularo-login">
        <h1>Login</h1>
        <InputTexto texto="Correo Electronico" mensaje-de-error="Formato del correo electronico Incorrecto" tipo="email" :patron="patronEmail" v-model="datosFormulario.correo" />
        <InputTexto texto="Contraseña" mensaje-de-error="La contraseña debe contener 6 carácteres 1 simbolo y 1 letra" tipo="password" :patron="patronContraseña" v-model="datosFormulario.contrasena" />
        <BotonFormulario texto="Entrar" @enviar="onEnviar" />
        <p>¿No tienes cuenta? registrate <a class="link-registro" href="/registro">aquí.</a></p>
    </div>
    </CajaSombreada>
</template>
<script>
import { ref } from 'vue';
import CajaSombreada from './CajaSombreada.vue';
import InputTexto from './InputTexto.vue';
import BotonFormulario from './BotonFormulario.vue';

export default {
    name: "FormularioLogin",
    props: {
        enviar: Function
    },
    components: { CajaSombreada, InputTexto, BotonFormulario },
    setup: function (props) {
        let patronEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let patronContraseña = /^(?=.*[a-zA-Z])(?=.*[^\w\s]).{6}$/;
        const datosFormulario = ref({ correo: '', contrasena: '' })

        function onEnviar() {
            props.enviar({
                ...datosFormulario.value
            })
        }


        return {
            patronEmail,
            patronContraseña,
            onEnviar,
            datosFormulario,
        }
    }
}
</script>
<style>
.formularo-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.link-registro {
    color: #d40100; 
    text-decoration: none;
}
</style>
