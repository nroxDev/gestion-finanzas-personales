<template>
    <div>
        <p>{{ texto }}</p>

        {{ opcion1 }} 
        <input type="checkbox" :checked="seleccionado === opcion1" @change="handleChange(opcion1)">

        {{ opcion2 }} 
        <input type="checkbox" :checked="seleccionado === opcion2" @change="handleChange(opcion2)">
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: "CheckboxOpciones",
    props: {
        texto: String,
        opcion1: String,
        opcion2: String,
        modelValue: String,
    },
    setup(props, { emit }) {
        const seleccionado = ref(null);

        const handleChange = (opcion) => {
            if (seleccionado.value === opcion) {
                seleccionado.value = null;
            } else {
                emit('update:modelValue', opcion);
                seleccionado.value = opcion;
            }
        };

        return {
            seleccionado,
            handleChange,
        };
    }
}
</script>

<style>
/* Agrega estilos si es necesario */
</style>
