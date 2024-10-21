<template>
    <div class="modal-delete-container">
        <div v-if="type === 'archivo'" class="modal-delete-title">
            <h2>Eliminar Archivo?</h2>
        </div>
        <div v-if="type === 'carpeta'" class="modal-delete-title">
            <h2>Eliminar Carpeta?</h2>
        </div>
        <div v-if="type === 'archivo'" class="modal-delete-text">
            <p>Estas a punto de eliminar de manera permanete el archivo</p>
            <p>Esta acción no se podrá deshacer una vez hecha</p>
        </div>
        <div v-if="type === 'carpeta'" class="modal-delete-text">
            <p>Estas a punto de eliminar de manera permanete la carpeta</p>
            <p>Esta acción no se podrá deshacer una vez hecha</p>
        </div>
        <div class="modal-delete-options">
            <input type="button" value="Cancelar" id="modal-folder-option-cancel">
            <button type="submit"><img src="../assets/icons/basura.png" alt=""></button>
        </div>
    </div>
</template>

<script>
    
</script>