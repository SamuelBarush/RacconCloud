<template>
    <div class="modal-delete-container">
      <div v-if="type === 'archivo'" class="modal-delete-title">
        <h2>Eliminar Archivo?</h2>
      </div>
      <div v-if="type === 'carpeta'" class="modal-delete-title">
        <h2>Eliminar Carpeta?</h2>
      </div>
      <div v-if="type === 'archivo'" class="modal-delete-text">
        <p>Estas a punto de eliminar de manera permanente el archivo {{file}}.</p>
        <p>Esta acción no se podrá deshacer una vez hecha.</p>
      </div>
      <div v-if="type === 'carpeta'" class="modal-delete-text">
        <p>Estas a punto de eliminar de manera permanente la carpeta {{folder}}.</p>
        <p>Esta acción no se podrá deshacer una vez hecha.</p>
      </div>
      <div class="modal-delete-options">
        <input type="button" value="Cancelar" @click="closeModalDelete">
        <button type="submit" @click="Eliminar"><img src="../assets/icons/basura.png" alt="Eliminar"></button>
      </div>
    </div>
</template>
  
<script setup>
  import { defineEmits, defineProps , onMounted , ref} from 'vue'
  import { useFileStore } from '@/store/FileStore'
  import { useSubjectsStore } from '@/store/SubjectsStore'
  import { useRouter } from 'vue-router'

  const fileStore = useFileStore()
  const subjectsStore = useSubjectsStore()
  const router = useRouter()
  const file = ref('')
  const folder = ref('')
  const emit = defineEmits(['close-ModalDelete'])
  const props = defineProps({
    type: {
      type: String,
      required: true
    }
  })

  console.log(props.type)
  
  function closeModalDelete() {
    emit('close-ModalDelete')
  }

  async function Eliminar() {
    if (props.type === 'archivo') {
      if (router.currentRoute.value.path === '/folders-student-personal' || router.currentRoute.value.path === '/folders-teacher-personal' || router.currentRoute.value.path === '/folders-academy-personal'){
        console.log('delete file personal')
        await fileStore.deleteFile()
      } else if (router.currentRoute.value.path === '/folders-student-subjects'){
        console.log('delete file subjects')
        await subjectsStore.deleteFile()
      } 
    } else {
      if (router.currentRoute.value.path === '/folders-student-personal' || router.currentRoute.value.path === '/folders-teacher-personal' || router.currentRoute.value.path === '/folders-academy-personal'){
        console.log('delete folder subjects')
        await fileStore.deleteFolder()
      } else if(router.currentRoute.value.path === '/folders-student-subjects'){
        console.log('delete folder subjects')
        await subjectsStore.deleteFolder()
      }
    }

    emit('close-ModalDelete')
  }

  onMounted(() => {
    file.value = fileStore.getFile
    folder.value = fileStore.getFolder  
  })
</script>