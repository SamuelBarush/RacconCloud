<template>
    <div class="menu-dashboard-student-container">
        <div class="menu-dashboard-student-actions" v-if="$route.path == '/folders-academy' || '/dashboard-academy' || '/events-academy'">
            <div class="menu-dashboard-student-actions-container">
                <button class="menu-dashboard-actions-options" >
                    <img src="../assets/icons/subir.png" alt="" @click="openModal1">
                </button>
                <p>Crear Carpeta</p>
            </div>
            <div class="menu-dashboard-student-actions-container">
                <button class="menu-dashboard-actions-options" >
                    <img src="../assets/icons/subir.png" alt="" @click="openModal2">
                </button>
                <p>Subir Archivo</p>
            </div>
            <div class="menu-dashboard-student-actions-container" v-if="$route.path == '/dashboard-academy' || '/events-academy'">
                <button class="menu-dashboard-actions-options" >
                    <img src="../assets/icons/subir.png" alt="" >
                </button>
                <p>Crear Materias</p>
            </div>
        </div>
        <div class="menu-dashboard-student-nav">
            <router-link :to="{name:'folders-academy'}">
                <div class="menu-dashboard-nav-options">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta Personal</p>
                </div>
            </router-link>
            <router-link :to="{name:'folders-academy'}">
                <div class="menu-dashboard-nav-options">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta Materias</p>
                </div>
            </router-link>
            <router-link :to="{name:'events-academy'}">
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
    import { useAuthStore } from '@/store'
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