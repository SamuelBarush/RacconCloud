<template>
    <HeaderFolderComponent/>
    <main class="main-folders-container">
        <div class="main-folders-search" id="folder-block-a">
            <img src="../assets/images/busqueda.png" alt="">
            <input type="text" value="Buscar">
        </div>
        <div class="main-folders-block" id="folder-block-1">
            <img src="../assets/images/carpeta.png" alt="">
            <p>Carpeta</p>
        </div>
        <div class="main-folders-block" id="folder-block-2">
            <img src="../assets/images/carpeta.png" alt="">
            <p>Carpeta</p>
        </div>
        <div class="main-folders-block" id="folder-block-3">
            <img src="../assets/images/carpeta.png" alt="">
            <p>Carpeta</p>
        </div>
        <div class="main-folders-block" id="folder-block-4">
            <img src="../assets/images/carpeta.png" alt="">
            <p>Carpeta</p>
        </div>
        <div class="main-folders-block" id="folder-block-5">
            <img src="../assets/images/carpeta.png" alt="">
            <p>Carpeta</p>
        </div>
        <div class="main-folders-block" id="folder-block-6">
            <img src="../assets/images/documento.png" alt="">
            <p>Archivo</p>
        </div>
        <div class="main-folders-block" id="folder-block-7">
            <img src="../assets/images/documento.png" alt="">
            <p>Archivo</p>
        </div>
        <div class="main-folders-block" id="folder-block-8">
            <img src="../assets/images/documento.png" alt="">
            <p>Archivo</p>
        </div>   
    </main>
    <FooterComponent/>
</template>

<script setup>
    import HeaderFolderComponent from '@/components/HeaderFolderComponent.vue'
    import FooterComponent from '@/components/FooterComponent.vue';
</script>

