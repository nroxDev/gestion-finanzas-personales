<template>
  <Plantilla>
    <template #contenido>
      <div>
        <h1 class="subtitulo">Resumen de Gastos</h1>

        <CajaSombreada>
          <p class="descripcion">Total de gastos en el mes</p>
          <h2 class="precio">€{{ totalGastos }}</h2>
        </CajaSombreada>

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
          <h2 class="subtitulo">Análisis de gastos por categoría</h2>
          <CajaSombreada>
            <p>Meter qui una grafica de vye</p>
        </CajaSombreada>
        </div>
      </div>
    </template>
  </Plantilla>
</template>

<script>
import CajaSombreada from '@/components/CajaSombreada.vue';
import Plantilla from '@/components/PaginaPlantilla.vue';

export default {
  name: "PaginaInicio",
  components: { Plantilla, CajaSombreada },
  setup() {
    return {
      totalGastos: 500.25,
      gastoEnLaSemana: 200.01,
      saldo: 1350.01,
      ingresoMensual: 2000.12
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