import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFoundComponent from '../components/Not-Found-Component.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
    {
      path: '/account-details',
      name: 'AccountDetails',
      component: () => import('../views/Account-Details.vue')
    },
    {
        path: '/game-room',
        name: 'GameRoom',
        component: () => import('../views/game-room/Game-Room.vue')
    },
  {
    path: '/:catchAll(.*)',
    component: NotFoundComponent,
    name: 'NotFound'
  }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes 
})
export default router