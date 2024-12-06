import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'

export const useTeacherStore = defineStore('teacher',{
    state: () => ({
        subjects : {},
        students : {},
        structure:{},
        breadcrumbs: ['Materias'],
        currentPath : '',
        currentSubject : '',
        currentStudent : '',
        isViewingSubjects: true,
        isViewingStudents : false,
        isViewingFoldersStudent : false,
        subject_id : null,
        selectedFile: '',
        selectedFolder: '',
    }),
    getters: {
      getJwt: () => {
        return useAuthStore().getJwt;
      },
      getCurrentFoldersContent: (state) => {
        const content = state.structure?.[state.currentPath];
        return {
          folders: content?.folders || [],
          files: content?.files || [],
        }
      },
      getBreadcrumbs: (state) => state.breadcrumbs,
    },
    actions: {

      async getSubjects(){
        const jwt = this.getJwt;
        try {
          const res = await fetch('http://localhost:5000/subject/subjects-teacher',{
            method : 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${jwt}`
            }
          })
  
          const response = await res.json()
          console.log(response)
  
          if (res.ok){
            this.subjects = response
            this.isViewingSubjects = true
            this.isViewingStudents = false
            this.isViewingFoldersStudent = false
            this.currentPath = ''
            this.currentSubject = ''
            this.breadcrumbs = ['Academia']
          }
          else{
            alert(response.error)
          }
  
        } catch (error) {
            console.error(error)
            alert("Error en la conexión con la API")
        }
      },
      async getStudents(subject_id,subject_name){
        const jwt = this.getJwt;
        try {
          const res = await fetch('http://localhost:5000/subject/subject-by-id',{
            method : 'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${jwt}`
            },
            body:JSON.stringify({
              subject_id:subject_id
            })
          })
  
          const response = await res.json()
  
          if (res.ok){
            this.students = response
            this.currentSubject = subject_name
            this.subject_id = subject_id
            this.isViewingStudents = true
            this.isViewingSubjects = false
            this.isViewingFoldersStudent = false
            this.breadcrumbs = ['Academia',subject_name]
          }
          else{
            alert(response.error)
          }
  
        } catch (error) {
            console.error(error)
            alert("Error al obtener los alumnos")
        }
      },
      async getStudentsFolders(student_id){
        const jwt = this.getJwt;
        this.structure = {}
        this.currentPath = ''
        try {
          const res = await fetch('http://localhost:5000/file/list-student',{
            method : 'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${jwt}`
            },
            body:JSON.stringify({
              user_id:student_id,
              project_id: this.currentSubject
            })
          })
  
          const response = await res.json()

          if (res.ok){
            this.structure = response.structure
            this.isViewingStudents = false
            this.isViewingSubjects = false
            this.isViewingFoldersStudent = true
            this.currentStudent = student_id
            this.breadcrumbs = ['Academia',this.currentSubject,student_id]
          }
          else{
            alert(response.error)
          }
  
        } catch (error) {
            console.error(error)
            alert("Error al obtener los archivos del alumno")
        }
      },
      async downloadFile(){
        const jwt = this.getJwt;
        try {
          const res = await fetch(`http://localhost:5000/file/download-student`,{
              method: 'POST',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${jwt}`
              },
              body:JSON.stringify({
                project_id: this.currentSubject,
                file_path: this.selectedFile,
                student_id: this.currentStudent
              })
          })
  
          if(res.ok){
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url
            a.download = this.selectedFile.split('/').pop()
            a.click()
            a.remove()
          } else {
             const errorData = res.json
             alert(errorData.error || 'Error al descargar el archivo')
          }
  
        } catch (error) {
            console.error(error)
        }
      },
      async downloadFolder(){
        const jwt = this.getJwt;
        try {
          const res = await fetch(`http://localhost:5000/file/download-folder-student`,{
              method: 'POST',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${jwt}`
              },
              body: JSON.stringify({
                  project_id: this.currentSubject,
                  folder_path: this.selectedFolder,
                  student_id: this.currentStudent
              })
          })
  
          if(res.ok){
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url
            a.download = this.selectedFolder.split('/').pop()
            a.click()
            a.remove()
          } else {
             const errorData = res.json|
             alert(errorData.error || 'Error al descargar el archivo')
          }
  
        } catch (error) {
            console.error(error)
        }
      },
      setSelectedFile(fileName) {
        this.selectedFile = fileName
      },
      setSelectedFolder(folderName) {
        this.selectedFolder = folderName
      },
      changeDirectory(newPath) {
        // Cambiar la ruta actual
        this.currentPath = newPath
        if (!this.breadcrumbs.includes(newPath)) {
          this.breadcrumbs.push(newPath)
        }
      },
      navigateToBreadcrumb(index) {
        if (index === 0) {
          this.getSubjects() // Si navegamos a "Academia", mostrar las materias
        } else if (index === 1) {
          this.getStudents(this.subject_id,this.currentSubject) // Si navegamos a una materia, mostrar los alumnos
        } else if(index === 2){
          this.getStudentsFolders(this.breadcrumbs[index]) // Si navegamos a un alumno, mostrar sus archivos
        } else{
          const folder = this.breadcrumbs[index]
          this.currentPath = folder
          if (index < this.breadcrumbs.length - 1) {
            this.breadcrumbs = this.breadcrumbs.slice(0, index + 1)
          }
        }
      },
    },
    persist: {
      enabled: true,
      strategies: [
        {
          storage: sessionStorage,
        },
      ]
    }
  });
  