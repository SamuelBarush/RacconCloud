<template>
    <HeaderComponent/>
    <main class="main-folders-container">
        <MenuDashboardStudent/>
        <div class="main-folder-principal">
            <div class="main-folders-search">
                <img src="../assets/images/busqueda.png" alt="">
                <input type="search" value="Buscar">
            </div>
            <div class="main-dashboard-title">
                <p>Mis Carpetas</p>
            </div>
            <div class="main-container-grid-a">
                <div class="main-folders-block-a">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta</p>
                </div>
                <div class="main-folders-block-a">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta</p>
                </div>
                <div class="main-folders-block-a">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta</p>
                </div>
                <div class="main-folders-block-a">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta</p>
                </div>
                <div class="main-folders-block-a">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta</p>
                </div>
            </div>
            <div class="main-dashboard-title">
                <p>Mis Archivos</p>
            </div>
            <div class="main-container-grid-b">
                <div class="main-folders-block-b">
                    <img src="../assets/images/documento.png" alt="">
                    <p>Archivo</p>
                </div>
                <div class="main-folders-block-b">
                    <img src="../assets/images/documento.png" alt="">
                    <p>Archivo</p>
                </div>
                <div class="main-folders-block-b">
                    <img src="../assets/images/documento.png" alt="">
                    <p>Archivo</p>
                </div>
            </div>
        </div>    
    </main>
    <FooterComponent/>
</template>

<script setup>
    import HeaderComponent from '@/components/HeaderComponent.vue'
    import FooterComponent from '@/components/FooterComponent.vue'
    import MenuDashboardStudent from '@/components/MenuDashboardStudent.vue'
</script>

