<template>
    <HeaderComponent/>
    <main class="main-info-container">
        <MenuDashboardStudent 
        @open-Modal1="showModal1 = true" 
        @open-Modal2="showModal2 = true"/>
        <div class="main-info-principal">
            <div class="main-info-user">
                <div><img src="../assets/icons/avatar-student.png" alt=""></div>
                <p>{{ userName }}</p>
            </div>
            <div class="main-info-text">
                <h3>Información Básica</h3>
                <div><img src="../assets/images/id-insignia.png" alt="">
                  <p>Boleta: {{ userBoleta }}</p>
                </div>
                <div><img src="../assets/images/sobre.png" alt="">
                  <p>Email: {{ userEmail }}</p>
                </div>
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
    import { ref, onMounted } from "vue"
    import { useAuthStore } from '@/store/AuthStore'

    import HeaderComponent from '@/components/HeaderStudentComponent.vue'
    import FooterComponent from '@/components/FooterStudentComponent.vue'
    import MenuDashboardStudent from '@/components/MenuDashboardStudent.vue'
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

    // Llamar a la función info() cuando se cargue la vista
    onMounted(async () => {
        const userInfo = await authStore.info()
        if (userInfo) {
            // Asignar los valores devueltos por el store a las variables locales
            userName.value = userInfo.name
            userBoleta.value = userInfo.boleta
            userEmail.value = userInfo.email
        }
    })
</script>
