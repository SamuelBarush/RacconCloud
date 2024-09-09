<template>
  <router-view/>
  <FooterComponent/>
</template>

<script setup>
  import FooterComponent from './components/FooterComponent.vue'
</script>

<style lang="scss">
*{
    margin: 0;
}

body{
    background-color: $black;
}
</style>
