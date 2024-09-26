<template>
    <HeaderComponent/>
    <main class="main-info-container">
        <MenuDashboardStudent/>
        <div class="main-info-principal">
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
        </div>
    </main>
    <FooterComponent/>
</template>

<script setup>
    import HeaderComponent from '@/components/HeaderComponent.vue'
    import FooterComponent from '@/components/FooterComponent.vue'
    import HeaderComponent from '@/components/HeaderComponent.vue'
</script>
