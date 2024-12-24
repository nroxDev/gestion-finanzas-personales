<template>
    <div class="dos-columnas">
      <div class="columna-izquierda" :style="{ width: `${anchoColumnaIzquierda}%` }">
        <slot name="columna-izquierda"></slot>
      </div>
      <div class="columna-derecha" :style="{ width: `${100 - anchoColumnaIzquierda}%` }">
        <slot name="columna-derecha"></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DosColumnas",
    props: {
      anchoColumnaIzquierda: {
        type: Number,
        default: 50,
      },
    },
  };
  </script>
  
  <style scoped>
  .dos-columnas {
    display: flex;
    width: 100%;
  }
  
  .columna-izquierda,
  .columna-derecha {
    padding: 1rem;
  }
  </style>
  