<template>
    <div class="menu-dashboard-student-container">
        <div class="menu-dashboard-student-actions" v-if="$route.path === '/folders-academy-personal'">
            <div class="menu-dashboard-student-actions-container">
                <button class="menu-dashboard-actions-options" @click="openModal1">
                    <img src="../assets/icons/agregar-carpeta.png" alt="">
                </button>
                <p>Crear Carpeta</p>
            </div>
            <div class="menu-dashboard-student-actions-container">
                <button class="menu-dashboard-actions-options" @click="openModal2">
                    <img src="../assets/icons/subir.png" alt="">
                </button>
                <p>Subir Archivo</p>
            </div>
        </div>
        <div class="menu-dashboard-student-actions" v-if="$route.path === '/dashboard-academy'">
            <div class="menu-dashboard-student-actions-container">
                <button class="menu-dashboard-actions-options"  @click="$emit('openCreateSubject')">
                    <img src="../assets/icons/create.png" alt="">
                </button>
                <p>Crear Materias</p>
            </div>
        </div>
        <div class="menu-dashboard-student-actions" v-if="$route.path === '/info-academy'">
            <div class="menu-dashboard-student-actions-container">
                <button class="menu-dashboard-actions-options" @click="$emit('openCreateSubject')">
                    <img src="../assets/icons/create.png" alt="">
                </button>
                <p>Crear Materias</p>
            </div>
        </div>
        <div class="menu-dashboard-student-actions" v-if="$route.path === '/events-academy'">
            <div class="menu-dashboard-student-actions-container">
                <button class="menu-dashboard-actions-options" @click="$emit('openCreateSubject')">
                    <img src="../assets/icons/create.png" alt="">
                </button>
                <p>Crear Materias</p>
            </div>
        </div>
        <div class="menu-dashboard-student-actions" v-if="$route.path === '/folders-academy-subjects'">
            <div class="menu-dashboard-student-actions-container">
                <button class="menu-dashboard-actions-options" @click="$emit('openAddStudent')">
                    <img src="../assets/icons/add-user.png" alt="" >
                </button>
                <p>Asignar Alumno</p>
            </div>
            <div class="menu-dashboard-student-actions-container">
                <button class="menu-dashboard-actions-options" @click="$emit('openAddTeacher')">
                    <img src="../assets/icons/add-user.png" alt="">
                </button>
                <p>Asignar Profesor</p>
            </div>
        </div>
        <div class="menu-dashboard-student-nav">
            <router-link 
            :to="{name:'folders-academy-personal'}"
            :class="{active: $route.path === '/folders-academy-personal'}">
                <div class="menu-dashboard-nav-options">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta Personal</p>
                </div>
            </router-link>
            <router-link 
            :to="{name:'folders-academy-subjects'}"
            :class="{active: $route.path === '/folders-academy-subjects'}">
                <div class="menu-dashboard-nav-options">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta Materias</p>
                </div>
            </router-link>
            <router-link 
            :to="{name:'events-academy'}"
            :class="{active: $route.path === '/events-academy'}">
                <div class="menu-dashboard-nav-options">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Revisar Eventos</p>
                </div>
            </router-link>
        </div>
        <div class="menu-dashboard-student-options">
            <router-link :to="{name: 'info-academy'}">
                <div class="menu-dashboard-options-options">
                    <img src="../assets/images/usuario.png" alt="">
                    <p>Perfil</p>
                </div>
            </router-link>
            <div class="menu-dashboard-options-options" @click="LogOut">
                <img src="../assets/images/salida.png" alt="">
                <p>Log Out</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineEmits } from 'vue'
    import { useAuthStore } from '@/store/AuthStore'
    import { useRouter } from 'vue-router'

    const emit = defineEmits(['openCreateFolder', 'openUploadFile', 'openCreateSubject', 'openAddStudent', 'openAddTeacher'])
    const authStore = useAuthStore()
    const router = useRouter()

    function openModal1() {
        emit('openCreateFolder')
    }

    function openModal2() {
        emit('openUploadFile')
    }

    async function LogOut() {
        await authStore.logout()
        router.push('/')
    }
</script>