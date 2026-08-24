<template>
    <div class="menu-dashboard-student-container">
        <div class="menu-dashboard-student-actions" v-if="$route.path === '/folders-teacher-personal'">
            <div class="menu-dashboard-student-actions-container">
                <button class="menu-dashboard-actions-options" @click="openModal1">
                    <img src="../assets/icons/agregar-carpeta.png" alt="" >
                </button>
                <p>Crear Carpeta</p>
            </div>
            <div class="menu-dashboard-student-actions-container">
                <button class="menu-dashboard-actions-options" @click="openModal2">
                    <img src="../assets/icons/subir.png" alt="" >
                </button>
                <p>Subir Archivo</p>
            </div>
        </div>
        <div class="menu-dashboard-student-actions" v-if="$route.path === '/folders-teacher-subjects'">
            <div class="menu-dashboard-student-actions-container">
                <button class="menu-dashboard-actions-options" @click="openModal1">
                    <img src="../assets/icons/agregar-carpeta.png" alt="" >
                </button>
                <p>Crear Carpeta</p>
            </div>
            <div class="menu-dashboard-student-actions-container">
                <button class="menu-dashboard-actions-options" @click="openModal2">
                    <img src="../assets/icons/subir.png" alt="" >
                </button>
                <p>Subir Archivo</p>
            </div>
        </div>
        <div class="menu-dashboard-student-nav">
            <router-link 
            :to="{name:'folders-teacher-personal'}"
            :class="{active: $route.path === '/folders-teacher-personal'}">
                <div class="menu-dashboard-nav-options">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta Personal</p>
                </div>
            </router-link>
            <router-link 
            :to="{name:'folders-teacher-subjects'}"
            :class="{active: $route.path === '/folders-teacher-subjects'}">
                <div class="menu-dashboard-nav-options">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta Materias</p>
                </div>
            </router-link>
        </div>
        <div class="menu-dashboard-student-options">
            <router-link :to="{name: 'info-teacher'}">
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
    
    const emit = defineEmits(['open-Modal1', 'open-Modal2'])
    const authStore = useAuthStore()
    const router = useRouter()

    function openModal1() {
        emit('open-Modal1')
    }

    function openModal2() {
        emit('open-Modal2')
    }

    function LogOut() {
        authStore.logout()
        router.push('/')
    }
</script>