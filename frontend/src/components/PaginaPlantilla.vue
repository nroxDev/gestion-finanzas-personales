<template>
  <div class="plantilla">
    <aside class="menu">
      <div class="encabezado-del-menu">
        <div class="titulo-del-menu">
          <span class="titulo">Mis Finanzas Personales</span>
          <div class="icono-de-usuario" @click="irAlaPaginaDeUsuario"><i class="fas fa-user usuario-personalizado"></i>
          </div>
        </div>
      </div>

      <ul class="menu-de-botonos">
        <li>
          <BotonDeMenu label="Inicio" />
        </li>
        <li>
          <BotonDeMenu label="Gastos" />
        </li>
        <li>
          <BotonDeMenu label="Categorias" />
        </li>
        <li>
          <BotonDeMenu label="Estadisticas" />
        </li>
      </ul>

      <button class="boton-salir" @click="salir">Salir</button>
    </aside>

    <main class="contenido">
      <slot name="contenido"></slot>
    </main>
  </div>
</template>

<script>
import BotonDeMenu from "@/components/BotonDeMenu.vue";
import { useRouter } from 'vue-router';


export default {
  name: "PaginaPlantilla",
  components: { BotonDeMenu },
  setup() {
    let router = useRouter();

    function salir() {
      router.push({ name: 'login' })
    }

    function irAlaPaginaDeUsuario() {
      router.push({ name: 'usuario' })
    }


    return {
      salir,
      irAlaPaginaDeUsuario
    }
  }
};
</script>

<style scoped>
.plantilla {
  display: flex;
  height: 100vh;
}

.menu {
  width: 15%;
  background-color: #f2cece;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  min-width: 250px;

}

.encabezado-del-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: 16px;
}

.titulo-del-menu {
  display: flex;
  align-items: center;
}

.titulo {
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}

.icono-de-usuario {
  background-color: #ccc;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
}

.menu-de-botonos {
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 72px;
}

.menu-de-botonos li {
  margin-bottom: 1rem;
}

.boton-salir {
  position: absolute;
  background-color: #d40100;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  bottom: 24px;
}

.boton-salir:hover {
  background-color: #a30000;
}

.contenido {
  width: 75%;
  padding: 2rem;
  overflow-y: auto;
}

.titulo {
  color: #030303;
  font-family: "Montserrat";
  font-weight: 700;
  line-height: 24px;
}

.usuario-personalizado {
  color: #d40100;
}
</style>
