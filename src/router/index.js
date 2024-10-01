import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExampleView from '../views/ExampleView.vue'
import ReaderView from '../views/ReaderView.vue'
import ChooseTemplatesView from '../views/ChooseTemplatesView.vue'
import EditPage from '../views/EditPage.vue'

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
      component: ReaderView
    },
    {
      path: '/templates',
      name: 'ChooseTemplates',
      component: ChooseTemplatesView
    },
    {
      path: '/templates/edit',
      name: 'EditPage',
      component: EditPage
    }
    // ... other routes ...
  ]
})

export default router
