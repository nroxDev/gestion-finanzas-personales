<template>
    <button  @click="onEnviar" class="boton-formulario">{{ texto }}</button>
</template>


<script>
export default {
    name: 'BotonFormulario',
    props: {
        texto: String,
        onEnviar: Function,
    }
}
</script>


<style>
.boton-formulario {
    cursor: pointer;
    width: 436px;
    height: 44px;
    padding: 0px 8px;
    border: 0;
    box-sizing: border-box;
    border-radius: 24px;
    background-color: #d40100;
    color: #ffffff;
    font-size: 14px;
    font-family: "Open Sans";
    font-weight: 600;
    line-height: 20px;
    outline: none;
}
</style>