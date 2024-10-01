<template>
    <div class="modal-file-container">
        <div class="modal-file-title">
            <p>Crear Carpeta</p>
        </div>
        <div class="modal-file-title-folder">
            <p>Te encuentras en</p>
        </div>
        <div class="modal-file-name-folder">
            <input type="text" placeholder="Carpeta Sin Titulo">
        </div>
        <div class="modal-file-options">
            <input type="button" value="Cancelar" @click="closeModal" id="modal-file-option-cancel">
            <input type="submit" value="Crear" id="modal-file-option-create">
        </div>
    </div>
</template>

<script setup>
    import { defineEmits } from 'vue';

    const emit = defineEmits(['close-Modal'])

    function closeModal() {
        emit('close-Modal')
    }
</script>