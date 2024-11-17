<template>
    <HeaderAdminComponent/>
    <main class="main-dashboard-container">
        <MenuDashboardAdmin 
        @openRegister="showModal1 = true"/>
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
    <FooterAdminComponent/>
    <RegisterAdminComponent v-if="showModal1" @close="showModal1 = false"/>
    <div v-if="showModal1" class="overlay"></div>
</template>

<script setup>
    import HeaderAdminComponent from '@/components/HeaderAdminComponent.vue'
    import FooterAdminComponent from '@/components/FooterAdminComponent.vue'
    import MenuDashboardAdmin from '@/components/MenuDashboardAdmin.vue'
    import RegisterAdminComponent from '@/components/RegisterAdminComponent.vue'
    import ThemeSwitcherComponent from '@/components/ThemeSwitcherComponent.vue'

    import { ref } from "vue"

    const showModal1 = ref(false)
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

