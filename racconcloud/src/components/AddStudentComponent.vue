<template>
    <form @submit.prevent="submitForm" class="registration-form">
        <h2>Asignación de Alumno</h2>

        <div class="form-type-register">
            <div class="form-group-register">
                <label for="studentId">Ingrese la boleta del Alumno</label>
                <input 
                type="text" 
                placeholder="Boleta del Alumno" 
                id="studentId"
                v-model="studentId"
                required />
            </div>
        </div>

        <div class="form-actions">
            <button @click="$emit('close')" type="button">Cancelar</button>
            <button type="submit">Enviar</button> 
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAcademyStore } from '@/store/AcademyStore'

const studentId = ref('')
const academyStore = useAcademyStore()

async function submitForm() {
    try {
        await academyStore.addStudent(studentId.value)
        console.log('Alumno agregado correctamente')
    } catch (error) {
        console.error('Error al agregar el alumno:', error)
    }
}


</script>
