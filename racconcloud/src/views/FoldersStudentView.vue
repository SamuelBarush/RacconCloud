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
        <!-- Al hacer clic en una carpeta, pasamos el tipo 'carpeta' al modal -->
        <div class="main-folders-block-a" @click="openModal('carpeta')">
          <img src="../assets/images/carpeta.png" alt="">
          <p>Carpeta</p>
        </div>
        <!-- Repite este bloque para otras carpetas -->
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
        <!-- Al hacer clic en un archivo, pasamos el tipo 'archivo' al modal -->
        <div class="main-folders-block-b" @click="openModal('archivo')">
          <div class="main-folders-block-b-img">
            <img src="../assets/images/documento.png" alt="">
            <p>Archivo</p>
          </div>
          <div class="main-folders-block-b-txt"><p>08 - 10 - 2024</p></div>
          <div class="main-folders-block-b-txt"><p>34 Kb</p></div>
        </div>
        <!-- Repite este bloque para otros archivos -->
      </div>
    </div>
  </main>
  <FooterComponent/>
  
  <!-- Pasamos el tipo seleccionado (carpeta o archivo) al modal -->
  <ModalFileOption 
    v-if="showModalFileOption" 
    :type="selectedType" 
    @close-ModalFileOption="closeModalFileOption"
  />
  <ModalFolderCreate v-if="showModal1" @close-Modal1="showModal1 = false"/>
  <ModalFileUpload v-if="showModal2" @close-Modal2="showModal2 = false"/>

  <div v-if="showModal1 || showModal2" class="overlay"></div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderStudentComponent.vue'
import FooterComponent from '@/components/FooterStudentComponent.vue'
import MenuDashboardStudent from '@/components/MenuDashboardStudent.vue'
import ModalFileOption from '@/components/ModalFileOption.vue'
import ModalFileUpload from '@/components/ModalFileUpload.vue'
import ModalFolderCreate from '@/components/ModalFolderCreate.vue'
import { ref } from 'vue'

const showModal1 = ref(false)
const showModal2 = ref(false)
const showModalFileOption = ref(false); // Estado para controlar si el modal está abierto
const selectedType = ref(''); // Estado para almacenar si se seleccionó una carpeta o archivo

function openModal(type) {
  selectedType.value = type; // Establecer si es 'carpeta' o 'archivo'
  showModalFileOption.value = true; // Abrir el modal
}

function closeModalFileOption() {
  showModalFileOption.value = false; // Cerrar el modal
  selectedType.value = ''; // Reiniciar el tipo seleccionado
}
</script>