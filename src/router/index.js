import Home from '@/pages/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  
    {
      path: '/',
      name: 'User',
      component: () => import('@/pages/User.vue'),
    },
    {
        path: '/user-detail/:id',
      name: 'UserDetail',
      component: () => import('@/pages/UserDetail.vue'),
    },
  ],
})

export default router
