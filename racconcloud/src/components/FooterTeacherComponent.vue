<template>
    <footer class="footer-dashboard-container">
        <router-link to="/dashboard-teacher"><div class="footer-dashboard-icon"><img src="../assets/images/casa-en-blanco.png" alt=""></div></router-link>
        <router-link to="/folders-teacher-personal" v-if="$route.path === '/folders-teacher-personal'"><div class="footer-dashboard-icon"><img src="../assets/images/carpeta.png" alt=""></div></router-link>
        <router-link to="/folders-teacher-subjects" v-if="$route.path === '/folders-teacher-subjects'"><div class="footer-dashboard-icon"><img src="../assets/images/carpeta.png" alt=""></div></router-link>
        <router-link to="/info-teacher"><div class="footer-dashboard-icon"><img src="../assets/images/usuario (1).png" alt=""></div></router-link>
        <router-link to="/"><div class="footer-dashboard-icon"><img src="../assets/images/salida.png" alt=""></div></router-link>
    </footer>
</template>

