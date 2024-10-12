<template>
    <HeaderLoginComponent/>
    <main class="main-login-container">
        <div class="main-login-title">
            <h2>Ingresa Tus Datos</h2>
        </div>
        <form class="main-login-form" @submit.prevent="AuthUser">
            <div class="main-login-ID">
                <label for="">Identificación</label>
                <div><input type="text" placeholder="Ingresa tu ID" v-model="ID"></div>
            </div>
            <div class="main-login-PW">
                <label for="">Contraseña</label>
                <div><input type="password" placeholder="Ingresa tu Contraseña" v-model="password"></div>
                <router-link to="/forgot"><p id="main-login-FPW">Olvide mi Contraseña</p></router-link>
            </div>   
            <div class="main-login-BT"><input type="submit" value="Sign Up"></div>
        </form>
    </main>
</template>

<script setup>
    import { ref } from "vue"
    import { useRouter } from "vue-router"
    import HeaderLoginComponent from '../components/HeaderLoginComponent.vue'
    import AuthLogin  from '../services/AuthLogin.js'

    let ID = ref("")
    let password = ref("")
    const router = useRouter()

    const AuthUser = async () => {
        const auth = new AuthLogin()
        const success = await auth.login(ID.value,password.value)
        if (success) {
            alert("Sesion Inciada")
            router.push('/dashboard')
        } else {
            alert("Sesion Incorrecta")
        }
    }
</script>
