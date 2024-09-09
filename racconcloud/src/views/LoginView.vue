<template>
    <HeaderLoginComponent/>
    <main class="main-login-container">
        <form action="" method="post">
            <div class="main-login-ID">
                <label for="">Identificación</label>
                <div><input type="text" value="Ingresa tu ID" name="" id="" v-model="ID"></div>
            </div>
            <div class="main-login-PW">
                <label for="">Contraseña</label>
                <div><input type="text" value="Ingresa tu Contraseña" name="" id="" v-model="password"></div>
                <p id="main-login-FPW">Olvide mi Contraseña</p>
            </div>   
            <div class="main-login-BT"><button type="submit" @click="authUser">Sign Up</button></div>
        </form>
    </main>
</template>

<script setup>
    import { ref } from "vue";
    import HeaderLoginComponent from '../components/HeaderLoginComponent.vue'

    let ID = ref("")
    let password = ref("")
</script>
