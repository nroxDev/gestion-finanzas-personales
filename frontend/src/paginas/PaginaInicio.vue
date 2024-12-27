<template>
  <Plantilla>
    <template #contenido>
      <DosColumnas :anchoColumnaIzquierda="60">
        <template #columna-izquierda>
          <div>
            <h1 class="subtitulo">Resumen de Gastos</h1>

            <div class="total-gastos-del-mes">
              <CajaSombreada>
                <p class="descripcion">Total de gastos en el mes</p>
                <h2 class="precio">€{{ totalGastos }}</h2>
              </CajaSombreada>
            </div>

            <div class="gastos-del-mes">
              <h2 class="subtitulo">Visión general de este mes</h2>
              <div class="contenedor-tipos">
                <CajaSombreada clase="tipos">
                  <div class="descripcion-tipos">
                    <i class="fas fa-money-bill-wave icono-tipo"></i>
                    <p class="descripcion">Esta semana</p>
                  </div>
                  <p class="importe">€{{ gastoEnLaSemana }}</p>
                </CajaSombreada>

                <CajaSombreada clase="tipos">
                  <div class="descripcion-tipos">
                    <i class="fas fa-wallet icono-tipo"></i>
                    <p class="descripcion">Saldo</p>
                  </div>
                  <p class="importe">€{{ saldo }}</p>
                </CajaSombreada>

                <CajaSombreada clase="tipos">
                  <div class="descripcion-tipos">
                    <i class="fas fa-arrow-up icono-tipo"></i>
                    <p class="descripcion">Ingreso Mensual</p>
                  </div>
                  <p class="importe">€{{ ingresoMensual }}</p>
                </CajaSombreada>
              </div>
            </div>

            <div class="grafica-gastos-por-categoria">
              <h2 class="subtitulo">Análisis de gastos mensual</h2>
              <CajaSombreada>
                <Pie :data="datosGrafica" :options="opcionesDeGrafica" />
              </CajaSombreada>
            </div>
          </div>
        </template>

        <template #columna-derecha>
          <h2 class="subtitulo">Últimos Gastos del mes</h2>
          <ListaDeGastosConFiltro :categorias="categorias" :gastos="ultimosGastos" />
        </template>
      </DosColumnas>
    </template>
  </Plantilla>
</template>

<script>
import { obtenerCategorias, obtenerGastos, obtenerIngresoMensual } from '@/api';
import CajaSombreada from '@/components/CajaSombreada.vue';
import DosColumnas from '@/components/DosColumnas.vue';
import ListaDeGastosConFiltro from '@/components/ListaDeGastosConFiltro.vue';
import Plantilla from '@/components/PaginaPlantilla.vue';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { onMounted, ref } from 'vue';
import { Pie } from 'vue-chartjs';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default {
  name: "PaginaInicio",
  components: { DosColumnas, Plantilla, CajaSombreada, ListaDeGastosConFiltro, Pie },
  setup() {
    let categorias = ref([]);
    let ultimosGastos = ref([]);
    let totalGastosMensual = ref(0);
    let gastoEnLaSemana = ref(0);
    let ingresoMensual = ref(0);
    let saldo = ref(0);

    let datosDeGrafica = ref({
      labels: categorias.value,
      datasets: [{
        label: 'Por categoría',
        data: [],
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#F3A833'],
      }],
    });


    onMounted(() => {
      async function rellenarDatos() {
        const datosCategorias = await obtenerCategorias();
        const datosGastos = await obtenerGastos();

        categorias.value = datosCategorias.map(function (categoria) { return categoria.nombre });

        ultimosGastos.value = datosGastos.filter(gasto => {
          const ahora = new Date();
          const mesActual = ahora.getMonth();
          const anioActual = ahora.getFullYear();
          const fechaGasto = new Date(gasto.fecha);
          return fechaGasto.getMonth() === mesActual && fechaGasto.getFullYear() === anioActual;
        });

        let gastosDelaSemana = datosGastos.filter(gasto => {
          const ahora = new Date();
          const inicioDeLaSemana = new Date(ahora);
          inicioDeLaSemana.setDate(ahora.getDate() - ahora.getDay()); // Ajusta el día actual al domingo
          const finDeLaSemana = new Date(inicioDeLaSemana);
          finDeLaSemana.setDate(inicioDeLaSemana.getDate() + 6); // Suma 6 días al domingo
          const fechaGasto = new Date(gasto.fecha);
          return fechaGasto >= inicioDeLaSemana && fechaGasto <= finDeLaSemana;
        });

        let sumaGastosDeLaSemana = gastosDelaSemana.reduce((acc, gasto) => acc + Number(gasto.importe), 0);

        totalGastosMensual.value = ultimosGastos.value.reduce((acc, gasto) => acc + Number(gasto.importe), 0);

        gastoEnLaSemana.value = sumaGastosDeLaSemana;

        ingresoMensual.value = await obtenerIngresoMensual();

        saldo.value = ingresoMensual.value - totalGastosMensual.value;
        saldo.value = saldo.value.toFixed(2);

        // Actualizar los datos de la gráfica con los datos de los gastos por categoría
        const gastosPorCategoria = datosCategorias.map(categoria => {
          const gastosCategoria = datosGastos.filter(gasto => gasto.categoria === categoria.nombre);
          return gastosCategoria.reduce((total, gasto) => total + Number(gasto.importe), 0);
        });

        // Actualizar los datos de la gráfica
        datosDeGrafica.value = {
          labels: categorias.value,
          datasets: [{
            label: 'Por categoría',
            data: gastosPorCategoria,
            backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#F3A833'],
          }],
        };
      }

      rellenarDatos();

    })


    return {
      categorias: categorias,
      ultimosGastos: ultimosGastos,
      totalGastos: totalGastosMensual,
      gastoEnLaSemana: gastoEnLaSemana,
      saldo: saldo,
      ingresoMensual: ingresoMensual,
      datosGrafica: datosDeGrafica,
      opcionesDeGrafica: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return '€' + tooltipItem.raw; // Esto sigue mostrando el valor en el tooltip
              }
            }
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.subtitulo {
  color: #080a0b;
  font-size: 20px;
  font-family: "Montserrat";
  font-weight: 700;
  line-height: 24px;
}

.precio {
  color: #080a0b;
  font-size: 48px;
  font-family: "Montserrat";
  font-weight: 700;
  line-height: 56px;
  margin: 0px;
}

.descripcion {
  margin: 0px;
  margin-left: 8px;
}

.tipos {
  max-width: 300px;
  width: 250px;
  margin-right: 5px;
}

.contenedor-tipos {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.importe {
  color: #080a0b;
  font-size: 16px;
  font-family: "Montserrat";
  font-weight: 700;
  line-height: 22px;
  margin: 0;
}

.icono-tipo {
  color: #d40100;
}

.descripcion-tipos {
  display: flex;
  flex-direction: row;
}

.grafica-gastos-por-categoria {
  margin-top: 20px;
}
</style>
