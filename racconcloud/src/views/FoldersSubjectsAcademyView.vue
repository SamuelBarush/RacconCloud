<template>
  <HeaderAcademyComponent/>
  <main class="main-folders-container" v-if="!loading">
    <MenuDashboardAcademy 
      @openCreateFolder="showModal1 = true" 
      @openUploadFile="showModal2 = true"
      @openCreateSubject="showModal3 = true"
      @openAddStudent="showModal4 = true"
      @openAddTeacher="showModal5 = true"/>
    <div :class="{ 'main-folder-principal': true, 'shrinked': showModalFileOption }">
      <!-- Mostrar Rutas (Breadcrumbs) -->
      <div class="main-dashboard-title">
        <p class="breadcrumbs">
          <span v-for="(crumb, index) in breadcrumbs" :key="index" @click="navigateTo(index)">
            {{ crumb }}<span v-if="index < breadcrumbs.length - 1"> / </span>
          </span>
        </p>
      </div>

      <!-- Mostrar Materias o Estudiantes -->
      <div class="main-dashboard-title">
        <p>Mis Materias</p>
      </div>

      <div v-if="!isViewingStudents" class="main-container-grid-a">
        <div
          v-for="(subject, index) in subjects"
          :key="index"
          @dblclick="openSubject(subject.subject_id,subject.subject_name)"
          class="main-folders-block-a"
        >
          <img src="../assets/images/carpeta.png" alt="Materia" />
          <p class="subject_name">{{ subject.subject_name }}</p>
        </div>
      </div>

      <div v-else class="main-container-grid-a">
        <div
          v-for="(student, index) in students"
          :key="index"
          @dblclick="openStudent(student.student_id)"
          class="main-folders-block-a"
        >
          <img src="../assets/images/carpeta.png" alt="Materia" />
          <p class="student_id">{{ student.student_id }}</p>
        </div>
      </div>

    </div>
  </main>

  <div v-else class="loading">
    <p>Cargando materias...</p>
  </div>

  <ThemeSwitcherComponent/>
  <FooterAcademyComponent/>
  <SubjectRegisterComponent v-if="showModal3" @close="showModal3 = false"/>
  <AddStudentComponent v-if="showModal4" @close="showModal4 = false"/>
  <AddTeacherComponent v-if="showModal5" @close="showModal5 = false"/>
  <ModalFolderCreate v-if="showModal1" @close-Modal1="showModal1 = false"/>
  <ModalFileUpload v-if="showModal2" @close-Modal2="showModal2 = false"/>
  <div v-if="showModal1 || showModal2 || showModal3 || showModal4 || showModal5" class="overlay"></div>
</template>

<script setup>
  import HeaderAcademyComponent from '@/components/HeaderAcademyComponent.vue'
  import FooterAcademyComponent from '@/components/FooterAcademyComponent.vue'
  import MenuDashboardAcademy from '@/components/MenuDashboardAcademy.vue'
  import ModalFileUpload from '@/components/ModalFileUpload.vue'
  import ModalFolderCreate from '@/components/ModalFolderCreate.vue'
  import ThemeSwitcherComponent from '@/components/ThemeSwitcherComponent.vue'
  import AddStudentComponent from '@/components/AddStudentComponent.vue'
  import AddTeacherComponent from '@/components/AddTeacherComponent.vue'
  import SubjectRegisterComponent from "@/components/SubjectRegisterComponent.vue"

  import { ref, computed, onMounted } from 'vue'
  import { useAcademyStore } from '@/store/AcademyStore'

  const showModal1 = ref(false)
  const showModal2 = ref(false)
  const showModal3 = ref(false)
  const showModal4 = ref(false)
  const showModal5 = ref(false)

  const academyStore = useAcademyStore()

  // Estado de carga
  const loading = ref(true)

  // Obtener las materias desde el store
  const subjects = computed(() => academyStore.subjects)
  const students = computed(() => academyStore.students)
  const isViewingStudents = computed(() => academyStore.isViewingStudents)
  const isViewingSubjects = computed(() => academyStore.isViewingSubjects)

  const breadcrumbs = computed(() => {
    const baseBreadcrumbs = academyStore.getBreadcrumbs;
    if (isViewingStudents.value) {
      return ['Materias',...baseBreadcrumbs]
    } else if (isViewingSubjects.value) {
      return ['Materias',...baseBreadcrumbs]
    }
    return baseBreadcrumbs
  })

  async function loadSubjects() {
    try {
      await academyStore.getSubjects()  // Cargar las materias
      loading.value = false
    } catch (error) {
      console.error('Error al cargar las materias:', error)
    }
  }
  //Cargar la logica de archivos del Alumno
  //Realizar pruebas

  onMounted(async () => {
    await loadSubjects()
  })

  function openSubject(subjectId, subjectName) {
    academyStore.getStudents(subjectId,subjectName)  // Navegar a la materia y cargar estudiantes
    academyStore.changeDirectory(subjectName)  // Cambiar el directorio actual
  }

  function openStudent(studentId) {
    //academyStore.changeDirectory(studentId)  // Cambiar el directorio actual
    academyStore.getStudentsFolders(studentId)  // Navegar al estudiante y cargar materias
  }

  function navigateTo(index) {
    console.log('index:', index)
    academyStore.navigateToBreadcrumb(index)  // Navegar a la ruta del breadcrumb
  }
</script>

<style scoped lang="scss">
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: var(--text-color);
}

.selected {
  background-color: var(--invert-background-color-page);
  color: var(--invert-text-color);
}

.selected p {
  color: var(--invert-text-color) !important;
}

.breadcrumbs {
  span {
    cursor: pointer;
  }

  span:hover {
    text-decoration: underline;
  }
}

.subject_name {
  font-size: 14px !important;
  text-align: center;
}

.student_id {
  font-size: 14px;
  text-align: center;
}
</style>
