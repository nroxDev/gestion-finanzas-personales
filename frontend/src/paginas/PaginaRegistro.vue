<template>
    <div class="pagina-registro">
        <FormularioRegistro :enviar="enviar"/>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import FormularioRegistro from '@/components/FormularioRegistro.vue';

export default {
    name: 'PaginaRegistro',
    components: {
        FormularioRegistro
    },
    setup() {
        let router = useRouter();

        async function enviar(datos) {
            console.log('datos', datos);


            let peticion = await fetch('http://localhost:2000/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos),
            });

            let respuesta = await peticion.json();

            if(respuesta.error) {
                alert(`Datos con Error ${respuesta.error}`)
            }else {
                router.push({ name: 'login' })
            }
        }

        return {
            enviar
        }
    }
}


</script>

<style>
.pagina-registro {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    margin: 20px;
}

</style>