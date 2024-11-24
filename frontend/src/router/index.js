import { createRouter, createWebHistory } from 'vue-router'
import PaginaLogin from '../paginas/PaginaLogin.vue'
import PaginaInicio from '../paginas/PaginaInicio.vue'
import PaginaRegistro from '../paginas/PaginaRegistro.vue'


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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
