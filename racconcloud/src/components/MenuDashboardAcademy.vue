<template>
    <div class="menu-dashboard-student-container">
        <div class="menu-dashboard-student-actions" v-if="$route.path == '/folders-academy' || '/dashboard-academy'">
            <button class="menu-dashboard-actions-options" v-if="$route.path == '/dashboard-academy' || '/folders-academy'">
                <img src="" alt="">
                <p>Crear Materia</p>
            </button>  
            <button class="menu-dashboard-actions-options" @click="openModal1" v-if="$route.path === '/folders-academy'">
                <img src="" alt="">
                <p>Crear Carpeta</p>
            </button>
            <button class="menu-dashboard-actions-options" @click="openModal2" v-if="$route.path === '/folders-academy'">
                <img src="" alt="">
                <p>Subir Archivo</p>
            </button>
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
            <router-link :to="{name:'home'}">
                <div class="menu-dashboard-options-options">
                    <img src="../assets/images/salida.png" alt="">
                    <p>Log Out</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
    import { defineEmits } from 'vue';
    
    const emit = defineEmits(['open-Modal1', 'open-Modal2'])

    function openModal1() {
        emit('open-Modal1')
    }

    function openModal2() {
        emit('open-Modal2')
    }
</script>