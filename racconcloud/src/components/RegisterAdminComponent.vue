<template>
    <div class="registration-form">
      <h2>Registro de Usuario</h2>
      
      <div class="form-group-register">
        <label for="userType">Tipo de Usuario:</label>
        <select v-model="userType" @change="resetForm" required>
          <option value="" disabled>Selecciona una opción</option>
          <option value="academia">Academia</option>
          <option value="profesor">Profesor</option>
          <option value="alumno">Alumno</option>
        </select>
      </div>
  
      <!-- Campos para Academia -->
      <div v-if="userType === 'academia'" class="form-type-register">
        <div class="form-group-register">
          <label for="academyName">Nombre de la Academia:</label>
          <input type="text" v-model="formData.academia.nombreAcademia" required />
        </div>
        <div class="form-group-register">
          <label for="academyHead">Nombre del Profesor Encargado:</label>
          <input type="text" v-model="formData.academia.profesorEncargado" required />
        </div>
      </div>
  
      <!-- Campos para Profesor -->
      <div v-if="userType === 'profesor'" class="form-type-register">
        <div class="form-group-register">
          <label for="profName">Nombre Completo del Profesor:</label>
          <input type="text" v-model="formData.profesor.nombre" required />
        </div>
        <div class="form-group-register">
          <label for="profRFC">RFC:</label>
          <input type="text" v-model="formData.profesor.rfc" required />
        </div>
        <div class="form-group-register">
          <label for="profEmail">Correo Institucional:</label>
          <input type="email" v-model="formData.profesor.correoInstitucional" required />
        </div>
      </div>
  
      <!-- Campos para Alumno -->
      <div v-if="userType === 'alumno'" class="form-type-register">
        <div class="form-group-register">
          <label for="studentName">Nombre Completo del Alumno:</label>
          <input type="text" v-model="formData.alumno.nombre" required />
        </div>
        <div class="form-group-register">
          <label for="studentBoleta">No. de Boleta:</label>
          <input type="number" v-model="formData.alumno.boleta" required />
        </div>
        <div class="form-group-register">
          <label for="studentAltEmail">Correo:</label>
          <input type="email" v-model="formData.alumno.correoAlternativo" required/>
        </div>
      </div>
  
      <!-- Botones -->
      <div class="form-actions">
        <button @click="closeModal1" type="button">Cancelar</button>
        <button @click="submitForm" type="button">Enviar</button>
      </div>
    </div>
</template>
  
<script setup>
  import { ref , defineEmits} from 'vue'
  

  const emit = defineEmits(['close-Modal1'])
  const userType = ref('')
  const formData = ref({
    academia: { nombreAcademia: '', profesorEncargado: '' },
    profesor: { nombre: '', rfc: '', correoInstitucional: '' },
    alumno: { nombre: '', boleta: '', correoInstitucional: ''}
  })
  
  // Resetear formulario al cambiar el tipo de usuario
  const resetForm = () => {
    formData.value = {
      academia: { nombreAcademia: '', profesorEncargado: '' },
      profesor: { nombre: '', rfc: '', correoInstitucional: '' },
      alumno: { nombre: '', boleta: '', correoAlternativo: ''}
    }
  }
  
  // Enviar formulario e imprimir en consola
  const submitForm = () => {
    console.log('Datos enviados:', {
      tipoUsuario: userType.value,
      ...formData.value[userType.value]
    })
  }
  
  // Cancelar formulario
  const closeModal1 = () => {
    userType.value = ''
    resetForm()
    emit('close-Modal1')
  }
</script>