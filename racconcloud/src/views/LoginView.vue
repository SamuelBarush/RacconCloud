<template>
    <HeaderLoginComponent/>
    <main class="main-login-container">
        <div class="main-login-title">
            <h2>Ingresa Tus Datos</h2>
        </div>
        <form action="" method="post" class="main-login-form">
            <div class="main-login-ID">
                <label for="">Identificación</label>
                <div><input type="text" placeholder="Ingresa tu ID" name="" id="" v-model="ID"></div>
            </div>
            <div class="main-login-PW">
                <label for="">Contraseña</label>
                <div><input type="password" placeholder="Ingresa tu Contraseña" name="" id="" v-model="password"></div>
                <p id="main-login-FPW">Olvide mi Contraseña</p>
            </div>   
            <div class="main-login-BT"><input type="submit" value="Sign Up" @click.prevent="AuthUser"></div>
        </form>
    </main>
</template>

<script setup>
    import { ref } from "vue";
    import HeaderLoginComponent from '../components/HeaderLoginComponent.vue'
    import AuthLogin  from '../services/AuthLogin.js'

    let ID = ref("")
    let password = ref("")

    const AuthUser = async () => {
        const auth = new AuthLogin()
        const success = await auth.login(ID.value,password.value)
        if (success) {
            alert("Sesion Inciada")
        } else {
            alert("Sesion Incorrecta")
        }
    }
</script>
