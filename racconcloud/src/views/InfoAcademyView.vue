<template>
    <HeaderAcademyComponent/>
    <main class="main-info-container">
        <MenuDashboardAcademy 
            @openCreateFolder="showModal1 = true" 
            @openUploadFile="showModal2 = true"
            @openCreateSubject="showModal3 = true"
            @openAddStudent="showModal4 = true"
            @openAddTeacher="showModal5 = true"/>
        <div class="main-info-principal">
            <div class="main-info-user">
                <div><img src="../assets/icons/avatar-academy.png" alt=""></div>
                <p>{{ userName }}</p>
            </div>
            <div class="main-info-text">
                <h3>Información Básica</h3>
                <div><img src="../assets/icons/id.png" alt="">
                  <p>Identificador: {{ userAcademyId }}</p>
                </div>
                <div><img src="../assets/images/sobre.png" alt="">
                  <p>Profesor Titular: {{ userTeacher }}</p>
                </div>
                <div><img src="../assets/icons/info.png" alt="">
                  <p>Descripción: {{ userDescription }}</p>
                </div>
            </div>
        </div>
    </main>
    <ThemeSwitcherComponent/>
    <FooterAcademyComponent/>
    <SubjectRegisterComponent v-if="showModal3" @close="showModal3 = false"/>
    <AddStudentComponent v-if="showModal4" @close="showModal4 = false"/>
    <AddTeacherComponent v-if="showModal5" @close="showModal5 = false"/>
    <ModalFolderCreate v-if="showModal1" @close-Modal1="showModal1 = false"/>
    <ModalFileUpload v-if="showModal2" @close-Modal2="showModal2 = false"/>
    <div v-if="showModal1 || showModal2 || showModal3 || showModal4 || showModal5" class="overlay"></div>
</template>

<script setup>
    import { onMounted, ref } from "vue"
    import { useAcademyStore } from '@/store/AcademyStore'

    import HeaderAcademyComponent from '@/components/HeaderAcademyComponent.vue'
    import FooterAcademyComponent from '@/components/FooterAcademyComponent.vue'
    import MenuDashboardAcademy from '@/components/MenuDashboardAcademy.vue'
    import ModalFileUpload from '@/components/ModalFileUpload.vue'
    import ModalFolderCreate from '@/components/ModalFolderCreate.vue'
    import ThemeSwitcherComponent from '@/components/ThemeSwitcherComponent.vue'
    import AddStudentComponent from '@/components/AddStudentComponent.vue'
    import AddTeacherComponent from '@/components/AddTeacherComponent.vue'
    import SubjectRegisterComponent from "@/components/SubjectRegisterComponent.vue"


    const showModal1 = ref(false)
    const showModal2 = ref(false)
    const showModal3 = ref(false)
    const showModal4 = ref(false)
    const showModal5 = ref(false)

    // Variables para almacenar la información del usuario
    const userName = ref('')
    const userAcademyId = ref('')
    const userTeacher = ref('')
    const userDescription = ref('')

    // Instancia del store
    const authStore = useAcademyStore()

    onMounted(async () => {
    const userInfo = await authStore.info()
    if (userInfo) {
        // Asignar los valores devueltos por el store a las variables locales
        userName.value = userInfo.name
        userAcademyId.value = userInfo.academy_id
        userTeacher.value = userInfo.main_teacher_rfc
        userDescription.value = userInfo.description
    }
    });
</script>
