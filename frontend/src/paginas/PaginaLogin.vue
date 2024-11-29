<template>
  <div class="pagina-login">
    <FormularioLogin :enviar="entrar" />
    <p v-if="mensajeDeError">{{ mensajeDeError }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormularioLogin from '@/components/FormularioLogin.vue';

export default {
  name: 'PaginaLogin',
  components: {
    FormularioLogin
  },
  setup() {
    let mensajeDeError = ref('');
    let router = useRouter();


    async function entrar(datos) {
      console.log(datos);

      let peticion = await fetch('http://localhost:2000/autorizacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });


      let respuesta = await peticion.json();

      if(respuesta.error) {
        mensajeDeError.value = respuesta.error;
      }else {
        localStorage.setItem('tokenDeSeguridad', respuesta.token)
        router.push({ name: 'inicio' })
      }
    }


    return {
      entrar,
      mensajeDeError,
    }

  }
}
</script>

<style>
.pagina-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
