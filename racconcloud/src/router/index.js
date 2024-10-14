import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "@/store"
import DashboardStudentView from '@/views/DashboardStudentView.vue'
import DashboardAcademyView from '@/views/DashboardAcademyView.vue'
import DashboardTeacherView from '@/views/DashboardTeacherView.vue'
import DashboardAdminView from '@/views/DashboardAdminView.vue'
import FolderStudentView from '@/views/FoldersStudentView.vue'
import FolderTeacherView from '@/views/FoldersTeacherView.vue'
import FolderAcademyView from '@/views/FoldersAcademyView.vue'
import InfoStudentView from '@/views/InfoStudentView.vue'
import InfoTeacherView from '@/views/InfoTeacherView.vue'
import InfoAcademyView from '@/views/InfoAcademyView.vue'
import EventsAcademyView from '@/views/EventsAcademyView.vue'
import EventsAdminView from '@/views/EventsAdminView.vue'
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
      requireAuth: null,
      role: null
    }
  },
  {
    path: '/forgot',
    name: 'forgot-password',
    component: ForgotPasswordView,
    meta:{
      requireAuth: null,
      role: null
    }
  },
  {
    path: '/dashboard-admin',
    name: 'dashboard-admin',
    component: DashboardAdminView,
    meta:{
      requireAuth: true,
      role: "admin"
    }
  },
  {
    path: '/dashboard-student',
    name: 'dashboard-student',
    component: DashboardStudentView,
    meta:{
      requireAuth: true,
      role: "student"
    }
  },
  {
    path: '/dashboard-teacher',
    name: 'dashboard-teacher',
    component: DashboardTeacherView,
    meta:{
      requireAuth: true,
      role: "teacher"
    }
  },
  {
    path: '/dashboard-academy',
    name: 'dashboard-academy',
    component: DashboardAcademyView,
    meta:{
      requireAuth: true,
      role: "academy"
    }
  },
  {
    path: '/info-student',
    name: 'info-student',
    component: InfoStudentView,
    meta:{
      requireAuth: true,
      role: "student"
    }
  },
  {
    path: '/info-teacher',
    name: 'info-teacher',
    component: InfoTeacherView,
    meta:{
      requireAuth: true,
      role: "teacher"
    }
  },
  {
    path: '/info-academy',
    name: 'info-academy',
    component: InfoAcademyView,
    meta:{
      requireAuth: true,
      role: "academy"
    }
  },
  {
    path: '/folders-student',
    name: 'folders-student',
    component: FolderStudentView,
    meta:{
      requireAuth: true,
      role: "student"
    }
  },
  {
    path: '/folders-teacher',
    name: 'folders-teacher',
    component: FolderTeacherView,
    meta:{
      requireAuth: true,
      role: "teacher"
    }
  },
  {
    path: '/folders-academy',
    name: 'folders-academy',
    component: FolderAcademyView,
    meta:{
      requireAuth: true,
      role: "academy"
    }
  },
  {
    path: '/events-academy',
    name: 'events-academy',
    component: EventsAcademyView,
    meta:{
      requireAuth: true,
      role: "academy"
    }
  },
  {
    path: '/events-admin',
    name: 'events-admin',
    component: EventsAdminView,
    meta:{
      requireAuth: true,
      role: "admin"
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore().isAuthenticated;
  const role = useAuthStore().getRole;
  const needAuth = to.meta.requireAuth;
  const roleRequired = to.meta.role;

  if (needAuth && !auth) {
    //console.log('Not authenticated, redirecting to login');
    next('/login'); // Redirigir si no está autenticado
  } else if (needAuth && roleRequired !== role) {
    //console.log('Role mismatch, redirecting to login');
    next('/login'); // Redirigir si el rol no coincide
  } else {
    //console.log('Access granted');
    next();
  }
});



export default router
