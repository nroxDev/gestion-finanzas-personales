<template>
  <Plantilla>
    <template #contenido>
      <DosColumnas :anchoColumnaIzquierda="60">
        <template #columna-izquierda>
          <div>
            <h1 class="subtitulo">Estadísticas de Gastos</h1>
            <div class="grafica-distribucion-categorias">
              <h2 class="subtitulo">Distribución de Gastos</h2>
              <CajaSombreada>
                <Pie :data="graficoCircularData" :options="graficoCircularOpciones" />
              </CajaSombreada>
            </div>
          </div>
        </template>

        <template #columna-derecha>
          <div class="grafica-evolucion-mensual">
            <h2 class="subtitulo">Evolución de los Gastos Mensuales</h2>
            <CajaSombreada>
              <Line :data="graficoLineaData" :options="graficoLineaOpciones" />
            </CajaSombreada>
          </div>

          <!-- Nueva gráfica de comparación de gastos por mes -->
          <div class="grafica-comparacion-mensual">
            <h2 class="subtitulo">Comparación de Gastos por Mes</h2>
            <CajaSombreada>
              <Line :data="graficoComparacionMensualData" :options="graficoComparacionMensualOpciones" />
            </CajaSombreada>
          </div>

          <div class="grafica-gastos-por-categoria">
            <h2 class="subtitulo">Gastos por Categoría</h2>
            <CajaSombreada>
              <Bar :data="graficoBarrasData" :options="graficoBarrasOpciones" />
            </CajaSombreada>
          </div>
        </template>
      </DosColumnas>
    </template>
  </Plantilla>
</template>

<script>
import { obtenerCategorias, obtenerGastos } from '@/api';
import CajaSombreada from '@/components/CajaSombreada.vue';
import DosColumnas from '@/components/DosColumnas.vue';
import Plantilla from '@/components/PaginaPlantilla.vue';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, LineElement, PointElement } from 'chart.js';
import { onMounted, ref } from 'vue';
import { Bar, Pie, Line } from 'vue-chartjs';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, Title, Tooltip, Legend, PointElement);

export default {
  name: "PaginaEstadisticas",
  components: { DosColumnas, Plantilla, CajaSombreada, Bar, Pie, Line },
  setup() {
    let graficoBarrasData = ref({
      labels: [],
      datasets: [{
        label: 'Gastos por categoría',
        data: [],
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#F3A833'],
      }],
    });

    let graficoBarrasOpciones = ref({
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return '€' + value;
            }
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return '€' + tooltipItem.raw;
            }
          }
        }
      }
    })

    let graficoCircularData = ref({
      labels: ['Casa', 'Vivienda', 'Servicios', 'Ropa', 'Salud'],
      datasets: [{
        label: 'Distribución de los gastos',
        data: [150, 700, 90, 120, 40],
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#F3A833'],
      }],
    })

    let graficoLineaData = ref({
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [{
        label: 'Gastos Mensuales',
        data: [500, 600, 450, 700, 650, 550],
        borderColor: '#33FF57',
        backgroundColor: 'rgba(51, 255, 87, 0.2)',
        fill: true,
      }],
    });

    let graficoComparacionMensualData = ref({
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
      datasets: [
        {
          label: 'Gastos de 2024',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          borderColor: '#FF5733',
          backgroundColor: 'rgba(255, 87, 51, 0.2)',
          fill: true,
        },
        {
          label: 'Gastos de 2024',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          borderColor: '#33FF57',
          backgroundColor: 'rgba(51, 255, 87, 0.2)',
          fill: true,
        }
      ],
    },)

    function sumarGastosPorMesYAnio(gastos) {
      const mesesEspañol = [
        "enero", "febrero", "marzo", "abril",
        "mayo", "junio", "julio", "agosto",
        "septiembre", "octubre", "noviembre", "diciembre"
      ];

      const gastosAgrupados = {};

      for (let i = 0; i < gastos.length; i++) {
        const gasto = gastos[i];
        const fecha = new Date(gasto.fecha);
        const mes = mesesEspañol[fecha.getMonth()];
        const año = fecha.getFullYear(); 
        const clave = `${mes} ${año}`;

        if (gastosAgrupados[clave]) {
          gastosAgrupados[clave] += parseFloat(gasto.importe);
        } else {
          gastosAgrupados[clave] = parseFloat(gasto.importe);
        }
      }

      return gastosAgrupados;
    }

    function generarDatosParaGraficoDeComparacionPorAnios(gastos) {
      const mesesEspañol = [
        "enero", "febrero", "marzo", "abril",
        "mayo", "junio", "julio", "agosto",
        "septiembre", "octubre", "noviembre", "diciembre"
      ];

      const datosPorAño = {};

      // Agrupar los gastos por año y mes
      for (let i = 0; i < gastos.length; i++) {
        const gasto = gastos[i];
        const fecha = new Date(gasto.fecha);
        const año = fecha.getFullYear();

        if (!datosPorAño[año]) {
          datosPorAño[año] = Array(12).fill(0);
        }

        datosPorAño[año][fecha.getMonth()] += parseFloat(gasto.importe);
      }

      const datasets = [];
      const labels = mesesEspañol.map(mes => mes.charAt(0).toUpperCase() + mes.slice(1)); // Capitalizar meses

      // Crear los datasets por año
      for (const [año, data] of Object.entries(datosPorAño)) {
        datasets.push({
          label: `Gastos de ${año}`,
          data: data,
          borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Color aleatorio
          backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
          fill: true,
        });
      }

      return {
        labels: labels,
        datasets: datasets,
      };
    }

    onMounted(function () {
      async function obtenerDatos() {
        let datosCategorias = await obtenerCategorias();
        let datosGastos = await obtenerGastos();

        let cateorias = datosCategorias.map(function (categoria) { return categoria.nombre });

        let gastosPorCategorias = cateorias.map((categoria) => {
          return datosGastos.filter(gasto => gasto.categoria === categoria).reduce((acc, gasto) => acc + Number(gasto.importe), 0);
        })

        let gastosPorMesYAnio = sumarGastosPorMesYAnio(datosGastos);

        let mesesDeGastos = Object.keys(gastosPorMesYAnio);
        let gastosPoMeses = Object.values(gastosPorMesYAnio)

        graficoBarrasData.value = {
          ...graficoBarrasData.value,
          labels: cateorias,
          datasets: [{
            label: graficoBarrasData.value.datasets[0].label,
            data: gastosPorCategorias,
            backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#F3A833'],
          }],
          data: gastosPorCategorias,
        }

        graficoCircularData.value = {
          labels: cateorias,
          datasets: [{
            label: graficoCircularData.value.datasets[0].label,
            data: gastosPorCategorias,
            backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#F3A833'],
          }],
        }

        graficoLineaData.value = {
          labels: mesesDeGastos,
          datasets: [{
            label: 'Gastos Mensuales',
            data: gastosPoMeses,
            borderColor: '#33FF57',
            backgroundColor: 'rgba(51, 255, 87, 0.2)',
            fill: true,
          }],
        };

        graficoComparacionMensualData.value = generarDatosParaGraficoDeComparacionPorAnios(datosGastos)

      }

      obtenerDatos();

    });

    return {
      graficoBarrasData: graficoBarrasData,
      graficoBarrasOpciones: graficoBarrasOpciones,

      graficoCircularData: graficoCircularData,

      graficoCircularOpciones: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          }
        }
      },

      graficoLineaData: graficoLineaData,

      graficoLineaOpciones: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return '€' + value;
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return '€' + tooltipItem.raw;
              }
            }
          }
        }
      },

      graficoComparacionMensualData: graficoComparacionMensualData,

      graficoComparacionMensualOpciones: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return '€' + value;
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return '€' + tooltipItem.raw;
              }
            }
          }
        }
      },
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

.grafica-gastos-por-categoria,
.grafica-distribucion-categorias,
.grafica-evolucion-mensual,
.grafica-comparacion-mensual {
  margin-top: 20px;
}
</style>
