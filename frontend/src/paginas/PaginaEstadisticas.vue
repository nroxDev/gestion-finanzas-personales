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
import CajaSombreada from '@/components/CajaSombreada.vue';
import DosColumnas from '@/components/DosColumnas.vue';
import Plantilla from '@/components/PaginaPlantilla.vue';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, LineElement, PointElement } from 'chart.js';
import { Bar, Pie, Line } from 'vue-chartjs';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, Title, Tooltip, Legend, PointElement);

export default {
  name: "PaginaEstadisticas",
  components: { DosColumnas, Plantilla, CajaSombreada, Bar, Pie, Line },
  setup() {
    return {
      // Datos para los gráficos
      graficoBarrasData: {
        labels: ['Casa', 'Vivienda', 'Servicios', 'Ropa', 'Salud'],
        datasets: [{
          label: 'Gastos por categoría',
          data: [150, 700, 90, 120, 40],
          backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#F3A833'],
        }],
      },

      graficoBarrasOpciones: {
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

      graficoCircularData: {
        labels: ['Casa', 'Vivienda', 'Servicios', 'Ropa', 'Salud'],
        datasets: [{
          label: 'Distribución de los gastos',
          data: [150, 700, 90, 120, 40],
          backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#F3A833'],
        }],
      },

      graficoCircularOpciones: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          }
        }
      },

      graficoLineaData: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [{
          label: 'Gastos Mensuales',
          data: [500, 600, 450, 700, 650, 550],
          borderColor: '#33FF57',
          backgroundColor: 'rgba(51, 255, 87, 0.2)',
          fill: true,
        }],
      },

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

      // Datos para la gráfica de comparación de gastos por mes
      graficoComparacionMensualData: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
          {
            label: 'Gastos de 2023',
            data: [450, 500, 400, 550, 600, 520],
            borderColor: '#FF5733',
            backgroundColor: 'rgba(255, 87, 51, 0.2)',
            fill: true,
          },
          {
            label: 'Gastos de 2024',
            data: [500, 600, 450, 700, 650, 550],
            borderColor: '#33FF57',
            backgroundColor: 'rgba(51, 255, 87, 0.2)',
            fill: true,
          }
        ],
      },

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
