<template>
    <HeaderInfoComponent/>
    <main class="main-info-container">
        <div class="main-info-user">
            <div><img src="" alt=""></div>
            <p>Nombre Completo del usuario</p>
        </div>
        <div class="main-info-text">
            <h3>Información Básica</h3>
            <div><img src="../assets/images/id-insignia.png" alt=""><p>Boleta: </p></div>
            <div><img src="../assets/images/sobre.png" alt=""><p>Email: </p></div>
            <div><img src="../assets/images/llave.png" alt=""><p>CURP: </p></div>
        </div>
    </main>
    <FooterComponent/>
</template>

<script setup>
    import HeaderInfoComponent from '@/components/HeaderInfoComponent.vue'
    import FooterComponent from '@/components/FooterComponent.vue';
</script>
