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
    import { useAuthStore } from "@/store"
    import { useRouter } from "vue-router"
    import HeaderLoginComponent from '@/components/HeaderLoginComponent.vue'

    let ID = ref("")
    let password = ref("")
    const authStore = useAuthStore()
    const router = useRouter()

    const AuthUser = async () => {
        await authStore.login(ID.value, password.value)
        if (authStore.isAuthenticated) {
            if (authStore.role === "admin") router.push("/dashboard-admin")
            else if (authStore.role === "academy") router.push("/dashboard-academy")
            else if (authStore.role === "teacher") router.push("/dashboard-teacher")
            else if (authStore.role === "student") router.push("/dashboard-student")
        }
    }
</script>
