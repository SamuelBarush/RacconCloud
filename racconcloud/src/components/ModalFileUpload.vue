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
          :style="{ borderColor: file.status === 'completed' ? '#EC3A0A' : '#FFCCA9' }"
        >
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
                v-if="file.progress > 0" 
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
  import { defineEmits } from 'vue';
  import FileIconMapper from '@/services/FileIconMapper';

  const fileIconMapper = new FileIconMapper();
  const emit = defineEmits(['close-Modal2'])
  const files = ref([]);

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

  async function uploadFile(file, index) {
    if (file.status === 'completed') return;

    // Simular el progreso de subida
    files.value[index].progress = 50;

    setTimeout(() => {
      // Simular finalización de la subida
      files.value[index].status = 'completed';
      files.value[index].progress = 100;
    }, 1000);
  }
</script>