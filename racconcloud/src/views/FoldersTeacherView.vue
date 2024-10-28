<template>
    <HeaderTeacherComponent/>
    <main class="main-folders-container">
        <MenuDashboardTeacher @open-Modal1="showModal1 = true" @open-Modal2="showModal2 = true"/>
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
          @click="openFolder(folder)"
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
    <FooterTeacherComponent/>
    <ModalFileOption
    v-if="showModalFileOption"
    :type="selectedType"
    @close-ModalFileOption="closeModalFileOption"
    @open-DeleteModal="openDeleteModal"
    />
    <ModalFolderCreate v-if="showModal1" @close-Modal1="showModal1 = false"/>
    <ModalFileUpload v-if="showModal2" @close-Modal2="showModal2 = false"/>
    <ModalDelete v-if="showModalDelete" :type="deleteType" @close-ModalDelete="closeModalDelete"/>
    <div v-if="showModal1 || showModal2 || showModalDelete" class="overlay"></div>
</template>

<script setup>
    import HeaderTeacherComponent from '@/components/HeaderTeacherComponent.vue'
    import FooterTeacherComponent from '@/components/FooterTeacherComponent.vue'
    import MenuDashboardTeacher from '@/components/MenuDashboardTeacher.vue'
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
        await authStore.getFiles();
    })
</script>

