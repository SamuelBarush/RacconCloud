<template>
    <div class="modal-folder-container">
        <div class="modal-folder-title">
            <p>Crear Carpeta</p>
        </div>
        <div class="modal-folder-title-folder">
            <p>Te encuentras en</p>
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
    import { defineEmits } from 'vue';

    const emit = defineEmits(['close-Modal1'])

    function closeModal1() {
        emit('close-Modal1')
    }
</script>