import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExampleView from '../views/ExampleView.vue'
import ReaderView from '../views/ReaderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/example',
      name: 'example',
      component: ExampleView
    },
    {
      path: '/reader',
      name: 'reader',
      component: ReaderView
    },
    // ... other routes ...
  ]
})

export default router
