<template>
    <HeaderForgotPasswordComponent/>
    <main class="forgot-password-container">
      <div class="forgot-password-box">
        <h2 class="forgot-password-box-title">Olvidé mi Contraseña</h2>
        <p class="forgot-password-box-text">Por favor, ingresa tu ID de usuario. 
            Te enviaremos tu contraseña a tu correo registrado.</p>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="userId">ID de Usuario</label>
            <input type="text" v-model="userId" id="userId" placeholder="Ingresa tu ID" required>
          </div>
          <button type="submit" class="submit-button">Enviar</button>
        </form>
  
        <div v-if="message" class="confirmation-message">
          <p class="forgot-password-box-text">Hemos enviado un mensaje de recuperación de contraseña al correo {{ maskedEmail }}</p>
        </div>
      </div>
    </main>
    <ThemeSwitcherComponent/>
</template>
  
<script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '@/store/AuthStore'

  import HeaderForgotPasswordComponent from '@/components/HeaderForgotPasswordComponent.vue'
  import ThemeSwitcherComponent from '@/components/ThemeSwitcherComponent.vue'
  
  const userId = ref("")
  const message = ref(false)
  const maskedEmail = ref('')
  const authStore = useAuthStore()
  
  // Función para enviar el formulario
  async function submitForm() {
    const email = await authStore.ForgetPassword(userId.value);
    maskedEmail.value = maskEmail(email);
    message.value = true;
  }
  
  // Función para enmascarar el correo
  function maskEmail(email) {
      const parts = email.split('@');
      const local = parts[0];
      const domain = parts[1];
      
      const maskedLocal = local[0] + '*****';
      const maskedDomain = domain[0] + '*****';
      
      return `${maskedLocal}@${maskedDomain}`;
  }
</script>