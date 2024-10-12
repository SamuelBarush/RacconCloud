import { createRouter, createWebHistory } from 'vue-router'
//import store from '@/store'
import DashboardStudentView from '@/views/DashboardStudentView.vue'
import FolderStudentView from '@/views/FoldersStudentView.vue'
import InfoStudentView from '@/views/InfoStudentView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      requireAuth: false,
      role: ''
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta:{
      requireAuth: false,
      role: ''
    }
  },
  {
    path: '/forgot',
    name: 'forgot-password',
    component: ForgotPasswordView,
    meta:{
      requireAuth: false,
      role: ''
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard-student',
    component: DashboardStudentView,
    meta:{
      requireAuth: true,
      role: 'student'
    }
  },
  {
    path: '/info',
    name: 'info-student',
    component: InfoStudentView,
    meta:{
      requireAuth: true,
      role: 'student'
    }
  },
  {
    path: '/folders',
    name: 'folders-student',
    component: FolderStudentView,
    meta:{
      requireAuth: true,
      role: 'student'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const auth =  true //store.getters.isAuthenticated 
  //const role = store.getters.userRole
  const needAuth = to.meta.requireAuth

  if (needAuth && !auth) {
    next('login')
  } else {
    next()
  }
})

export default router
