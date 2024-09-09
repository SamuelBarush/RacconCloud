import { createRouter, createWebHistory } from 'vue-router'
import DashboardStudentView from '../views/DashboardStudentView.vue'
import FolderStudentView from '../views/FoldersStudentView.vue'
import InfoView from '../views/InfoView.vue'
import LoginView from '../views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardStudentView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/info',
    name: 'info',
    component: InfoView
  },
  {
    path: '/folders',
    name: 'folders',
    component: FolderStudentView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
