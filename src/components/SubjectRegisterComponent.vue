<template>
    <div class="create-subject-container">
        <h2>Crear Nueva Materia</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="semester_name">No. del Semestre</label>
                <input
                    type="number"
                    id="semester_name"
                    v-model="semester_number"
                    placeholder="No. del Semestre"
                    required
                />
            </div>
            <div class="form-group">
                <label for="carreer_name">Carrera</label>
                <select v-model="carreer_name" required>
                    <option value="" disabled>Seleccione una opción</option>
                    <option value="C">Sistemas Computacionales</option>
                    <option value="AI">Inteligencia Artificial</option>
                    <option value="CD">Ciencia de Datos</option>
                </select>
            </div>
            <div class="form-group">
                <label for="turn">Turno</label>
                <select v-model="turn" required>
                    <option value="" disabled>Seleccione una opción</option>
                    <option value="M">Matutino</option>
                    <option value="V">Vespertino</option>
                </select>
            </div>
            <div class="form-group">
                <label for="group_id">No. del Grupo</label>
                <input
                    type="number"
                    id="group_id"
                    v-model="group_id"
                    placeholder="No. del Grupo"
                    required
                    
                />
            </div>
            <div class="form-group">
            <label for="subject_name">Nombre de la Materia</label>
            <input
                type="text"
                id="subject_name"
                v-model="subject_name"
                placeholder="Nombre de la Materia"
                required
            />
            </div>
            <div class="form-group">
                <label for="teacher_id">RFC del Profesor Titular</label>
                <input
                    type="text"
                    id="teacher_id"
                    v-model="teacher_id"
                    placeholder="RFC del Profesor"
                />
            </div>
            <div class="form-actions">
                <button type="submit" class="submit-button">Crear Materia</button>
                <button type="button" class="cancel-button" @click="$emit('close')">Cerrar</button>
            </div>
        </form>
    </div>
</template>
  
<script setup>
    //import { ref , defineEmits } from 'vue'
    import { ref } from 'vue'
    import { useAcademyStore } from '@/store/AcademyStore'
    
    const semester_number = ref('')
    const turn = ref('')
    const carreer_name = ref('')
    const subject_name = ref('')
    const group_id = ref('')
    const teacher_id = ref('')
    //const emit = defineEmits(['close'])
    
    const academyStore = useAcademyStore()

    
    async function submitForm() {
        group_id.value = `${semester_number.value}${carreer_name.value}${turn.value}${group_id.value}`
        try {
            await academyStore.createSubject(
                subject_name.value,
                group_id.value,
                teacher_id.value
            )
            //emit('close');
        } catch (error) {
            console.error(error);
        }
    }
</script>
  
<style scoped lang="scss">
    .create-subject-container {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: var(--invert-background-color-page);
        padding: 25px;
        border-radius: 20px;
        width: 700px;
        height: 550px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
    
        h2 {
            color: var(--invert-text-color);
            margin-bottom: 20px;
            text-align: center;
            font-family: 'Sono-Bold';
        }
    
        form{
            width: 80%;
        }

        .form-group {
            margin-bottom: 15px;
        
            label {
                display: block;
                margin-bottom: 5px;
                color: var(--invert-text-color);
            }
        
            input {
                width: 100%;
                padding: 10px;
                border: 1px solid $color-7;
                border-radius: 5px;
                color: var(--invert-text-color);
            }
        
            input:focus {
                border-color: var(--focus-color);
                outline: none;
            }
        }
    
        .form-actions {
            display: flex;
            justify-content: space-between;
        
            .submit-button,
            .cancel-button {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s;
        
                &:hover {
                    background-color: $color-7;
                }
            }
        
            .submit-button {
                background-color: $color-5;
                color: var(--text-color);
            }
        
            .cancel-button {
                background-color: $color-5;
                color: var(--text-color);
            }
        }
    }
</style>
  