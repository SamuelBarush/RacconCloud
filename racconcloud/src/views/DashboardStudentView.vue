<template>
    <HeaderComponent/>
    <main class="main-dashboard-container">
        <MenuDashboardStudent/>
        <div id="main-dashboard-principal">
            <div class="main-dashboard-title">
                <p>Mis Carpetas</p>
            </div>
            <div class="main-container-grid-a">
                <div class="main-dashboard-block">
                    <div class="main-dashboard-block-img">
                        <img src="../assets/images/usuario.png" alt="">
                        <p>Carpeta Personal</p>
                    </div>
                    <p>1.5GB de 2GB</p>
                </div>
                <div class="main-dashboard-block">
                    <div class="main-dashboard-block-img">
                        <img src="../assets/images/usuarios-alt.png" alt="">
                        <p>Carpeta Materias</p>
                    </div>
                    <p>1.5GB de 2GB</p>
                </div>
            </div>
            <div class="main-dashboard-title">
                <p>Subidos Recientemente</p>
            </div>
            <div class="main-container-grid-b">
                <div class="main-dashboard-block-b"></div>
                <div class="main-dashboard-block-b"></div>
                <div class="main-dashboard-block-b"></div>
                <div class="main-dashboard-block-b"></div>
                <div class="main-dashboard-block-b"></div>
                <div class="main-dashboard-block-b"></div>
                <div class="main-dashboard-block-b"></div>
            </div>
        </div>  
    </main> 
    <FooterComponent/>
</template>

<script setup>
    import HeaderComponent from '@/components/HeaderComponent.vue'
    import FooterComponent from '@/components/FooterComponent.vue'
    import MenuDashboardStudent from '@/components/MenuDashboardStudent.vue';
</script>

