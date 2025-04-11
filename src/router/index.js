import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RecoveryView from '@/views/RecoveryView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoggedView from '@/views/LoggedView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/recovery',
      name: 'recovery',
      component: RecoveryView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { transition: 'fade' },
    },
    {
      path: '/start',
      name: 'start',
      component: LoggedView,
    },
  ],
})

export default router
