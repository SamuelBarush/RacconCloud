<template>
    <HeaderAdminComponent/>
    <main class="main-dashboard-container">
        <MenuDashboardAdmin @open-Modal1="showModal1 = true" @open-Modal2="showModal2 = true"/>
        <div :id="{'main-dashboard-principal': true , 'shrinked':showModalFileOption}">
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
    <FooterAdminComponent/>
    <ModalFileOption
    v-if="showModalFileOption"
    :type="selectedType"
    @close-ModalFileOption="closeModalFileOption"
    />
    <RegisterAdminComponent v-if="showModal1" @close-Modal1="showModal1 = false"/>
    <div v-if="showModal1 || showModal2" class="overlay"></div>
</template>

<script setup>
    import { ref } from "vue"

    import HeaderAdminComponent from '@/components/HeaderAdminComponent.vue'
    import FooterAdminComponent from '@/components/FooterAdminComponent.vue'
    import MenuDashboardAdmin from '@/components/MenuDashboardAdmin.vue'
    import RegisterAdminComponent from '@/components/RegisterAdminComponent.vue'
    import ModalFileOption from '@/components/ModalFileOption.vue'

    const showModal1 = ref(false)
    const showModal2 = ref(false)
    const showModalFileOption = ref(false)
    const selectedType = ref('')

    function openModal(type) {
    selectedType.value = type
    showModalFileOption.value = true
  }

  function closeModalFileOption() {
    showModalFileOption.value = false
    selectedType.value = ''
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

    #main-dashboard-principal#shrinked {
        @media (min-width: 1024px) {
            width: 60%; /* Cambia el tamaño al 60% cuando el modal está abierto */
        }
    }
</style>

