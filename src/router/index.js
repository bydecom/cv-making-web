import { createRouter, createWebHistory } from 'vue-router'
import { requireAuth } from './guards'
import HomeView from '../views/HomeView.vue'
import ExampleView from '../views/ExampleView.vue'
import ReaderView from '../views/ReaderView.vue'
import ChooseTemplatesView from '../views/ChooseTemplatesView.vue'
import EditPage from '../views/EditPage.vue'
import LoginView from '@/views/LoginView.vue'
import EmailEditor from '@/views/EmailEditor.vue'
import ConvertPage from '../views/ConvertPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
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
    },
    {
      path: '/emaileditor',
      name: 'emaileditor',
      component: EmailEditor
    },
    {
      path: '/convert',
      name: 'convert',
      component: () => import('../views/ConvertPage.vue')
    },
    {
      path: '/edit/:data?',
      name: 'edit-cv',
      component: () => import('../views/EditPage.vue')
    }
  ]
})

export default router
