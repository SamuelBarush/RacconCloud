<template>
    <div class="modal-folder-container">
        <div class="modal-folder-title">
            <p>Crear Carpeta</p>
        </div>
        <div class="modal-folder-title-folder">
            <p>Te encuentras en {{ path }}</p>
        </div>
        <div class="modal-folder-name-folder">
            <input type="text" placeholder="Carpeta Sin Titulo">
        </div>
        <div class="modal-folder-options">
            <input type="button" value="Cancelar" @click="closeModal1" id="modal-folder-option-cancel">
            <input type="submit" value="Crear" id="modal-folder-option-create">
        </div>
    </div>
</template>

<script setup>
    import { defineEmits, onMounted , ref } from 'vue'
    import { useAuthStore } from '@/store'
    import { useRouter } from 'vue-router'

    const emit = defineEmits(['close-Modal1'])
    const authStore = useAuthStore()
    let path = ref('')
    const router = useRouter()

    function closeModal1() {
        emit('close-Modal1')
    }

    onMounted(() => {
        const aux = authStore.getPath
    
        if (router.currentRoute.value.path === '/folders-student-personal'){
            path.value = 'Personal/'
            path.value +=  aux + '/'
        }
        if (router.currentRoute.value.path === '/folders-student-subjects'){
            path.value = 'Materias/'
            path.value +=  aux + '/'
        }
    })
</script>