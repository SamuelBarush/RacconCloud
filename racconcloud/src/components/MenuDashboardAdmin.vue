<template>
    <div class="menu-dashboard-student-container">
        <div class="menu-dashboard-student-actions" v-if="$route.path == '/events-admin' || '/dashboard-admin'">
            <div class="menu-dashboard-student-actions-container" v-if="$route.path == '/dashboard-admin' || '/events-admin'">
                <button class="menu-dashboard-actions-options" @click="openModal1">
                    <img src="../assets/icons/add-user.png" alt="" >
                </button>
                <p>Registrar Usuarios</p>
            </div>
        </div>
        <div class="menu-dashboard-student-nav">
            <router-link 
            :to="{name:'events-admin'}"
            :class="{active: $route.path === '/events-admin'}">
                <div class="menu-dashboard-nav-options">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Revisar Eventos</p>
                </div>
            </router-link>
            <router-link 
            :to="{name:'user-list-admin'}"
            :class="{active: $route.path === '/user-list-admin'}">
                <div class="menu-dashboard-nav-options">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Revisar Usuarios</p>
                </div>
            </router-link>
        </div>
        <div class="menu-dashboard-student-options">
            <div class="menu-dashboard-options-options">
            </div>
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
    
    const emit = defineEmits(['open-Modal1'])
    const authStore = useAuthStore()
    const router = useRouter()

    function openModal1() {
        emit('open-Modal1')
    }

    function LogOut() {
        authStore.logout()
        router.push('/')
    }
</script>