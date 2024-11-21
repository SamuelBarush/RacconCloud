<template>
    <div class="modal-delete-container">
      <div class="modal-delete-title">
        <h2>Eliminar Usuario?</h2>
      </div>
      <div class="modal-delete-text">
        <p>Estas a punto de eliminar de manera permanente el usuario {{id}}.</p>
        <p>Esta acción no se podrá deshacer una vez hecha.</p>
      </div>
      <div class="modal-delete-options">
        <input type="button" value="Cancelar" @click="close">
        <button type="submit" @click="Eliminar"><img src="../assets/icons/basura.png" alt="Eliminar"></button>
      </div>
    </div>
</template>
  
<script setup>
    import { defineEmits, onMounted , ref} from 'vue'
    import { useAdminStore } from '@/store/AdminStore'

    const emit = defineEmits(['close'])
    const adminStore = useAdminStore()
    const id = ref('')
    
    function close() {
        emit('close')
    }

    function Eliminar() {
        adminStore.deleteUser(id.value)
    }

    onMounted(() => {
        id.value = adminStore.getId
    })
</script>