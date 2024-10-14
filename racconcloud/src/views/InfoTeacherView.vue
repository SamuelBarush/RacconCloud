<template>
    <HeaderTeacherComponent/>
    <main class="main-info-container">
        <MenuDashboardTeacher @open-Modal1="showModal1 = true" @open-Modal2="showModal2 = true"/>
        <div class="main-info-principal">
            <div class="main-info-user">
                <div><img src="../assets/icons/avatar-teacher.png" alt=""></div>
                <p>Nombre Completo del usuario</p>
            </div>
            <div class="main-info-text">
                <h3>Información Básica</h3>
                <div><img src="../assets/images/id-insignia.png" alt=""><p>Boleta: </p></div>
                <div><img src="../assets/images/sobre.png" alt=""><p>Email: </p></div>
                <div><img src="../assets/images/llave.png" alt=""><p>CURP: </p></div>
            </div>
        </div>
    </main>
    <FooterTeacherComponent/>
    <ModalFolderCreate v-if="showModal1" @close-Modal1="showModal1 = false"/>
    <ModalFileUpload v-if="showModal2" @close-Modal2="showModal2 = false"/>
    <div v-if="showModal1 || showModal2" class="overlay"></div>
</template>

<script setup>
    import HeaderTeacherComponent from '@/components/HeaderTeacherComponent.vue'
    import FooterTeacherComponent from '@/components/FooterTeacherComponent.vue'
    import MenuDashboardTeacher from '@/components/MenuDashboardTeacher.vue'
    import ModalFileUpload from '@/components/ModalFileUpload.vue'
    import ModalFolderCreate from '@/components/ModalFolderCreate.vue'

    import { ref } from "vue";

    const showModal1 = ref(false);
    const showModal2 = ref(false);
</script>
