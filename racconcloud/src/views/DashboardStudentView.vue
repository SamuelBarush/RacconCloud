<template>
    <HeaderComponent/>
    <main class="main-dashboard-container">
        <MenuDashboardStudent/>
        <div class="main-dashboard-container-grid">
            <div class="main-dashboard-title" id="block-a">
                <p>Mis Carpetas</p>
            </div>
            <div class="main-dashboard-block" id="block-1a">
                <div class="main-dashboard-block-img-a"><img src="../assets/images/usuario.png" alt=""></div>
                <p>Carpeta Personal</p>
                <p>1.5GB de 2GB</p>
            </div>
            <div class="main-dashboard-block" id="block-2a">
                <div class="main-dashboard-block-img-a"><img src="../assets/images/usuarios-alt.png" alt=""></div>
                <p>Carpeta Materias</p>
                <p>1.5GB de 2GB</p>
            </div>
            <div class="main-dashboard-title" id="block-b">
                <p>Subidos Recientemente</p>
            </div>
            <div class="main-dashboard-block" id="block-1b"></div>
            <div class="main-dashboard-block" id="block-2b"></div>
            <div class="main-dashboard-block" id="block-3b"></div>
            <div class="main-dashboard-block" id="block-4b"></div>
        </div>
        <div class="main-dashboard-container-flex">
            
        </div>
    </main> 
    <FooterComponent/>
</template>

<script setup>
    import HeaderComponent from '@/components/HeaderComponent.vue'
    import FooterComponent from '@/components/FooterComponent.vue'
    import MenuDashboardStudent from '@/components/MenuDashboardStudent.vue';
</script>

