import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const auth = ref(false); // Controla si el usuario está autenticado
  const role = ref(0);    // Almacena el rol del usuario

  // Función para iniciar sesión
  function setAuth(status) {
    auth.value = status;
  }

  // Función para establecer el rol del usuario
  function setRole(userRole) {
    role.value = userRole;
  }

  // Función para cerrar sesión
  function logout() {
    auth.value = false;
    role.value = 0;
  }

  return {
    auth,
    role,
    setAuth,
    setRole,
    logout
  };
});
