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
                  <p class="importe">€{{ saldo }}</p>
                </CajaSombreada>
              </div>
            </div>

            <div class="grafica-gastos-por-categiria">
              <h2 class="subtitulo">Análisis de gastos mensual</h2>
              <CajaSombreada>
                <Bar :data="datosGrafica" :options="opcionesDeGrafica" />
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
import CajaSombreada from '@/components/CajaSombreada.vue';
import DosColumnas from '@/components/DosColumnas.vue';
import ListaDeGastosConFiltro from '@/components/ListaDeGastosConFiltro.vue';
import Plantilla from '@/components/PaginaPlantilla.vue';
ListaDeGastosConFiltro
DosColumnas
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: "PaginaInicio",
  components: { DosColumnas, Plantilla, CajaSombreada, Bar, ListaDeGastosConFiltro },
  setup() {
    return {
      categorias: ["Todas", "Casa", "Mascotas", "Coche"],
      ultimosGastos: [
        {
          "id": 1,
          "titulo": "Compra supermercado",
          "importe": 45.20,
          "fecha": "2024-01-20T14:30:00Z",
          "categoria": "Casa",
          "descripcion": "Compra de alimentos y productos de limpieza",
          "icono": "fas fa-shopping-cart"
        },
        {
          "id": 2,
          "titulo": "Pago alquiler",
          "importe": 700.00,
          "fecha": "2024-01-01T10:00:00Z",
          "categoria": "Vivienda",
          "descripcion": "Pago mensual del alquiler",
          "icono": "fas fa-home"
        },
        {
          "id": 3,
          "titulo": "Pago teléfono",
          "importe": 50.00,
          "fecha": "2024-01-05T12:00:00Z",
          "categoria": "Servicios",
          "descripcion": "Pago mensual de la factura del teléfono móvil",
          "icono": "fas fa-phone"
        },
        {
          "id": 4,
          "titulo": "Compra ropa",
          "importe": 120.00,
          "fecha": "2024-01-10T15:00:00Z",
          "categoria": "Ropa",
          "descripcion": "Compra de ropa de invierno",
          "icono": "fas fa-tshirt"
        },
        {
          "id": 5,
          "titulo": "Pago gimnasio",
          "importe": 40.00,
          "fecha": "2024-01-15T09:00:00Z",
          "categoria": "Salud",
          "descripcion": "Suscripción mensual al gimnasio",
          "icono": "fas fa-dumbbell"
        },
        {
          "id": 6,
          "titulo": "Gasolina",
          "importe": 60.00,
          "fecha": "2024-01-18T08:00:00Z",
          "categoria": "Transporte",
          "descripcion": "Llenado del tanque de gasolina",
          "icono": "fas fa-gas-pump"
        },
        {
          "id": 7,
          "titulo": "Pago internet",
          "importe": 40.00,
          "fecha": "2024-01-10T11:00:00Z",
          "categoria": "Servicios",
          "descripcion": "Pago mensual de la factura de internet",
          "icono": "fas fa-wifi"
        },
        {
          "id": 8,
          "titulo": "Cine",
          "importe": 30.00,
          "fecha": "2024-01-12T20:00:00Z",
          "categoria": "Ocio",
          "descripcion": "Entradas para el cine",
          "icono": "fas fa-film"
        },
        {
          "id": 9,
          "titulo": "Compra tecnología",
          "importe": 200.00,
          "fecha": "2024-01-17T17:00:00Z",
          "categoria": "Tecnología",
          "descripcion": "Compra de un dispositivo móvil",
          "icono": "fas fa-laptop"
        },
        {
          "id": 10,
          "titulo": "Comida para llevar",
          "importe": 25.00,
          "fecha": "2024-01-19T18:00:00Z",
          "categoria": "Alimentación",
          "descripcion": "Pedido de comida a domicilio",
          "icono": "fas fa-utensils"
        }
      ],
      totalGastos: 500.25,
      gastoEnLaSemana: 200.01,
      saldo: 1350.01,
      ingresoMensual: 2000.12,
      datosGrafica: {
        labels: ['Hipoteca', 'Casa', 'Compra', 'Mascotas', 'Suministros'],
        datasets: [{ label: 'Por categoría', data: [30, 10, 20, 10, 20] }],
      },
      opcionesDeGrafica: {
        responsive: true
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
</style>