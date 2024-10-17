<template>
  <div class="modal-file-options">
    <div v-if="type === 'carpeta'" class="modal-file-options-action">
      <div class="modal-file-options-action-img">
        <img src="../assets/icons/basura.png" alt="Icono Eliminar Carpeta">
      </div>
      <div class="modal-file-options-action-text">
        <p>Eliminar Carpeta</p>
      </div>
    </div>

    <div v-if="type === 'carpeta'" class="modal-file-options-action">
      <div class="modal-file-options-action-img">
        <img src="../assets/icons/descargar.png" alt="Icono Descargar Carpeta">
      </div>
      <div class="modal-file-options-action-text">
        <p>Descargar Carpeta</p>
      </div>
    </div>

    <div v-if="type === 'archivo'" class="modal-file-options-action">
      <div class="modal-file-options-action-img">
        <img src="../assets/icons/basura.png" alt="Icono Eliminar Archivo">
      </div>
      <div class="modal-file-options-action-text">
        <p>Eliminar Archivo</p>
      </div>
    </div>

    <div v-if="type === 'archivo'" class="modal-file-options-action">
      <div class="modal-file-options-action-img">
        <img src="../assets/icons/descargar.png" alt="Icono Descargar Archivo">
      </div>
      <div class="modal-file-options-action-text">
        <p>Descargar Archivo</p>
      </div>
    </div>

    <div class="modal-file-option-button">
      <button @click="closeModalFileOption">
        <img src="../assets/icons/cruz.png" alt="">
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const emit = defineEmits(['close-ModalFileOption'])
const props = defineProps({
  type: {
    type: String,
    required: true
  }
})

 console.log(props.type)

function closeModalFileOption() {
  emit('close-ModalFileOption')
}
</script>
