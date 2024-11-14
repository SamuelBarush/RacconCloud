<template>
    <HeaderAcademyComponent/>
    <main class="main-dashboard-container">
        <MenuDashboardAcademy 
            @open-Modal1="showModal1 = true" 
            @open-Modal2="showModal2 = true"
            @open-Modal3="showModal3 = true"
            @openAddStudent="showModal4 = true"
            @openAddTeacher="showModal5 = true"/>
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
    <FooterAcademyComponent/>
    <AddStudentComponent v-if="showModal4" @closeAddStudent="showModal4 = false"/>
    <AddTeacherComponent v-if="showModal5" @closeAddTeacher="showModal5 = false"/>
    <ModalFolderCreate v-if="showModal1" @close-Modal1="showModal1 = false"/>
    <ModalFileUpload v-if="showModal2" @close-Modal2="showModal2 = false"/>
    <div v-if="showModal1 || showModal2 || showModal3 || showModal4 || showModal5" class="overlay"></div>
</template>

<script setup>
import { ref } from "vue"

import HeaderAcademyComponent from '@/components/HeaderAcademyComponent.vue'
import FooterAcademyComponent from '@/components/FooterAcademyComponent.vue'
import MenuDashboardAcademy from '@/components/MenuDashboardAcademy.vue'
import ModalFileUpload from '@/components/ModalFileUpload.vue'
import ModalFolderCreate from '@/components/ModalFolderCreate.vue'
import ThemeSwitcherComponent from '@/components/ThemeSwitcherComponent.vue'
import AddStudentComponent from '@/components/AddStudentComponent.vue'
import AddTeacherComponent from '@/components/AddTeacherComponent.vue'

const showModal1 = ref(false)
const showModal2 = ref(false)
const showModal3 = ref(false)
const showModal4 = ref(false)
const showModal5 = ref(false)
</script>

<style lang="scss">
    .overlay {
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

