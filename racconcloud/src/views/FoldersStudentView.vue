<template>
    <HeaderComponent/>
    <main class="main-folders-container">
        <MenuDashboardStudent @open-Modal1="showModal1 = true" @open-Modal2="showModal2 = true"/>
        <div class="main-folder-principal">
            <div class="main-folders-search">
                <img src="../assets/images/busqueda.png" alt="">
                <input type="search" value="Buscar">
            </div>
            <div class="main-dashboard-title">
                <p>Mis Carpetas</p>
            </div>
            <div class="main-container-grid-a">
                <div class="main-folders-block-a">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta</p>
                </div>
                <div class="main-folders-block-a">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta</p>
                </div>
                <div class="main-folders-block-a">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta</p>
                </div>
                <div class="main-folders-block-a">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta</p>
                </div>
                <div class="main-folders-block-a">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta</p>
                </div>
            </div>
            <div class="main-dashboard-title">
                <p>Mis Archivos</p>
            </div>
            <div class="main-container-grid-b">
                <div class="main-folders-block-b">
                    <img src="../assets/images/documento.png" alt="">
                    <p>Archivo</p>
                </div>
                <div class="main-folders-block-b">
                    <img src="../assets/images/documento.png" alt="">
                    <p>Archivo</p>
                </div>
                <div class="main-folders-block-b">
                    <img src="../assets/images/documento.png" alt="">
                    <p>Archivo</p>
                </div>
            </div>
        </div>    
    </main>
    <FooterComponent/>
    <ModalFolderCreate v-if="showModal1" @close-Modal1="showModal1 = false"/>
    <ModalFileUpload v-if="showModal2" @close-Modal2="showModal2 = false"/>
    <div v-if="showModal1 || showModal2" class="overlay"></div>
</template>

<script setup>
    import HeaderComponent from '@/components/HeaderComponent.vue'
    import FooterComponent from '@/components/FooterComponent.vue'
    import MenuDashboardStudent from '@/components/MenuDashboardStudent.vue'
    import ModalFileUpload from '@/components/ModalFileUpload.vue'
    import ModalFolderCreate from '@/components/ModalFolderCreate.vue'

    import { ref } from "vue";

    const showModal1 = ref(false);
    const showModal2 = ref(false);
</script>

