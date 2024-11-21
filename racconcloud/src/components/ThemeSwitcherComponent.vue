<template>
    <button class="theme-toggle-button" @click="toggleTheme">
      <img src="../assets/icons/theme.png" alt="tema">
    </button>
</template>
  
<script setup>
  import { useThemeStore } from '@/store/ThemeStore'
  const themeStore = useThemeStore()
  
  // Inicializar el tema al montar el componente
  themeStore.setInitialTheme()
  
  const toggleTheme = () => {
    themeStore.toggleTheme()
  }
</script>
  
<style lang="scss" scoped>
  .theme-toggle-button {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 5px 5px;
    background-color: $color-7;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.3s ease;

    img{
      width: 30px;
      height: 30px;
    }

    &:hover {
      opacity: 1;
      transform: scale(1.2);
    }
  }
</style>