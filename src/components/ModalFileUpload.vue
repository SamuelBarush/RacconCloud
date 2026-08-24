<template>
  <div class="modal-file-container">
    <div class="modal-file-title">
      <p>Subir Archivos</p>
    </div>
    <div class="modal-file-principal">
      <div class="modal-file-upload">
        <h3>Arrastra tus Archivos</h3>
        <p>Tamaño Maximo 50Mb</p>
        <input type="file" multiple @change="handleFileSelect" />
      </div>
      <div class="modal-file-preview">
        <div 
          v-for="(file, index) in files" 
          :key="index" 
          class="modal-file-preview-file" 
          :style="{ 
            borderColor: 
            file.status === 'completed' ? '#EC3A0A' : // Color de borde cuando está completado
            file.status === 'error-upload' ? '#7D1F11' : // Color de borde cuando hubo error en la subida
            file.status === 'error-connection' ? '#000' : // Color de borde cuando hay error de conexión
            file.status === 'uploading' ? '#FFCCA9' : '#FFCCA9' // Color de borde cuando se está subiendo
          }">
          <div class="modal-file-preview-img">
            <img :src="file.icon" alt="icono de archivo" />
          </div>
          <div class="modal-file-preview-description">
            <div class="modal-file-preview-text">
              <p>{{ file.name }}</p>
              <p v-if="file.status !== 'completed'" class="modal-file-preview-text-p" @click="uploadFile(file, index)">
                {{ file.status === 'uploading' ? 'Subiendo...' : 'Subir' }}
              </p>
              <p v-else class="modal-file-preview-text-p">Completado</p>
            </div>
            <div class="modal-file-preview-progress">
              <div 
                v-if="file.progress > 0 && file.status !== 'error-upload' && file.status !== 'error-connection'" 
                class="progress-bar" 
                :style="{ width: file.progress + '%' }"
              ></div>
            </div>
          </div>  
        </div>
      </div>
    </div>
    <div class="modal-file-option">
      <button @click="closeModal2">Cerrar</button>
    </div>
  </div>
</template>

<script setup>
  import { ref , defineEmits } from 'vue'
  import { useRouter } from 'vue-router'
  import { useFileStore } from '@/store/FileStore'
  import { useSubjectsStore } from '@/store/SubjectsStore'

  import FileIconMapper from '@/services/FileIconMapper'

  const fileIconMapper = new FileIconMapper()

  const emit = defineEmits(['close-Modal2'])
  const fileStore = useFileStore()
  const subjectsStore = useSubjectsStore()
  const files = ref([])
  const router = useRouter()

  function closeModal2() {
      emit('close-Modal2')
  }

  // Selecciona archivos
  function handleFileSelect(event) {
      const selectedFiles = event.target.files
      for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i]
          const extension = file.name.split('.').pop().toLowerCase()
          const icon = fileIconMapper.getIcon(extension)
          files.value.push({
            file,
            name: file.name,
            extension,
            icon,
            status: 'pending',
            progress: 0,
            preview: URL.createObjectURL(file)
          })
      }
  }

  async function uploadFile(file, index) {
    // Actualizar el estado del archivo a "subiendo"
    files.value[index].status = 'uploading'

    const FileName = file.name
    const Base64 = await toBase64(file.file)

    // Función para actualizar el progreso
    const updateProgress = (progress, status = null) => {
      files.value[index].progress = progress
      if (status) {
        files.value[index].status = status // Actualizar el estado si hay cambios en el estado (completado o error)
      }
    };

    // Llamar a la función de subir archivo en el store y pasar el callback
    //await fileStore.uploadFile(Base64, FileName, updateProgress)

    if (router.currentRoute.value.path === '/folders-student-personal') {
      await fileStore.uploadFile(Base64, FileName, updateProgress)
    }
    else if (router.currentRoute.value.path === '/folders-student-subjects') {
      await subjectsStore.uploadFile(Base64, FileName, updateProgress)
    }
    else if (router.currentRoute.value.path === '/folders-teacher-personal') {
      await fileStore.uploadFile(Base64, FileName, updateProgress)
    }
    else if (router.currentRoute.value.path === '/folders-academy-personal') {
      await fileStore.uploadFile(Base64, FileName, updateProgress)
    }
  }

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64String = reader.result
        const base64WithoutPrefix = base64String.split(',')[1] // Eliminar el "data:image/png;base64,"
        resolve(base64WithoutPrefix)
      };
      reader.onerror = error => reject(error)
      reader.readAsDataURL(file)
    })
  }

  /*function getEndpointByFileSize(fileSize){
    const MAX_SIZE_SINGLE = 350 * 1024 * 1024
    if(fileSize > MAX_SIZE_SINGLE){
      return 'chunk'
    } else {
      return 'single'
    }
  }*/

</script>