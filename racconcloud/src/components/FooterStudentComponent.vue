<template>
    <footer class="footer-dashboard-container">
        <router-link to="/dashboard-student"><div class="footer-dashboard-icon"><img src="../assets/images/casa-en-blanco.png" alt=""></div></router-link>
        <router-link to="/folders-student-personal" v-if="$route.path === '/folders-student-personal'"><div class="footer-dashboard-icon"><img src="../assets/images/carpeta.png" alt=""></div></router-link>
        <router-link to="/folders-student-subjects" v-if="$route.path === '/folders-student-subjects'"><div class="footer-dashboard-icon"><img src="../assets/images/carpeta.png" alt=""></div></router-link>
        <router-link to="/info-student"><div class="footer-dashboard-icon"><img src="../assets/images/usuario (1).png" alt=""></div></router-link>
        <router-link to="/"><div class="footer-dashboard-icon"><img src="../assets/images/salida.png" alt=""></div></router-link>
    </footer>
</template>

