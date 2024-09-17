<template>
  <header class="header-home-container" v-if="showMainandHeader">
        <div class="header-home-principal">
            <img class="header-home-logo" src="./assets/images/logo.svg" alt="Sun Icon">
            <router-link to="/login">
                <button class="header-home-sign-in" @click="handleSignin">Sign In</button>
            </router-link>
        </div>      
    </header>
    <main class="main-home-container" v-if="showMainandHeader">
      <div class="main-home-image">
          <img src="./assets/images/cloud-image.jpg" alt="">
          <div class="main-home-text">
            <h1>Raccon Cloud</h1>
            <p>Bienvenido a la Nube de la ESCOM</p>
          </div>    
      </div>
      <div class="aside" v-if="showMainandHeader">
        <ul>
          <li><img class="main-home-image-slide" src="./assets/images/small-cloud-image.jpg" alt="Small Cloud Image"></li>
          <li><img class="main-home-image-slide" src="./assets/images/small-cloud-image.jpg" alt="Small Cloud Image"></li>
          <li><img class="main-home-image-slide" src="./assets/images/small-cloud-image.jpg" alt="Small Cloud Image"></li>
          <li><img class="main-home-image-slide" src="./assets/images/small-cloud-image.jpg" alt="Small Cloud Image"></li>
        </ul>
        <h2>Aviso de Mantenimiento</h2>
        <p>La plataforma tendrá mantenimiento el día 
          27 de Mayo del 2024</p>
      </div>
    </main>
  <router-view/>
</template>

<script setup>
  import { ref } from "vue"
  import { useRouter } from "vue-router";

  const showMainandHeader = ref(true)
  const router = useRouter()

  const handleSignin = () => {
    showMainandHeader.value = false
    router.push('/login')
  }

</script>

<style lang="scss">
*{
    margin: 0;
}

body{
    background-color: $black;
}
</style>
