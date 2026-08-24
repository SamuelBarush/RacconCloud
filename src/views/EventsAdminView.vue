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
                <div v-for="(log, index) in logs" 
                :key="index"
                class="main-dashboard-block-c">
                    <div>
                        <p>{{ log.user_identifier }}</p>
                        <p>{{log.operation}}</p>
                        <p>{{log.container_name}}</p>
                        <p>{{log.timestamp}}</p>
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

    import { ref , onMounted, computed } from "vue"
    import { useAdminStore } from '@/store/AdminStore'

    const showModal1 = ref(false)
    const adminStore = useAdminStore()

    const logs = computed(() => adminStore.Logs)

    onMounted(async () => {
        await adminStore.getLogs()
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

