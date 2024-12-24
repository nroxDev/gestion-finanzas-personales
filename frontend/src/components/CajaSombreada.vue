<template>
    <div :class="['caja-sombreada', clase]">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "CajaSombreada",
    props: {
        clase: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>
.caja-sombreada {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 24px;
    box-shadow: 2px 0px 10px rgba(3, 3, 3, 0.1);
    padding: 16px;
}
</style>
