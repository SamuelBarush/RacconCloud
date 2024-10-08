<template>
    <div class="menu-dashboard-student-container">
        <div class="menu-dashboard-student-actions" v-if="$route.path === '/folders'">
            <button class="menu-dashboard-actions-options" @click="openModal1">
                <img src="" alt="">
                <p>Crear Carpeta</p>
            </button>

            <button class="menu-dashboard-actions-options" @click="openModal2">
                <img src="" alt="">
                <p>Subir Archivo</p>
            </button>
        </div>
        <div class="menu-dashboard-student-nav">
            <router-link :to="{name:'folders-student'}">
                <div class="menu-dashboard-nav-options">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta Personal</p>
                </div>
            </router-link>
            <router-link :to="{name:'folders-student'}">
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