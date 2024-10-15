<template>
    <button @click="toggleTheme">
      Cambiar a {{ isDarkMode ? 'Modo Claro' : 'Modo Oscuro' }}
    </button>
  </template>
  
  <script setup>
  import { useThemeStore } from '@/store/ThemeStore';
  const themeStore = useThemeStore();
  
  // Inicializar el tema al montar el componente
  themeStore.setInitialTheme();
  
  const toggleTheme = () => {
    themeStore.toggleTheme();
  };
  </script>
  