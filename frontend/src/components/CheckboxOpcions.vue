<template>
    <div>
        <p>{{ texto }}</p>

        {{ opcion1 }} <input type="checkbox">
        
        {{ opcion2 }}<input type="checkbox">
    </div>
</template>

<script>
export default {
    name: "CheckboxOpciones",
    props: {
        texto: String,
        opcion1: String,
        opcion2: String,
    },
}
</script>

<style></style>