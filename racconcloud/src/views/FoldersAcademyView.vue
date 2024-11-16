<template>
    <HeaderAcademyComponent/>
    <main class="main-folders-container">
        <MenuDashboardAcademy 
            @open-Modal1="showModal1 = true" 
            @open-Modal2="showModal2 = true"
            @open-Modal3="showModal3 = true"
            @openAddStudent="showModal4 = true"
            @openAddTeacher="showModal5 = true"/>
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
                <div class="main-dashboard-title-description">
                    <p>Nombre</p>
                    <p>Fecha de Subida</p>
                    <p>Tamaño</p>
                </div>
            </div>
            <div class="main-container-grid-b">
                <div class="main-folders-block-b">
                    <div class="main-folders-block-b-img">
                        <img src="../assets/images/documento.png" alt="">
                        <p>Archivo</p>
                    </div>
                    <div class="main-folders-block-b-txt"><p>08 - 10 - 2024</p></div>
                    <div class="main-folders-block-b-txt"><p>34 Kb</p></div>
                </div>
                <div class="main-folders-block-b">
                    <div class="main-folders-block-b-img">
                        <img src="../assets/images/documento.png" alt="">
                        <p>Archivo</p>
                    </div>
                    <div class="main-folders-block-b-txt"><p>08 - 10 - 2024</p></div>
                    <div class="main-folders-block-b-txt"><p>34 Kb</p></div>
                </div>
                <div class="main-folders-block-b">
                    <div class="main-folders-block-b-img">
                        <img src="../assets/images/documento.png" alt="">
                        <p>Archivo</p>
                    </div>
                    <div class="main-folders-block-b-txt"><p>08 - 10 - 2024</p></div>
                    <div class="main-folders-block-b-txt"><p>34 Kb</p></div>
                </div>
                <div class="main-folders-block-b">
                    <div class="main-folders-block-b-img">
                        <img src="../assets/images/documento.png" alt="">
                        <p>Archivo</p>
                    </div>
                    <div class="main-folders-block-b-txt"><p>08 - 10 - 2024</p></div>
                    <div class="main-folders-block-b-txt"><p>34 Kb</p></div>
                </div>
            </div>
        </div>    
    </main>
    <ThemeSwitcherComponent/>
    <FooterAcademyComponent/>
    <AddStudentComponent v-if="showModal4" @close="showModal4 = false"/>
    <AddTeacherComponent v-if="showModal5" @close="showModal5 = false"/>
    <ModalFolderCreate v-if="showModal1" @close-Modal1="showModal1 = false"/>
    <ModalFileUpload v-if="showModal2" @close-Modal2="showModal2 = false"/>
    <div v-if="showModal1 || showModal2 || showModal3 || showModal4 || showModal5" class="overlay"></div>
</template>

<script setup>
    import HeaderAcademyComponent from '@/components/HeaderAcademyComponent.vue'
    import FooterAcademyComponent from '@/components/FooterAcademyComponent.vue'
    import MenuDashboardAcademy from '@/components/MenuDashboardAcademy.vue'
    import ModalFileUpload from '@/components/ModalFileUpload.vue'
    import ModalFolderCreate from '@/components/ModalFolderCreate.vue'
    import ThemeSwitcherComponent from '@/components/ThemeSwitcherComponent.vue'
    import AddStudentComponent from '@/components/AddStudentComponent.vue'
    import AddTeacherComponent from '@/components/AddTeacherComponent.vue'

    import { ref } from "vue";

    const showModal1 = ref(false);
    const showModal2 = ref(false);
</script>

