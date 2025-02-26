import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import NotFound from '@/components/NotFound.vue'
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
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound
    }
  ],
})

export default router
