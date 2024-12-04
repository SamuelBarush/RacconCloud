import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'

export const useAcademyStore = defineStore('academy',{
    state: () => ({
        //jwt: useAuthStore().getJwt,
        academy_id : null,
        subjects : {},
        students : {},
        structure:{},
        currentPath : '',
        currentSubject : '',
        isViewingSubjects: true,
        isViewingStudents : false,
        isViewingFoldersStudent : false,
        subject_id : null
    }),
    getters: {
      getJwt: () => {
        return useAuthStore().getJwt;
      },
      getCurrentFolderContent: (state) => {
        return state.structure?.[state.currentPath] || { files: [], folders: [] };  
      },
      getBreadcrumbs: (state) => {
        const baseBreadcrumbs = state.currentPath ? state.currentPath.split('/').filter(Boolean) : []
        return baseBreadcrumbs;
      },
    },
    actions: {
      async info(){
        const jwt = this.getJwt;
        try {
            const res = await fetch('http://192.168.1.245:5000/academy/info',{
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
          const res = await fetch('http://192.168.1.245:5000/subject/create-subject',{
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
          const res = await fetch('http://192.168.1.245:5000/subject/subjects',{
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
          const res = await fetch(`http://192.168.1.245:5000/subject/subject-by-group/${group_id}`,{
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
          const res = await fetch('http://192.168.1.245:5000/enrollment/enroll',{
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
          const res = await fetch('http://192.168.1.245:5000/subject/subject-by-id',{
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
        try {
          const res = await fetch('http://192.168.1.245:5000/file/list-student',{
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
          console.log(response)
          if (res.ok){
            this.structure = response.structure
            this.isViewingStudents = false
            this.isViewingSubjects = false
            this.isViewingFoldersStudent = true
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
            const res = await fetch('http://192.168.1.245:5000/logs',{
              method : 'GET',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${jwt}`
              }
            })
    
            const response = await res.json()
    
            if (res.ok){
              return response

                //user: response.user_identifier,
                //operation: response.operation,
                //container: response.container_name,
                //time: response.timestamp
            }
            else{
              alert(response.message_error)
            }
    
          } catch (error) {
              console.error(error)
              alert("Error en la conexión con la API")
          }
      },
      changeDirectory(newPath) {
        // Cambiar la ruta actual
        this.currentPath = newPath
      },
  
      navigateToBreadcrumb(index) {
        // Navegar a un breadcrumb específico
        if (index === 0) {
          this.getSubjects() // Si navegamos a "Academia", mostrar las materias
        } else {
          this.getStudents(this.subject_id,this.currentSubject); // De lo contrario, cambiar la ruta
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
  