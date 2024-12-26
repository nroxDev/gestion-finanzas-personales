<template>
    <div>
        <ul class="categorias">
            <li v-for="categoria in categorias" :key="categoria"
                :class="['categoria', { seleccionado: categoria === categoriaSeleccionada }]"
                @click="seleccionarCategoria(categoria)">
                {{ categoria }}
            </li>
        </ul>
        <SeparadorDeElementos />

        <ul class="gastos">
            <li v-for="gasto in gastosFiltrados" :key="gasto.id" class="gastos-li">
                <div class="gasto">
                    <div class="bloque-derecha">
                        <i :class="gasto.icono || 'fas fa-wallet'"></i>
                    </div>
                    <div class="bloque-izquierda">
                        <div class="bloque-izquierda-titulo">
                            <span>{{ gasto.titulo }}</span>
                            <span>€{{ gasto.importe }}</span>
                        </div>
                        <p class="bloque-izquierda-descripcion">
                            {{ gasto.descripcion }}
                        </p>
                        <p class="bloque-izquierda-fecha">
                            {{ new Date(gasto.fecha).toLocaleDateString() }}
                        </p>
                    </div>
                </div>
                <SeparadorDeElementos />
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import SeparadorDeElementos from './SeparadorDeElementos.vue';

export default {
    name: "ListaDeGastosConFiltro",
    components: { SeparadorDeElementos },
    props: {
        categorias: {
            type: Array,
            default: () => ['Todas'],
        },
        gastos: {
            type: Array,
            default: () => [],
        }
    },
    setup(props) {
        const categoriaSeleccionada = ref('Todas'); // Categoría seleccionada por defecto

        const seleccionarCategoria = (categoria) => {
            categoriaSeleccionada.value = categoria; // Actualiza la categoría seleccionada
        };

        const gastosFiltrados = computed(() => {
            if (categoriaSeleccionada.value === 'Todas') {
                return props.gastos;
            }
            return props.gastos.filter(gasto => gasto.categoria === categoriaSeleccionada.value);
        });

        return {
            categoriaSeleccionada,
            seleccionarCategoria,
            gastosFiltrados
        };
    },
};
</script>

<style>
.categorias {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    padding: 0;
}

.categoria {
    color: #5d5d5b;
    font-size: 14px;
    font-family: "Montserrat";
    font-weight: 500;
    line-height: 18px;
    margin-left: 8px;
    cursor: pointer;
}

.categoria.seleccionado {
    color: #080a0b;
    font-size: 14px;
    font-family: "Montserrat";
    font-weight: 700;
    line-height: 18px;
}

.gastos {
    list-style: none;
    padding: 0;
}

.gasto {
    display: flex;
    flex-direction: row;
}

.bloque-derecha {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    color: red;
}

.bloque-izquierda {
    width: 100%;
}

.bloque-izquierda>* {
    margin: 0;
}

.bloque-izquierda-titulo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #080a0b;
    font-size: 16px;
    font-family: "Montserrat";
    font-weight: 700;
    line-height: 22px;
}

.bloque-izquierda-descripcion {
    color: #5d5d5b;
    font-size: 12px;
    font-family: "Montserrat";
    font-weight: 500;
    line-height: 16px;
}

.gastos-li {
    margin-bottom: 16px;
}
</style>