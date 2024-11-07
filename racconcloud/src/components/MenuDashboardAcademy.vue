<template>
    <div class="menu-dashboard-student-container">
        <div class="menu-dashboard-student-actions" v-if="$route.path === '/folders-academy-personal'">
            <div class="menu-dashboard-student-actions-container">
                <button class="menu-dashboard-actions-options" @click="openModal1">
                    <img src="../assets/icons/subir.png" alt="" >
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
                <button class="menu-dashboard-actions-options"  @click="openModal3">
                    <img src="../assets/icons/subir.png" alt="" >
                </button>
                <p>Crear Materias</p>
            </div>
        </div>
        <div class="menu-dashboard-student-actions" v-if="$route.path === '/info-academy'">
            <div class="menu-dashboard-student-actions-container" >
                <button class="menu-dashboard-actions-options" @click="openModal3">
                    <img src="../assets/icons/subir.png" alt="" >
                </button>
                <p>Crear Materias</p>
            </div>
        </div>
        <div class="menu-dashboard-student-actions" v-if="$route.path === '/events-academy'">
            <div class="menu-dashboard-student-actions-container" >
                <button class="menu-dashboard-actions-options" @click="openModal3">
                    <img src="../assets/icons/subir.png" alt="" >
                </button>
                <p>Crear Materias</p>
            </div>
        </div>
        <div class="menu-dashboard-student-actions" v-if="$route.path === '/folders-academy-subjects'">
            <div class="menu-dashboard-student-actions-container">
                <button class="menu-dashboard-actions-options" @click="openModal4">
                    <img src="../assets/icons/subir.png" alt="" >
                </button>
                <p>Asignar Alumno</p>
            </div>
            <div class="menu-dashboard-student-actions-container">
                <button class="menu-dashboard-actions-options" @click="openModal5">
                    <img src="../assets/icons/subir.png" alt="" >
                </button>
                <p>Asignar Profesor</p>
            </div>
            <div class="menu-dashboard-student-actions-container">
                <button class="menu-dashboard-actions-options" >
                    <img src="../assets/icons/subir.png" alt="" >
                </button>
                <p>Descargar Materia</p>
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

    const emit = defineEmits(['open-Modal1', 'open-Modal2', 'open-Modal3', 'open-Modal4', 'open-Modal5'])
    const authStore = useAuthStore()
    const router = useRouter()

    function openModal1() {
        emit('open-Modal1')
    }

    function openModal2() {
        emit('open-Modal2')
    }

    function openModal3() {
        emit('open-Modal3')
    }

    function openModal4() {
        emit('open-Modal4')
    }

    function openModal5() {
        emit('open-Modal5')
    }

    async function LogOut() {
        await authStore.logout()
        router.push('/')
    }
</script>