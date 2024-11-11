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
          <input type="text" v-model="academia.nombreAcademia" required />
        </div>
        <div class="form-group-register">
          <label for="academyHead">Nombre del Profesor Encargado:</label>
          <input type="text" v-model="academia.profesorEncargado" required />
        </div>
      </div>
  
      <!-- Campos para Profesor -->
      <div v-if="userType === 'profesor'" class="form-type-register">
        <div class="form-group-register">
          <label for="profName">Nombre Completo del Profesor:</label>
          <input type="text" v-model="profesor.nombre" required />
        </div>
        <div class="form-group-register">
          <label for="profRFC">RFC:</label>
          <input type="text" v-model="profesor.rfc" required />
        </div>
        <div class="form-group-register">
          <label for="profEmail">Correo Institucional:</label>
          <input type="email" v-model="profesor.correoInstitucional" required />
        </div>
      </div>
  
      <!-- Campos para Alumno -->
      <div v-if="userType === 'alumno'" class="form-type-register">
        <div class="form-group-register">
          <label for="studentName">Nombre Completo del Alumno:</label>
          <input type="text" v-model="alumno.nombre" required />
        </div>
        <div class="form-group-register">
          <label for="studentBoleta">No. de Boleta:</label>
          <input type="number" v-model="alumno.boleta" required />
        </div>
        <div class="form-group-register">
          <label for="studentAltEmail">Correo:</label>
          <input type="email" v-model="alumno.correoAlternativo" required/>
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
  import { useAdminStore } from '@/store/AdminStore'
  

  const adminStore = useAdminStore()
  const emit = defineEmits(['close-Modal1'])
  const userType = ref('')

  const alumno = ref({
    nombre: '',
    boleta: '',
    correoAlternativo: ''
  })

  const profesor = ref({
    nombre: '',
    rfc: '',
    correoInstitucional: ''
  })

  const academia = ref({
    nombreAcademia: '',
    profesorEncargado: ''
  })
  
  // Resetear formulario al cambiar el tipo de usuario
  const resetForm = () => {
    alumno.value = {
      nombre: '',
      boleta: '',
      correoAlternativo: ''
    }
    profesor.value = {
      nombre: '',
      rfc: '',
      correoInstitucional: ''
    }
    academia.value = {
      nombreAcademia: '',
      profesorEncargado: ''
    }
  }
  
  // Enviar formulario e imprimir en consola
  const submitForm = () => {

    if ( userType.value === 'academia'){
      console.log(academia.value)
      adminStore.createUser(userType.value,academia.value.profesorEncargado,academia.value.nombreAcademia,'')
    } else if ( userType.value === 'profesor'){
      console.log(profesor.value)
      console.log(profesor.value.rfc)
      console.log(profesor.value.nombre)
      console.log(profesor.value.correoInstitucional)
      adminStore.createUser(userType.value,profesor.value.rfc,profesor.value.nombre,profesor.value.correoInstitucional)
    } else if ( userType.value === 'alumno'){
      console.log(alumno.value)
      adminStore.createUser(userType.value,alumno.value.boleta,alumno.value.nombre,alumno.value.correoAlternativo)
    }
  }
  
  // Cancelar formulario
  const closeModal1 = () => {
    userType.value = ''
    resetForm()
    emit('close-Modal1')
  }
</script>