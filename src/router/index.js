import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExampleView from '../views/ExampleView.vue'
import ReaderView from '../views/ReaderView.vue'
import ChooseTemplatesView from '../views/ChooseTemplatesView.vue'
import EditPage from '../views/EditPage.vue'
import LoginView from '@/views/LoginView.vue'
import EmailEditor from '@/views/EmailEditor.vue'
import ConvertPage from '../views/ConvertPage.vue'
import AboutView from '@/views/AboutView.vue'
import EnhanceEmail from '@/views/EnhanceEmail.vue'
import ReviewCV from '@/views/ReviewCV.vue'
import GetRecruitmentIDTitle from '@/views/GetRecruitmentIDTitle.vue'
import GetRecruitmentID from '@/views/GetRecruitmentID.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/test',
      name: 'test',
      component: GetRecruitmentIDTitle
    },
    {
      path: '/test1',
      name: 'test1',
      component: GetRecruitmentID
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
  ]
})

export default router
