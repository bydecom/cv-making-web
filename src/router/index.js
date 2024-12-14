import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReaderView from '../views/ReaderView.vue'
import ChooseTemplatesView from '../views/ChooseTemplatesView.vue'
import EditPage from '../views/Editpage4.vue'
import EditPage1 from '@/views/EditPage1.vue'
import EditPage2 from '../views/EditPage2.vue'
import EditPage3 from '../views/EditPage3.vue'
import EditPage4 from '../views/Editpage4.vue'
import EmailEditor from '@/views/EmailEditor.vue'
import ConvertPage from '../views/ConvertPage.vue'
import AboutView from '@/views/AboutView.vue'
import EnhanceEmail from '@/views/EnhanceEmail.vue'
import ReviewCV from '@/views/ReviewCV.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },

    {
      path: '/templates',
      name: 'ChooseTemplates',
      component: ChooseTemplatesView
    },
    {
      path: '/templates/edit0',
      name: 'EditPage',
      component: EditPage
    },
    {
      path: '/templates/edit2',
      name: 'EditPage2',
      component: EditPage2
    },
    {
      path: '/templates/edit1',
      name: 'EditPage1',
      component: EditPage1
    },
    {
      path: '/templates/edit3',
      name: 'EditPage3',
      component: EditPage3
    },
    {
      path: '/templates/edit4',
      name: 'EditPage4',
      component: EditPage4
    },
    {
      path: '/emaileditor',
      name: 'emaileditor',
      component: EmailEditor
    },
    {
      path: '/convert',
      name: 'convert',
      component: ConvertPage
    },
    {
      path: '/edit-cv/:data?',
      name: 'edit-cv',
      component: EditPage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/reader',
      name: 'reader',
      component: ReaderView
    },
    {
      path: '/enhancemail',
      name: 'enhancemail',
      component: EnhanceEmail
    },
    {
      path: '/reviewcv',
      name: 'reviewcv',
      component: ReviewCV
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
