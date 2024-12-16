<template>
    <form @submit.prevent="submitForm" class="registration-form">
        <h2>Asignación de Profesor</h2>

        <div class="form-type-register">
            <div class="form-group-register">
                <label for="teacherid">Ingrese el RFC del Profesor</label>
                <input 
                type="text"
                id="teacherid"
                placeholder="RFC del Profesor" 
                v-model="profesor_id"
                required />
            </div>
        </div>

        <div class="form-actions">
            <button @click="$emit('close')" type="button">Cerrar</button>
            <button type="submit">Enviar</button>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAcademyStore } from '@/store/AcademyStore'

const profesor_id = ref('')
const academyStore = useAcademyStore


async function submitForm() {
    try {
        await academyStore.addTeacher(profesor_id.value)
        console.log('Profesor agregado correctamente')
    } catch (error) {
        console.error('Error al agregar el profesor:', error)
    }
}
</script>
