<template>
    <div class="menu-dashboard-student-container">
        <div class="menu-dashboard-student-actions" v-if="$route.path === '/folders-student-personal'">
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
        <div class="menu-dashboard-student-actions" v-if="$route.path === '/folders-student-subjects'">
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
            :to="{name:'folders-student-personal'}"
            :class="{active: $route.path === '/folders-student-personal'}">
                <div class="menu-dashboard-nav-options">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta Personal</p>
                </div>
            </router-link>
            <router-link 
            :to="{name:'folders-student-subjects'}"
            :class="{active: $route.path === '/folders-student-subjects'}">
                <div class="menu-dashboard-nav-options">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta Materias</p>
                </div>
            </router-link>
        </div>
        <div class="menu-dashboard-student-options">
            <router-link :to="{name: 'info-student'}">
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
    import { useFileStore } from '@/store/FileStore'
    import { useRouter } from 'vue-router'
    
    const emit = defineEmits(['open-Modal1', 'open-Modal2'])
    const authStore = useAuthStore()
    const router = useRouter()
    const fileStore = useFileStore()

    function openModal1() {
        emit('open-Modal1')
    }

    function openModal2() {
        emit('open-Modal2')
    }

    async function LogOut() {
        await authStore.logout()
        fileStore.resetStrucuture()
        router.push('/')
    }
</script>