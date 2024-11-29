<template>
    <div class="contenedor">
        <label class="texto">{{ texto }}</label>
        <input 
        class="input" 
        @input="validar" 
        :type="tipo"
        :value="modelValue"
        >
        <span class="error" v-if="tieneError">{{ mensajeDeError }}</span>
    </div>
</template>

<style>
.texto {
    color: #030303;
    font-size: 16px;
    font-family: "Open Sans";
    line-height: 24px;
}

.input {
    width: 436px;
    height: 46px;
    padding: 0px 8px;
    border: 1px solid #d6d6d6;
    box-sizing: border-box;
    border-radius: 24px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
    color: #94a3b8;
    font-size: 14px;
    font-family: "Open Sans";
    line-height: 46px;
    outline: none;
}

.contenedor {
    display: flex;
    flex-direction: column;
    padding: 16px;
}

.error {
    color: red;
}
</style>


<script>
import { ref } from 'vue';

export default {
    name: "InputTexto",
    props: {
        tipo: String,
        texto: String,
        mensajeDeError: String,
        patron: RegExp,
        modelValue: {
            type: String,
            default: '',
        }
    },
    setup: function (props, { emit }) {
        console.log(props)
        let tieneError = ref(false)

        function validar(evento) {
            emit('update:modelValue', evento.target.value);

            if (props.patron.test(evento.target.value)) {
                tieneError.value = false;
            } else {
                tieneError.value = true;
            }
        }



        return {
            tieneError,
            validar
        }



    }
}

</script>
