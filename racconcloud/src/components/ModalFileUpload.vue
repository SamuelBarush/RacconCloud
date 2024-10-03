<template>
    <div class="modal-file-container">
      <div class="modal-file-title">
        <p>Subir Archivos</p>
      </div>
      <div class="modal-file-principal">
        <div class="modal-file-upload">
          <img src="" alt="">
          <h3>Arrastra tus Archivos</h3>
          <p>Tamaño Maximo Recomendado 50Mb</p>
          <input type="file" multiple @change="handleFileSelect" />
        </div>
  
        <div class="modal-file-preview">
          <div 
            v-for="(file, index) in files" 
            :key="index" 
            class="modal-file-preview-file" 
            :style="{ borderColor: file.status === 'completed' ? '#000' : '#FFCCA9' }"
          >
            <div class="modal-file-preview-img"><img :src="file.preview" alt=""></div>
            <div class="modal-file-preview-description">
              <div class="modal-file-preview-text">
                <p>{{ file.name }}</p>
                <p 
                  class="upload-button" 
                  @click="uploadFile(file, index)"
                  v-if="file.status !== 'completed'"
                >Subir</p>
                <p v-else>Completado</p>
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
            files.value.push({
            file,
            name: file.name,
            status: 'pending',
            progress: 0,
            preview: URL.createObjectURL(file)
            });
        }
    }
</script>