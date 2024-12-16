<template>
    <HeaderChangePasswordComponent/>
    <main class="forgot-password-container">
      <div class="forgot-password-box">
        <h2 class="forgot-password-box-title">Bienvenido a RaccoonCloud</h2>
        <p class="forgot-password-box-text">Antes de ingresar tendras que crear una nueva contraseña para ingresar</p>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="password">Colocar tu nueva contraseña para ingresar a la plataforma</label>
            <input type="password" v-model="new_password" id="password" placeholder="Nueva Contraseña" required>
            <label for="conf_password">Confirma tu contraseña</label>
            <input type="password" v-model="conf_password" id="conf_password" placeholder="Nueva Contraseña" required>
          </div>
          <button type="submit" class="submit-button">Enviar</button>
        </form>
      </div>
    </main>
    <ThemeSwitcherComponent/>
</template>

<script setup>
    import { ref } from 'vue'
    import { useAuthStore } from '@/store/AuthStore'
    import { useRouter } from 'vue-router'

    import ThemeSwitcherComponent from '@/components/ThemeSwitcherComponent.vue'
    import HeaderChangePasswordComponent from '@/components/HeaderChangePasswordComponent.vue'

    const new_password = ref("")
    const conf_password = ref("")
    const authStore = useAuthStore()
    const router = useRouter()

    // Función para enviar el formulario
    async function submitForm() {
        if(new_password.value === conf_password.value){
            await authStore.newPassword(new_password.value)
            router.push('/')
        }else{
            alert("Las contraseñas no coinciden")
            new_password.value = ""
            conf_password.value = ""
        }
    }
</script>