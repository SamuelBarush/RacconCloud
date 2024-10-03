<template>
    <HeaderForgotPasswordComponent/>
    <main class="forgot-password-container">
      <div class="forgot-password-box">
        <h2>Olvidé mi Contraseña</h2>
        <p>Por favor, ingresa tu ID de usuario. 
            Te enviaremos tu contraseña a tu correo registrado.</p>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="userId">ID de Usuario</label>
            <input type="text" v-model="userId" id="userId" placeholder="Ingresa tu ID" required>
          </div>
  
          <button type="submit" class="submit-button">Enviar</button>
        </form>
  
        <div v-if="message" class="confirmation-message">
          <p>Hemos enviado un mensaje de recuperación de contraseña al correo {{ maskedEmail }}</p>
        </div>
      </div>
    </main>
</template>
  
<script setup>
    import HeaderForgotPasswordComponent from '../components/HeaderForgotPasswordComponent.vue'
    import { ref } from 'vue';
    
    const userId = ref('');
    const message = ref(false);
    const maskedEmail = ref('');
    
    // Función para enviar el formulario
    function submitForm() {
        // Simulación del proceso de envío de la solicitud de restablecimiento de contraseña
        // Aquí podrías realizar la petición fetch para enviar la solicitud real a la API
        setTimeout(() => {
        // Simular una respuesta de API con un correo ficticio
        const email = 'usuario@example.com';
        
        // Enmascarar el correo para mostrar algo como u*****@e*****.com
        maskedEmail.value = maskEmail(email);
        
        // Mostrar el mensaje de confirmación
        message.value = true;
        }, 1000);
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

<style lang="scss" scoped>
h2 {
  font-family: 'Sono-Bold', sans-serif;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

p {
  font-family: 'Sono-Regular', sans-serif;
  font-size: 14px;
  color: #555;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-family: 'Sono-Light', sans-serif;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  display: block;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  font-family: 'Sono-Regular', sans-serif;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

input[type="text"]:focus {
  border-color: #ff5c33;
  outline: none;
}

</style>