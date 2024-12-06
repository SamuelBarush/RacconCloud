import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'

export const useAcademyStore = defineStore('academy',{
    state: () => ({
        academy_id : null,
        subjects : {},
        students : {},
        structure:{},
        breadcrumbs: ['Materias'],
        currentPath : '',
        currentSubject : '',
        isViewingSubjects: true,
        isViewingStudents : false,
        isViewingFoldersStudent : false,
        subject_id : null,
        selectedFile: '',
        selectedFolder: '',
        Logs : {}
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
      async info(){
        const jwt = this.getJwt;
        try {
            const res = await fetch('http://172.17.0.1:5000/academy/info',{
              method : 'GET',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${jwt}`
              }
            })
    
            const response = await res.json()
    
            if (res.ok){
              return {
                academy_id : response.academy_id,
                name : response.name,
                main_teacher_rfc:response.main_teacher_rfc,
                description:response.description
              }
            }
            else{
              alert(response.error)
            }
    
          } catch (error) {
              console.error(error)
              alert("Error en la conexión con la API")
          }
      },
      async createSubject(subject_name,group_id,teacher_id){
        const jwt = this.getJwt;
        try {
          const res = await fetch('http://172.17.0.1:5000/subject/create-subject',{
            method : 'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${jwt}`
            },
            body:JSON.stringify({
                subject_name:subject_name,
                group_id: group_id,
                teacher_id:teacher_id
            })
          })
  
          const response = await res.json()
  
          if (res.ok){
            alert(response.message)
          }
          else{
            alert(response.error)
          }
  
        } catch (error) {
            console.error(error)
            alert("Error en la conexión con la API")
        }
      },
      async getSubjects(){
        const jwt = this.getJwt;
        try {
          const res = await fetch('http://172.17.0.1:5000/subject/subjects',{
            method : 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${jwt}`
            }
          })
  
          const response = await res.json()
  
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
      async getSubjectGroup(group_id){
        const jwt = this.getJwt;
        try {
          const res = await fetch(`http://172.17.0.1:5000/subject/subject-by-group/${group_id}`,{
            method : 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${jwt}`
            }
          })
  
          const response = await res.json()
  
          if (res.ok){
            alert(response.message)
            return response.subjects_data
          }
          else{
            alert(response.error)
          }
  
        } catch (error) {
            console.error(error)
            alert("Error en la conexión con la API")
        }
      },    
      async addStudent(user_id){
        const jwt = this.getJwt;
        try {
          const res = await fetch('http://172.17.0.1:5000/enrollment/enroll',{
            method : 'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${jwt}`
            },
            body:JSON.stringify({
                user_id:user_id,
                subject_id:this.currentSubject
            })
          })
  
          const response = await res.json()
  
          if (res.ok){
            alert(response.message)
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
          const res = await fetch('http://172.17.0.1:5000/subject/subject-by-id',{
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
          const res = await fetch('http://172.17.0.1:5000/file/list-student',{
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
      async getLogs(){
        const jwt = this.getJwt;
        try {
            const res = await fetch('http://172.17.0.1:5000/logs/',{
              method : 'GET',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${jwt}`
              }
            })
    
            const response = await res.json()
            console.log(response)
    
            if (res.ok){
              this.Logs = response
            }
            else{
              alert(response.message_error)
            }
    
          } catch (error) {
              console.error(error)
              alert("Error en la conexión con la API")
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
  