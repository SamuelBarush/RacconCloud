<template>
  <HeaderComponent />
  <main class="main-folders-container">
    <MenuDashboardStudent @open-Modal1="showModal1 = true" @open-Modal2="showModal2 = true" />

    <div :class="{ 'main-folder-principal': true, 'shrinked': showModalFileOption }">
      <div class="main-folders-search">
        <img src="../assets/images/busqueda.png" alt="" />
        <input type="search" value="Buscar" />
      </div>

      <!-- Mostrar Carpetas -->
      <div class="main-dashboard-title">
        <p>Mis Carpetas</p>
      </div>
      <div class="main-container-grid-a">
        <div
          v-for="(folder, index) in folders"
          :key="index"
          class="main-folders-block-a"
          :class="{ 'selected': selectedItem === folder }"
          @dblclick="openModal('carpeta', folder)"
        >
          <img src="../assets/images/carpeta.png" alt="Carpeta" />
          <p>{{ folder.split('/').pop() }}</p>
        </div>
      </div>

      <!-- Mostrar Archivos -->
      <div class="main-dashboard-title">
        <p>Mis Archivos</p>
        <div class="main-dashboard-title-description">
          <p>Nombre</p>
          <p>Fecha de Subida</p>
          <p>Tamaño</p>
        </div>
      </div>
      <div class="main-container-grid-b">
        <div
          v-for="(file, index) in files"
          :key="index"
          class="main-folders-block-b"
          :class="{ 'selected': selectedItem === file }"
          @dblclick="openModal('archivo', file)"
        >
          <div class="main-folders-block-b-img">
            <img src="../assets/images/documento.png" alt="Archivo" />
            <p>{{ file.split('/').pop() }}</p>
          </div>
          <div class="main-folders-block-b-txt">
            <p>08 - 10 - 2024</p> <!-- Fecha de ejemplo -->
          </div>
          <div class="main-folders-block-b-txt">
            <p>34 Kb</p> <!-- Tamaño de ejemplo -->
          </div>
        </div>
      </div>
    </div>
  </main>

  <FooterComponent />

  <ModalFileOption
    v-if="showModalFileOption"
    :type="selectedType"
    @close-ModalFileOption="closeModalFileOption"
    @open-DeleteModal="openDeleteModal"
  />

  <ModalDelete v-if="showModalDelete" :type="deleteType" @close-ModalDelete="closeModalDelete" />
  <ModalFolderCreate v-if="showModal1" @close-Modal1="showModal1 = false" />
  <ModalFileUpload v-if="showModal2" @close-Modal2="showModal2 = false" />

  <div v-if="showModal1 || showModal2 || showModalDelete" class="overlay"></div>
</template>

<script setup>
  import HeaderComponent from '@/components/HeaderStudentComponent.vue'
  import FooterComponent from '@/components/FooterStudentComponent.vue'
  import MenuDashboardStudent from '@/components/MenuDashboardStudent.vue'
  import ModalFileOption from '@/components/ModalFileOption.vue'
  import ModalFileUpload from '@/components/ModalFileUpload.vue'
  import ModalFolderCreate from '@/components/ModalFolderCreate.vue'
  import ModalDelete from '@/components/ModalFileDelete.vue'
  import { ref } from 'vue'
  import { onMounted } from 'vue'
  import { useAuthStore } from '@/store'

  const showModal1 = ref(false)
  const showModal2 = ref(false)
  const showModalFileOption = ref(false)
  const showModalDelete = ref(false)
  const selectedType = ref('')
  const selectedItem = ref('') // Estado para almacenar el ítem seleccionado
  const deleteType = ref('')
  const authStore = useAuthStore()
  const files = ref([])
  const folders = ref([])

  function openModal(type, itemName) {
    selectedType.value = type;
    selectedItem.value = itemName; // Almacenar el ítem seleccionado
    showModalFileOption.value = true;
  }

  function closeModalFileOption() {
    showModalFileOption.value = false;
    selectedType.value = '';
    selectedItem.value = ''; // Reiniciar la selección al cerrar el modal
  }

  function openDeleteModal(type) {
    deleteType.value = type;
    showModalFileOption.value = false;
    showModalDelete.value = true;
  }

  function closeModalDelete() {
    showModalDelete.value = false;
  }

  onMounted( async () => {
    const userInfo = await authStore.getFiles();
    files.value = userInfo[""].files;
    folders.value = userInfo[""].folders;
  })
</script>

<style scoped lang="scss">
  .selected {
    background-color: var(--invert-background-color-page);
    color: var(--invert-text-color);
  }
  .selected p{
    color: var(--invert-text-color) !important;
  }
</style>
