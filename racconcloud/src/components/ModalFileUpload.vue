<template>
    <div class="modal-file-container">
        <div class="modal-file-title">
            <p>Subir Archivos</p>
        </div>
        <div class="modal-file-principal">
            <div class="modal-file-upload">
                <img src="" alt="">
                <h3>Arrastra tus Archivos</h3>
                <p>Tamaño Maximo 50Mb</p>
                <input type="file" name="" id="">
            </div>
            <div class="modal-file-preview">
                <div class="modal-file-preview-file">
                    <div class="modal-file-preview-img"><img src="" alt=""></div>
                    <div class="modal-file-preview-description">
                        <div class="modal-file-preview-text">
                            <p>Prueba.docx</p>
                            <p>Completado</p>
                        </div>
                        <div class="modal-file-preview-progress"></div>
                    </div>  
                </div>
                <div class="modal-file-preview-file">
                    <div class="modal-file-preview-img"><img src="" alt=""></div>
                    <div class="modal-file-preview-description">
                        <div class="modal-file-preview-text">
                            <p>Prueba.docx</p>
                            <p>Cancelar</p>
                        </div>
                        <div class="modal-file-preview-progress"></div>
                    </div>  
                </div>
                <div class="modal-file-preview-file">
                    <div class="modal-file-preview-img"><img src="" alt=""></div>
                    <div class="modal-file-preview-description">
                        <div class="modal-file-preview-text">
                            <p>Prueba.docx</p>
                            <p>Cancelado</p>
                        </div>
                        <div class="modal-file-preview-progress"></div>
                    </div>  
                </div>
                <div class="modal-file-preview-file">
                    <div class="modal-file-preview-img"><img src="" alt=""></div>
                    <div class="modal-file-preview-description">
                        <div class="modal-file-preview-text">
                            <p>Prueba.docx</p>
                            <p>Completado</p>
                        </div>
                        <div class="modal-file-preview-progress"></div>
                    </div>  
                </div>
                <div class="modal-file-preview-file">
                    <div class="modal-file-preview-img"><img src="" alt=""></div>
                    <div class="modal-file-preview-description">
                        <div class="modal-file-preview-text">
                            <p>Prueba.docx</p>
                            <p>Completado</p>
                        </div>
                        <div class="modal-file-preview-progress"></div>
                    </div>  
                </div>
            </div>
        </div>
        <div class="modal-file-option">
            <button @click="closeModal2">Cancelar</button>
        </div>
    </div>
</template>

<script setup>
    import { defineEmits } from 'vue';

    const emit = defineEmits(['close-Modal2'])

    function closeModal2() {
        emit('close-Modal2')
    }
</script>