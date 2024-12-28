import { createRouter, createWebHistory } from 'vue-router'
import PaginaLogin from '../paginas/PaginaLogin.vue'
import PaginaInicio from '../paginas/PaginaInicio.vue'
import PaginaRegistro from '../paginas/PaginaRegistro.vue'
import PaginaCategorias from '../paginas/PaginaCategorias.vue'
import PaginaGastos from '../paginas/PaginaGastos.vue'
import PaginaEstadisticas from '../paginas/PaginaEstadisticas.vue'
import PaginaUsuario from '../paginas/PaginaUsuario.vue'
import { obtenerUsuario } from '@/api'


const routes = [
  {
    path: '/',
    name: 'login',
    component: PaginaLogin
  },
  {
    path: '/inicio',
    name: 'inicio',
    component: PaginaInicio
  },
  {
    path: '/registro',
    name: 'registro',
    component: PaginaRegistro
  },
  {
    path: '/categorias',
    name: 'categorias',
    component: PaginaCategorias
  },
  {
    path: '/gastos',
    name: 'gastos',
    component: PaginaGastos
  },
  {
    path: '/estadisticas',
    name: 'estadisticas',
    component: PaginaEstadisticas
  },
  {
    path: '/usuario',
    name: 'usuario',
    component: PaginaUsuario
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach(async (to) => {
  let usuario = obtenerUsuario();

  if (!usuario && to.name === 'registro') {
    return true;
  }

  if (!usuario && to.name !== 'login') {
    return { name: 'login' }
  }

  return true;

})

export default router
