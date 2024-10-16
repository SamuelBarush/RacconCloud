<template>
  <div class="modal-file-options">
    <div class="modal-file-options-action">
      <div class="modal-file-options-action-img">
        <img src="" alt="">
      </div>
      <div class="modal-file-options-action-text">
        <p>Eliminar Carpeta</p>
      </div>
    </div>
    <div class="modal-file-options-action">
      <div class="modal-file-options-action-img">
        <img src="" alt="">
      </div>
      <div class="modal-file-options-action-text">
        <p>Eliminar Archivo</p>
      </div>
    </div>
    <div class="modal-file-options-action">
      <div class="modal-file-options-action-img">
        <img src="" alt="">
      </div>
      <div class="modal-file-options-action-text">
        <p>Descargar Carpeta</p>
      </div>
    </div>
    <div class="modal-file-options-action">
      <div class="modal-file-options-action-img">
        <img src="" alt="">
      </div>
      <div class="modal-file-options-action-text">
        <p>Descargar Archivo</p>
      </div>
    </div>
    <div class="modal-file-option">
      <button @click="closeModalFileOption">Cancelar</button>
    </div>
  </div>
</template>

<script setup>
  import { defineEmits } from 'vue'
  const emit = defineEmits(['close-ModalFileOption'])

  function closeModalFileOption() {
    emit('close-ModalFileOption')
  }
</script>