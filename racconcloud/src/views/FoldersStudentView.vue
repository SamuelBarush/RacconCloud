<template>
  <HeaderComponent 
  @search-query="performSearch"/>
  <main class="main-folders-container" v-if="!loading">
    <MenuDashboardStudent 
      @open-Modal1="showModal1 = true" 
      @open-Modal2="showModal2 = true"/>

    <div v-if="isSearching">
      <h3>Resultados de la Búsqueda</h3>
      <div v-for="(result, index) in searchResults" :key="index">
        <p v-if="result.isFolder">Carpeta: {{ result.name }} (Directorio: {{ result.directory }})</p>
        <p v-else>Archivo: {{ result.path }} (Directorio: {{ result.directory }})</p>
      </div>
    </div>
    
    <div  v-else :class="{ 'main-folder-principal': true, 'shrinked': showModalFileOption }">
      <div class="main-folders-search">
        <img src="../assets/images/busqueda.png" alt="" />
        <input type="search" placeholder="Buscar" />
      </div>

      <!-- Mostrar Rutas (Breadcrumbs) -->
      <div class="main-dashboard-title">
        <p class="breadcrumbs">
          <span v-for="(crumb, index) in breadcrumbs" :key="index" @click="navigateTo(index)">
            {{ crumb }}<span v-if="index < breadcrumbs.length - 1"> / </span>
          </span>
        </p>
      </div>

      <!-- Mostrar Carpetas -->
      <div class="main-container-grid-a">
        <div
          v-for="(folder, index) in folders"
          :key="index"
          class="main-folders-block-a"
          :class="{ 'selected': selectedItem === folder }"
          @dblclick="openFolder(folder)"
          @click.right="selectFolder(folder)"
          @contextmenu.prevent="openModal('carpeta', folder)"
          draggable="true"
          @dragover.prevent
          @drop="handleDrop(folder)"
          @dragstart="handleDragStart(folder)"
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
          :class="{ 'selected': selectedItem === file.path }"
          @dblclick="openModal('archivo', file.path)"
          @click="selectFile(file.path)"
          draggable="true"
          @dragover.prevent
          @dragstart="handleDragStart(file.path)"
          @drop="handleDrop(file.path)"
        >
          <div class="main-folders-block-b-img">
            <img src="../assets/images/documento.png" alt="Archivo" />
            <p>{{ file.path.split('/').pop() }}</p>
          </div>
          <div class="main-folders-block-b-txt">
            <p>{{ file.date }}</p>
          </div>
          <div class="main-folders-block-b-txt">
            <p>{{ file.size }} KB</p>
          </div>
        </div>
      </div>
    </div>
  </main>
  <div v-else class="loading">
    <p>Cargando archivos...</p>
  </div>

  <ThemeSwitcherComponent/>
  <FooterComponent />

  <!-- Modales -->
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
import ThemeSwitcherComponent from '@/components/ThemeSwitcherComponent.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFileStore } from '@/store/FileStore'

const showModal1 = ref(false)
const showModal2 = ref(false)
const showModalFileOption = ref(false)
const showModalDelete = ref(false)
const selectedType = ref('')
const selectedItem = ref('')
const deleteType = ref('')
const fileStore = useFileStore()
const router = useRouter()

// Estado de carga
const loading = ref(true)

// Obtener las carpetas y archivos del directorio actual
const folders = computed(() => {
  return isSearching.value
    ? fileStore.searchResults.filter((item) => item.isFolder).map((item) => item.name)
    : fileStore.getCurrentFolderContent.folders;
});

const files = computed(() => {
  return isSearching.value
    ? fileStore.searchResults.filter((item) => !item.isFolder)
    : fileStore.getCurrentFolderContent.files;
});

const breadcrumbs = computed(() => {
  const baseBreadcrumbs = fileStore.getBreadcrumbs;
  if (router.currentRoute.value.name === 'folders-student-personal' || router.currentRoute.value.name === 'folders-teacher-personal' || router.currentRoute.value.name === 'folders-academy-personal') {
    return ['Personal', ...baseBreadcrumbs];
  } else if (router.currentRoute.value.name === 'folders-student-subjects' || router.currentRoute.value.name === 'folders-teacher-subjects' || router.currentRoute.value.name === 'folders-academy-subjects') {
    return ['Materias', ...baseBreadcrumbs];
  }
  return baseBreadcrumbs;
})
const searchResults = computed(() => fileStore.getSearchResults)
const isSearching = computed(() => fileStore.searchQuery.length > 0)


const performSearch = (query) => {
  fileStore.searchFiles(query); // Trigger search in the store
};


async function loadFiles() {
  try {
    if (router.currentRoute.value.path === '/folders-student-personal') {
      await fileStore.getFiles()
    } else if (router.currentRoute.value.path === '/folders-student-subjects') {
      await fileStore.getSubjects()
    }
    loading.value = false
  } catch (error) {
    console.error('Error al cargar los archivos:', error)
  }
}

onMounted(async () => {
  await loadFiles()
})

function openFolder(folder) {
  fileStore.setSelectedFile('')
  fileStore.setSelectedFolder('')
  fileStore.changeDirectory(folder)
}

function navigateTo(index) {
  const newPath = breadcrumbs.value.slice(1, index + 1).join('/')
  fileStore.changeDirectory(newPath)
}

function openModal(type, itemName) {
  selectedType.value = type
  selectedItem.value = itemName
  showModalFileOption.value = true
}

function closeModalFileOption() {
  showModalFileOption.value = false
  selectedType.value = ''
  selectedItem.value = ''
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
  fileStore.setSelectedFile(fileName)
  selectedItem.value = fileName
}

function selectFolder(folderName) {
  fileStore.setSelectedFolder(folderName)
  selectedItem.value = folderName
}

function handleDragStart(source_path) {
  fileStore.setSelectedFile(source_path)
}

function handleDrop(destination_path) {
  fileStore.setSelectedFolder(destination_path)
  fileStore.moveFile()
  fileStore.setSelectedFile('')
  fileStore.setSelectedFolder('')
  fileStore.getFiles()
}
</script>

<style scoped lang="scss">
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: var(--text-color);
}

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
