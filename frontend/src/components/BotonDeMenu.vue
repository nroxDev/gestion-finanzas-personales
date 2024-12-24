<template>
    <router-link 
      :to="{ name: label.toLowerCase() }" 
      class="boton-de-menu" 
      active-class="seleccionado"
    >
      {{ label }}
    </router-link>
  </template>
  
  <script>
  export default {
    name: "BotonDeMenu",
    props: {
      label: {
        type: String,
        default: "Home",
      },
    },
  };
  </script>
  
  <style scoped>
  .boton-de-menu {
    all: unset;
    width: 200px;
    text-align: center;
    order: solid 1px black;
    padding: 8px;
    text-decoration: none;
    background-color: #ffffff;
    cursor: pointer;
    border-radius: 24px;
    font-family: Montserrat, sans-serif;
    display: inline-block;
  }
  
  .boton-de-menu.seleccionado {
    background-color: #d40100;
    color: white;
  }
  </style>
  