<template>
    <HeaderTeacherComponent/>
    <main class="main-info-container">
        <MenuDashboardTeacher 
        @open-Modal1="showModal1 = true" 
        @open-Modal2="showModal2 = true"/>
        <div class="main-info-principal">
            <div class="main-info-user">
                <div><img src="../assets/icons/avatar-teacher.png" alt=""></div>
                <p>{{ userName }}</p>
            </div>
            <div class="main-info-text">
                <h3>Información Básica</h3>
                <div><img src="../assets/images/id-insignia.png" alt="">
                  <p>RFC: {{ userBoleta }}</p>
                </div>
                <div><img src="../assets/images/sobre.png" alt="">
                  <p>Email: {{ userEmail }}</p>
                </div>
            </div>
        </div>
    </main>
    <ThemeSwitcherComponent/>
    <FooterTeacherComponent/>
    <ModalFolderCreate v-if="showModal1" @close-Modal1="showModal1 = false"/>
    <ModalFileUpload v-if="showModal2" @close-Modal2="showModal2 = false"/>
    <div v-if="showModal1 || showModal2" class="overlay"></div>
</template>

<script setup>
    import { onMounted, ref } from "vue"
    import { useAuthStore } from '@/store/AuthStore'

    import HeaderTeacherComponent from '@/components/HeaderTeacherComponent.vue'
    import FooterTeacherComponent from '@/components/FooterTeacherComponent.vue'
    import MenuDashboardTeacher from '@/components/MenuDashboardTeacher.vue'
    import ModalFileUpload from '@/components/ModalFileUpload.vue'
    import ModalFolderCreate from '@/components/ModalFolderCreate.vue'
    import ThemeSwitcherComponent from '@/components/ThemeSwitcherComponent.vue'

    const showModal1 = ref(false)
    const showModal2 = ref(false)

    // Variables para almacenar la información del usuario
    const userName = ref('')
    const userBoleta = ref('')
    const userEmail = ref('')

    // Instancia del store
    const authStore = useAuthStore()

    onMounted(async () => {
    const userInfo = await authStore.info()
        if (userInfo) {
            userName.value = userInfo.name
            userBoleta.value = userInfo.boleta
            userEmail.value = userInfo.email
        }
    });
</script>
