<template>
    <HeaderAdminComponent/>
    <main class="main-dashboard-container">
        <MenuDashboardAdmin 
        @openRegister="showModal1 = true"/>
        <div :class="{'main-dashboard-principal': true , 'shrinked':showModalFileOption}">
            <div class="main-dashboard-title">
                <p>lista de Usuarios</p>
            </div>
            <div class="main-event-title">
                <div>
                    <p>Usuario</p>
                    <p>Rol</p>
                    <p>Identificador</p>
                </div> 
            </div>
            <div class="main-container-grid-b">
                <div class="main-dashboard-block-c" @dblclick="openModal('usuario')">
                    <div>
                        <p>Nombre de Usuario</p>
                        <p>Rol de Usuario</p>
                        <p>000000000</p>
                    </div>
                </div>
                <div class="main-dashboard-block-c">
                    <div>
                        <p>Nombre de Usuario</p>
                        <p>Rol de Usuario</p>
                        <p>000000000</p>
                    </div>
                </div>
                <div class="main-dashboard-block-c">
                    <div>
                        <p>Nombre de Usuario</p>
                        <p>Rol de Usuario</p>
                        <p>000000000</p>
                    </div>
                </div>
                <div class="main-dashboard-block-c">
                    <div>
                        <p>Nombre de Usuario</p>
                        <p>Rol de Usuario</p>
                        <p>000000000</p>
                    </div>
                </div>
                <div class="main-dashboard-block-c">
                    <div>
                        <p>Nombre de Usuario</p>
                        <p>Rol de Usuario</p>
                        <p>000000000</p>
                    </div>
                </div>
                <div class="main-dashboard-block-c">
                    <div>
                        <p>Nombre de Usuario</p>
                        <p>Rol de Usuario</p>
                        <p>000000000</p>
                    </div>
                </div>
                <div class="main-dashboard-block-c">
                    <div>
                        <p>Nombre de Usuario</p>
                        <p>Rol de Usuario</p>
                        <p>000000000</p>
                    </div>
                </div>
            </div>
        </div>  
    </main>
    <ThemeSwitcherComponent/>
    <FooterAdminComponent/>
    <ModalFileOption
    v-if="showModalFileOption"
    :type="selectedType"
    @close-ModalFileOption="closeModalFileOption"
    @openUpdateUser="openUpdateUser"
    @openDeleteUser="openDeleteUser"
    />
    <UserUpdateComponent v-if="showUpdateUser" :type="updateType" @close="showUpdateUser = false"/>
    <ModalUserDelete v-if="showDeleteUser" @close="showDeleteUser = false"/>
    <RegisterAdminComponent v-if="showModal1" @close="showModal1 = false"/>
    <div v-if="showModal1 || showUpdateUser || showDeleteUser" class="overlay"></div>
</template>

<script setup>
    import { ref } from "vue"

    import HeaderAdminComponent from '@/components/HeaderAdminComponent.vue'
    import FooterAdminComponent from '@/components/FooterAdminComponent.vue'
    import MenuDashboardAdmin from '@/components/MenuDashboardAdmin.vue'
    import RegisterAdminComponent from '@/components/RegisterAdminComponent.vue'
    import ModalFileOption from '@/components/ModalFileOption.vue'
    import ThemeSwitcherComponent from '@/components/ThemeSwitcherComponent.vue'
    import UserUpdateComponent from "@/components/ModalUserUpdate.vue"
    import ModalUserDelete from "@/components/ModalUserDelete.vue"

    const showModal1 = ref(false)
    const showDeleteUser = ref(false)
    const showModalFileOption = ref(false)
    const showUpdateUser = ref(false)
    const selectedType = ref('')
    const updateType = ref('')

    function openModal(type) {
        selectedType.value = type
        showModalFileOption.value = true
    }

    function openDeleteUser() {
        showDeleteUser.value = true
        showModalFileOption.value = false
    }

    function closeModalFileOption() {
        showModalFileOption.value = false
        selectedType.value = ''
    }

    function openUpdateUser(type) {
        updateType.value = type
        showModalFileOption.value = false
        showUpdateUser.value = true
    }

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

    .main-dashboard-principal.shrinked {
        @media (min-width: 1024px) {
            width: 60%;
        }
    }
</style>

