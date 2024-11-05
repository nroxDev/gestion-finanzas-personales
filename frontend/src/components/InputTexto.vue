<template>
    <div class="contenedor">
        <label class="texto">{{ texto }}</label>
        <input class="input" type="text">
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
</style>


<script>
export default {
    name: "InputTexto",
    props: {
        texto: String,
    }
}

</script>
