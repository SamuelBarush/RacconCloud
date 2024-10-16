<template>
    <HeaderComponent/>
    <main class="main-folders-container">
    <MenuDashboardStudent 
      @open-Modal1="showModal1 = true" 
      @open-Modal2="showModal2 = true"
    />
    <!-- Añadimos una clase condicional para cambiar el tamaño cuando el modal esté abierto -->
    <div :class="{'main-folder-principal': true, 'shrinked': showModalFileOption}">
      <div class="main-folders-search">
        <img src="../assets/images/busqueda.png" alt="">
        <input type="search" value="Buscar">
      </div>
      <div class="main-dashboard-title">
        <p>Mis Carpetas</p>
      </div>
      <div class="main-container-grid-a">
        <div class="main-folders-block-a" @click="showModalFileOption = true">
          <img src="../assets/images/carpeta.png" alt="">
          <p>Carpeta</p>
        </div>
        <!-- Repite este bloque para las demás carpetas -->
      </div>
      <div class="main-dashboard-title">
        <p>Mis Archivos</p>
        <div class="main-dashboard-title-description">
          <p>Nombre</p>
          <p>Fecha de Subida</p>
          <p>Tamaño</p>
        </div>
      </div>
      <div class="main-container-grid-b">
        <div class="main-folders-block-b" @click="showModalFileOption = true">
          <div class="main-folders-block-b-img">
            <img src="../assets/images/documento.png" alt="">
            <p>Archivo</p>
          </div>
          <div class="main-folders-block-b-txt"><p>08 - 10 - 2024</p></div>
          <div class="main-folders-block-b-txt"><p>34 Kb</p></div>
        </div>
        <!-- Repite este bloque para los demás archivos -->
      </div>
    </div>
  </main>
    <FooterComponent/>
    <ModalFolderCreate v-if="showModal1" @close-Modal1="showModal1 = false"/>
    <ModalFileUpload v-if="showModal2" @close-Modal2="showModal2 = false"/>
    <ModalFileOption v-if="showModalFileOption" @close-ModalFileOption="closeModalFileOption"/>
    <div v-if="showModal1 || showModal2" class="overlay"></div>
</template>
  
<script setup>
  import HeaderComponent from '@/components/HeaderStudentComponent.vue'
  import FooterComponent from '@/components/FooterStudentComponent.vue'
  import MenuDashboardStudent from '@/components/MenuDashboardStudent.vue'
  import ModalFileUpload from '@/components/ModalFileUpload.vue'
  import ModalFolderCreate from '@/components/ModalFolderCreate.vue'
  import ModalFileOption from '@/components/ModalFileOption.vue'
  
  import { ref } from 'vue'
  
  const showModal1 = ref(false);
  const showModal2 = ref(false);
  const showModalFileOption = ref(false); // Nuevo estado para controlar ModalFileOption
  
  function closeModalFileOption() {
  showModalFileOption.value = false; // Cerrar el modal y restaurar el tamaño original
  }
</script>