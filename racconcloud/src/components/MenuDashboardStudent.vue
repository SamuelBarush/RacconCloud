<template>
    <div class="menu-dashboard-student-container">
        <div class="menu-dashboard-student-actions">
            <router-link :to="{name:'folders-student'}">
                <div class="menu-dashboard-actions-options">
                    <img src="" alt="">
                    <p>Crear Carpeta</p>
                </div>
            </router-link>
            <router-link :to="{name:'folders-student'}">
                <div class="menu-dashboard-actions-options">
                    <img src="" alt="">
                    <p>Subir Archivo</p>
                </div>
            </router-link>
        </div>
        <div class="menu-dashboard-student-nav">
            <router-link :to="{name:'folders-student'}">
                <div class="menu-dashboard-nav-options">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta Personal</p>
                </div>
            </router-link>
            <router-link :to="{name:'folders-student'}">
                <div class="menu-dashboard-nav-options">
                    <img src="../assets/images/carpeta.png" alt="">
                    <p>Carpeta Materias</p>
                </div>
            </router-link>
        </div>
        <div class="menu-dashboard-student-options">
            <router-link :to="{name: 'info-student'}">
                <div class="menu-dashboard-options-options">
                    <img src="../assets/images/usuario.png" alt="">
                    <p>Perfil</p>
                </div>
            </router-link>
            <router-link :to="{name:'home'}">
                <div class="menu-dashboard-options-options">
                    <img src="../assets/images/salida.png" alt="">
                    <p>Log Out</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>

</script>