<template>
    <HeaderComponent/>
    <main class="main-dashboard-container">
        <MenuDashboardStudent @open-Modal1="showModal1 = true" @open-Modal2="showModal2 = true"/>
        <div class="main-dashboard-principal">
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
    <ThemeSwitcherComponent/>
    <FooterComponent/>
    <ModalFolderCreate v-if="showModal1" @close-Modal1="showModal1 = false"/>
    <ModalFileUpload v-if="showModal2" @close-Modal2="showModal2 = false"/>
    <div v-if="showModal1 || showModal2" class="overlay"></div>
</template>

<script setup>
    import HeaderComponent from '@/components/HeaderStudentComponent.vue'
    import FooterComponent from '@/components/FooterStudentComponent.vue'
    import MenuDashboardStudent from '@/components/MenuDashboardStudent.vue'
    import ModalFileUpload from '@/components/ModalFileUpload.vue'
    import ModalFolderCreate from '@/components/ModalFolderCreate.vue'
    import ThemeSwitcherComponent from '@/components/ThemeSwitcherComponent.vue'

    import { ref } from "vue";

    const showModal1 = ref(false);
    const showModal2 = ref(false);
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

