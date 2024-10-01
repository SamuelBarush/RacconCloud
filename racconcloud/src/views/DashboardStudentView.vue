<template>
    <HeaderComponent/>
    <main class="main-dashboard-container">
        <MenuDashboardStudent @open-Modal="showModal = true"/>
        <div id="main-dashboard-principal">
            <div class="main-dashboard-title">
                <p>Mis Carpetas</p>
            </div>
            <div class="main-container-grid-a">
                <div class="main-dashboard-block">
                    <div class="main-dashboard-block-img">
                        <img src="../assets/images/usuario.png" alt="">
                        <p>Carpeta Personal</p>
                    </div>
                    <p>1.5GB de 2GB</p>
                </div>
                <div class="main-dashboard-block">
                    <div class="main-dashboard-block-img">
                        <img src="../assets/images/usuarios-alt.png" alt="">
                        <p>Carpeta Materias</p>
                    </div>
                    <p>1.5GB de 2GB</p>
                </div>
            </div>
            <div class="main-dashboard-title">
                <p>Subidos Recientemente</p>
            </div>
            <div class="main-container-grid-b">
                <div class="main-dashboard-block-b"></div>
                <div class="main-dashboard-block-b"></div>
                <div class="main-dashboard-block-b"></div>
                <div class="main-dashboard-block-b"></div>
                <div class="main-dashboard-block-b"></div>
                <div class="main-dashboard-block-b"></div>
                <div class="main-dashboard-block-b"></div>
            </div>
        </div>  
    </main> 
    <FooterComponent/>
    <ModalFileUpload v-if="showModal" @close-Modal="showModal = false"/>
    <div v-if="showModal" class="overlay"></div>
</template>

<script setup>
    import HeaderComponent from '@/components/HeaderComponent.vue'
    import FooterComponent from '@/components/FooterComponent.vue'
    import MenuDashboardStudent from '@/components/MenuDashboardStudent.vue'
    import ModalFileUpload from '@/components/ModalFileUpload.vue'

    import { ref } from "vue";

    const showModal = ref(false);
</script>

<style lang="scss">
    .overlay{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        pointer-events: all;
        z-index: 999;
    }
</style>

