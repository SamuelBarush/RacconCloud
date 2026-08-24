<template>
    <div class="edit-user-form">
      <h2>Editar Datos de Usuario</h2>
      <form @submit.prevent="submitForm">
        <!-- Campo para modificar el nombre (solo visible para administradores) -->
        <div class="form-group" v-if="isAdmin">
          <label for="name">Nombre del Usuario</label>
          <input 
            type="text" 
            id="name" 
            v-model="user.name" 
            placeholder="Nombre del Usuario" 
            required 
          />
        </div>
  
        <!-- Campo para modificar el correo -->
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input 
            type="email" 
            id="email" 
            v-model="user.email" 
            placeholder="Correo Electrónico" 
            required 
          />
        </div>
  
        <!-- Campo para modificar la contraseña -->
        <div class="form-group">
          <label for="password">Nueva Contraseña</label>
          <input 
            type="password" 
            id="password" 
            v-model="user.password" 
            placeholder="Nueva Contraseña" 
            required 
          />
        </div>
  
        <div class="form-actions">
          <button type="button" @click="$emit('close')">Cancelar</button>
          <button type="submit">Guardar Cambios</button>
        </div>
      </form>
    </div>
</template>

<script setup>
    import { ref , defineEmits } from 'vue'
    import { useAuthStore } from '@/store/AuthStore'

    const authStore = useAuthStore()
    const isAdmin = ref(true)

    const user = ref({
        name: '',
        email: '',
        password: ''
    })

    const emit = defineEmits(['close'])

    async function submitForm() {
        try {
            await authStore.updateUser(
                user.value.name,
                user.value.email,
                user.value.password
            )
            emit('close')
        } catch (error) {
            console.error(error)
        }
    }

</script>

<style scoped lang="scss">
.edit-user-form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: var(--invert-background-color-page);
  border-radius: 10px;
  padding: 20px;
  z-index: 1000;

  h2 {
    text-align: center;
    font-family: 'Sono-Bold';
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      font-family: 'Sono-Light';
      margin-bottom: 5px;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid $color-7;
      border-radius: 5px;
      font-family: 'Sono-Light';
    }
  }

  .form-actions {
    display: flex;
    justify-content: space-between;

    button {
      width: 45%;
      padding: 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-family: 'Sono-Bold';
      font-size: 14px;
      transition: background-color 0.3s;

      &:first-of-type {
        background-color: $color-7;
      }

      &:last-of-type {
        background-color: $color-5;
        color: var(--invert-text-color);
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>