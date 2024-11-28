<template>
    <HeaderAcademyComponent/>
    <main class="main-dashboard-container">
        <MenuDashboardAcademy 
            @openCreateFolder="showModal1 = true" 
            @openUploadFile="showModal2 = true"
            @openCreateSubject="showModal3 = true"
            @openAddStudent="showModal4 = true"
            @openAddTeacher="showModal5 = true"/>
        <div class="main-dashboard-principal">
            <div class="main-dashboard-title">
                <p>Registro de Eventos</p>
            </div>
            <div class="main-event-title">
                <div>
                    <p>Usuario</p>
                    <p>Movimiento</p>
                    <p>Carpeta</p>
                    <p>Fecha y Hora</p>
                </div> 
            </div>
            <div class="main-container-grid-b">
                <div class="main-dashboard-block-c">
                    <div>
                        <p>Usuario</p>
                        <p>Movimiento</p>
                        <p>Carpeta</p>
                        <p>dd/mm/aaaa hh/mm</p>
                    </div>
                </div>
                <div class="main-dashboard-block-c">
                    <div>
                        <p>Usuario</p>
                        <p>Movimiento</p>
                        <p>Carpeta</p>
                        <p>dd/mm/aaaa hh/mm</p>
                    </div>
                </div>
                <div class="main-dashboard-block-c">
                    <div>
                        <p>Usuario</p>
                        <p>Movimiento</p>
                        <p>Carpeta</p>
                        <p>dd/mm/aaaa hh/mm</p>
                    </div>
                </div>
                <div class="main-dashboard-block-c">
                    <div>
                        <p>Usuario</p>
                        <p>Movimiento</p>
                        <p>Carpeta</p>
                        <p>dd/mm/aaaa hh/mm</p>
                    </div>
                </div>
                <div class="main-dashboard-block-c">
                    <div>
                        <p>Usuario</p>
                        <p>Movimiento</p>
                        <p>Carpeta</p>
                        <p>dd/mm/aaaa hh/mm</p>
                    </div>
                </div>
                <div class="main-dashboard-block-c">
                    <div>
                        <p>Usuario</p>
                        <p>Movimiento</p>
                        <p>Carpeta</p>
                        <p>dd/mm/aaaa hh/mm</p>
                    </div>
                </div>
                <div class="main-dashboard-block-c">
                    <div>
                        <p>Usuario</p>
                        <p>Movimiento</p>
                        <p>Carpeta</p>
                        <p>dd/mm/aaaa hh/mm</p>
                    </div>
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
    import HeaderAcademyComponent from '@/components/HeaderAcademyComponent.vue'
    import FooterAcademyComponent from '@/components/FooterAcademyComponent.vue'
    import MenuDashboardAcademy from '@/components/MenuDashboardAcademy.vue'
    import ModalFileUpload from '@/components/ModalFileUpload.vue'
    import ModalFolderCreate from '@/components/ModalFolderCreate.vue'
    import ThemeSwitcherComponent from '@/components/ThemeSwitcherComponent.vue'
    import AddStudentComponent from '@/components/AddStudentComponent.vue'
    import AddTeacherComponent from '@/components/AddTeacherComponent.vue'
    import SubjectRegisterComponent from "@/components/SubjectRegisterComponent.vue"
    

    import { ref , onMounted} from "vue"
    import { useAcademyStore } from '@/store/AcademyStore'

    const showModal1 = ref(false)
    const showModal2 = ref(false)
    const showModal3 = ref(false)
    const showModal4 = ref(false)
    const showModal5 = ref(false)
    const academyStore = useAcademyStore()

    onMounted(async () => {
        // Cargar la información del usuario
        // await authStore.loadUser()
        // userName.value = authStore.user.name
        // userAcademyId.value = authStore.user.academyId
        // userTeacher.value = authStore.user.teacher
        // userDescription.value = authStore.user.description
        const logs = await academyStore.getLogs()
        console.log(logs)
    })


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

