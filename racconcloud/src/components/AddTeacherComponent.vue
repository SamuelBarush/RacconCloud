<template>
    <div class="registration-form">
        <h2>Asignación de Profesor</h2>

        <div class="form-type-register">
            <div class="form-group-register">
                <label for="studentName">Ingrese el RFC del Profesor</label>
                <input type="text" placeholder="RFC del Profesor" required />
            </div>
        </div>

        <div class="form-actions">
            <button @click="closeAddTeacher" type="button">Cancelar</button>
            <button type="button">Enviar</button>
        </div>
    </div>
</template>

<script setup>
    import { defineEmits } from 'vue'

    const emit = defineEmits(['closeAddTeacher'])

    function closeAddTeacher() {
        emit('closeAddTeacher')
    }
</script>
