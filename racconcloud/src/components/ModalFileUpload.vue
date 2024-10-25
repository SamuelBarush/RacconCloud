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
            file.status === 'completed' ? '#EC3A0A' :
            file.status === 'error-upload' ? '#7D1F11' :
            file.status === 'error-connection' ? '#000' : '#FFCCA9'
            }">
          <!-- Muestra el ícono basado en la extensión del archivo -->
          <div class="modal-file-preview-img">
            <img :src="file.icon" alt="icono de archivo" />
          </div>

          <div class="modal-file-preview-description">
            <div class="modal-file-preview-text">
              <p>{{ file.name }}</p>
              <p @click="uploadFile(file, index)">{{ file.status === 'completed' ? 'Completado' : 'Subir' }}</p>
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
      <button @click="closeModal2">Cancelar</button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { defineEmits } from 'vue'
  import { useAuthStore } from '@/store'
  import FileIconMapper from '@/services/FileIconMapper'

  const fileIconMapper = new FileIconMapper()
  const emit = defineEmits(['close-Modal2'])
  const authStore = useAuthStore()
  const files = ref([])

  function closeModal2() {
      emit('close-Modal2')
  }

  // Selecciona archivos
  function handleFileSelect(event) {
      const selectedFiles = event.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          const extension = file.name.split('.').pop().toLowerCase();
          const icon = fileIconMapper.getIcon(extension);
          files.value.push({
            file,
            name: file.name,
            extension,
            icon,
            status: 'pending',
            progress: 0,
            preview: URL.createObjectURL(file)
          });
      }
  }
  /*
  async function uploadFile(file, index) {
    if (file.status === 'completed') return;

    // Simular el progreso de subida
    files.value[index].progress = 50;

    setTimeout(() => {
      // Simular finalización de la subida
      files.value[index].status = 'completed';
      files.value[index].progress = 100;
    }, 1000);
  }*/

  async function uploadFile(file) {
    //if (file.status === 'completed') return;

    const FileName = file.name
    const Base64 = await toBase64(file.file)
    const path = ''

    await authStore.uploadFile(Base64, FileName, path)

  }


  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        // Eliminar el prefijo del base64 si es necesario
        const base64WithoutPrefix = base64String.split(',')[1]; // Eliminar el "data:image/png;base64,"
        resolve(base64WithoutPrefix);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
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