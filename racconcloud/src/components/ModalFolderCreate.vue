<template>
    <div class="modal-folder-container">
        <div class="modal-folder-title">
            <p>Crear Carpeta</p>
        </div>
        <div class="modal-folder-title-folder">
            <p>Te encuentras en {{ path }}</p>
        </div>
        <div class="modal-folder-name-folder">
            <input type="text" placeholder="Carpeta Sin Titulo" v-model="folder_name">
        </div>
        <div class="modal-folder-options">
            <input type="button" value="Cancelar" @click="closeModal1" id="modal-folder-option-cancel">
            <input type="submit" value="Crear" id="modal-folder-option-create" @click="CreateFolder">
        </div>
    </div>
</template>

<script setup>
    import { defineEmits, onMounted , ref } from 'vue'
    import { useFileStore } from '@/store/FileStore'
    import { useSubjectsStore } from '@/store/SubjectsStore'
    import { useRouter } from 'vue-router'

    const emit = defineEmits(['close-Modal1'])
    const fileStore = useFileStore()
    const subjectsStore = useSubjectsStore()
    let path = ref('')
    let folder_name = ref('')
    const router = useRouter()

    function closeModal1() {
        emit('close-Modal1')
    }

    onMounted(() => {
        const aux = fileStore.getPath
        const aux2 = subjectsStore.getPath
        const project = subjectsStore.getCurrentSubject
    
        if (router.currentRoute.value.path === '/folders-student-personal'){
            path.value = 'Personal/'
            if (aux != '') path.value +=  aux + '/'
        }
        if (router.currentRoute.value.path === '/folders-student-subjects'){
            path.value = 'Materias/'
            if (project != '') path.value += project + '/'
            if (aux2 != '') path.value +=  aux2 + '/'
        }
        if (router.currentRoute.value.path === '/folders-teacher-personal'){
            path.value = 'Personal/'
            if (aux != '') path.value +=  aux + '/'
        }
        if (router.currentRoute.value.path === '/folders-academy-personal'){
            path.value = 'Personal/'
            if (aux != '') path.value +=  aux + '/'
        }
    })

    async function CreateFolder(){

        if (router.currentRoute.value.path === '/folders-student-personal' || router.currentRoute.value.path === '/folders-teacher-personal' || router.currentRoute.value.path === '/folders-academy-personal'){
            await fileStore.createFolder(folder_name.value)
        } else if (router.currentRoute.value.path === '/folders-student-subjects' || router.currentRoute.value.path === '/folders-teacher-subjects'){
            await subjectsStore.createFolder(folder_name.value)
        }
        folder_name.value = ''
        closeModal1()
    }
</script>