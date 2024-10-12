import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store'
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
      role: 0
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta:{
      requireAuth: false,
      role: 0
    }
  },
  {
    path: '/forgot',
    name: 'forgot-password',
    component: ForgotPasswordView,
    meta:{
      requireAuth: false,
      role: 0
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard-student',
    component: DashboardStudentView,
    meta:{
      requireAuth: true,
      role: 4
    }
  },
  {
    path: '/info',
    name: 'info-student',
    component: InfoStudentView,
    meta:{
      requireAuth: true,
      role: 4
    }
  },
  {
    path: '/folders',
    name: 'folders-student',
    component: FolderStudentView,
    meta:{
      requireAuth: true,
      role: 4
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  //const auth = authStore.auth
  //const role = authStore.role
  const needAuth = to.meta.requireAuth
  const roleRequired = to.meta.role

  const auth = authStore.setAuth(true)
  const role = authStore.setRole(4)

  console.log(auth,role)

  if (needAuth && !auth) {
    next('/login')
  } else if (needAuth && roleRequired !== role) {
    next('/login')
  } else {
    next()
  }
})

export default router
