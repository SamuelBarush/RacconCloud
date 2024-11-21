<template>
  <div class="modal-file-options">
    <div v-if="type === 'carpeta'" class="modal-file-options-action" >
      <div class="modal-file-options-action-img" @click="openDeleteModal('carpeta')">
        <img src="../assets/icons/basura.png" alt="Icono Eliminar Carpeta">
      </div>
      <div class="modal-file-options-action-text">
        <p>Eliminar Carpeta</p>
      </div>
    </div>

    <div v-if="type === 'carpeta'" class="modal-file-options-action">
      <div class="modal-file-options-action-img" @click="DescargarCarpeta">
        <img src="../assets/icons/descargar.png" alt="Icono Descargar Carpeta">
      </div>
      <div class="modal-file-options-action-text">
        <p>Descargar Carpeta</p>
      </div>
    </div>

    <div v-if="type === 'archivo'" class="modal-file-options-action" >
      <div class="modal-file-options-action-img" @click="openDeleteModal('archivo')">
        <img src="../assets/icons/basura.png" alt="Icono Eliminar Archivo">
      </div>
      <div class="modal-file-options-action-text">
        <p>Eliminar Archivo</p>
      </div>
    </div>

    <div v-if="type === 'archivo'" class="modal-file-options-action">
      <div class="modal-file-options-action-img" @click="Descargar">
        <img src="../assets/icons/descargar.png" alt="Icono Descargar Archivo">
      </div>
      <div class="modal-file-options-action-text">
        <p>Descargar Archivo</p>
      </div>
    </div>

    <div v-if="type === 'usuario'" class="modal-file-options-action">
      <div class="modal-file-options-action-img">
        <img src="../assets/icons/edit-user.png" alt="Icono Descargar Archivo" @click="openUpdateUser('archivo')">
      </div>
      <div class="modal-file-options-action-text">
        <p>Modificar Usuario</p>
      </div>
    </div>
    <div v-if="type === 'usuario'" class="modal-file-options-action">
      <div class="modal-file-options-action-img" @click="$emit('openDeleteUser')">
        <img src="../assets/icons/delete-user.png" alt="Icono Descargar Archivo">
      </div>
      <div class="modal-file-options-action-text">
        <p>Eliminar Usuario</p>
      </div>
    </div>

    <div class="modal-file-option-button">
      <button @click="closeModalFileOption">
        <img src="../assets/icons/cruz.png" alt="Cerrar">
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
import { useFileStore } from '@/store/FileStore'

const emit = defineEmits(['close-ModalFileOption', 'open-DeleteModal' , 'openUpdateUser', 'openDeleteUser'])
const fileStore = useFileStore()

const props = defineProps({
  type: {
    type: String,
    required: true
  }
})

console.log(props.type)

// Emitir para abrir el modal de eliminación
function openDeleteModal(type) {
  emit('open-DeleteModal', type)
}

function closeModalFileOption() {
  emit('close-ModalFileOption')
}

function openUpdateUser(type) {
  emit('openUpdateUser', type)
}

async function Descargar() {
  await fileStore.downloadFile()
}

async function DescargarCarpeta() {
  await fileStore.downloadFolder()
}
</script>
