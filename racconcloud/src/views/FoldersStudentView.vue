<template>
  <HeaderComponent />
  <main class="main-folders-container">
    <MenuDashboardStudent 
    @open-Modal1="showModal1 = true" 
    @open-Modal2="showModal2 = true"
    @refreshFolders="loadFolders"/>
    <div :class="{ 'main-folder-principal': true, 'shrinked': showModalFileOption }">
      <div class="main-folders-search">
        <img src="../assets/images/busqueda.png" alt="" />
        <input type="search" value="Buscar" />
      </div>

      <!-- Mostrar Carpetas -->
      <div class="main-dashboard-title">
        <p class="breadcrumbs">
          <span v-for="(crumb, index) in breadcrumbs" :key="index" @click="navigateTo(index)">
            {{ crumb }}<span v-if="index < breadcrumbs.length - 1"> / </span>
          </span>
        </p>
      </div>
      <div class="main-container-grid-a">
        <div
          v-for="(folder, index) in folders"
          :key="index"
          class="main-folders-block-a"
          :class="{ 'selected': selectedItem === folder }"
          @dblclick="openFolder(folder)"
          @click="selectFile(folder)"
          @click.right="openModal('carpeta', folder)"
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
          @click="selectFile(file)"
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
  <ModalDelete v-if="showModalDelete" :type="deleteType" @close-ModalDelete="closeModalDelete"/>
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
  
  import { ref , computed , onMounted} from 'vue'
  import { useAuthStore } from '@/store'

  const showModal1 = ref(false)
  const showModal2 = ref(false)
  const showModalFileOption = ref(false)
  const showModalDelete = ref(false)
  const selectedType = ref('')
  const selectedItem = ref('') // Estado para almacenar el ítem seleccionado
  const deleteType = ref('')
  const authStore = useAuthStore()

  // Obtener las carpetas y archivos del directorio actual
  const folders = computed(() => authStore.getCurrentFolderContent.folders)
  const files = computed(() => authStore.getCurrentFolderContent.files)
  const breadcrumbs = computed(() => authStore.getBreadcrumbs)
  
  function openFolder(folder) {
    // Cambiar a la carpeta seleccionada
    authStore.changeDirectory(folder)
  }

  function navigateTo(index) {
    // Navegar a un nivel anterior en la ruta
    const newPath = breadcrumbs.value.slice(1, index + 1).join('/')
    authStore.changeDirectory(newPath)
  }

  function openModal(type, itemName) {
    selectedType.value = type
    selectedItem.value = itemName // Almacenar el ítem seleccionado
    showModalFileOption.value = true
  }

  function closeModalFileOption() {
    showModalFileOption.value = false
    selectedType.value = ''
    selectedItem.value = '' // Reiniciar la selección al cerrar el modal
  }

  function openDeleteModal(type) {
    deleteType.value = type
    showModalFileOption.value = false
    showModalDelete.value = true
  }

  function closeModalDelete() {
    showModalDelete.value = false
  }

  function selectFile(fileName) {
    authStore.setSelectedFile(fileName) // Guardar el archivo seleccionado en el store
    selectedItem.value = fileName // Actualizar visualmente el archivo seleccionado
  }

  function loadFolders() {
    authStore.getFiles()
  }

  onMounted( async () => {
    await authStore.getFiles()
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
  .breadcrumbs {
    span {
      cursor: pointer;
    }
    span:hover {
      text-decoration: underline;
    }
  }
</style>
