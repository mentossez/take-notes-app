import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/login',
      component: Login
    }
  ],
})

export default router
