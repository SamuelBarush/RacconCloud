import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'

export const useAcademyStore = defineStore('academy',{
    state: () => ({
        jwt: useAuthStore().getJwt,
        academy_id : null
    }),
    getters: {  
    },
    actions: {
      async info(){
        try {
            const res = await fetch('http://192.168.1.68:5000/academy/info',{
              method : 'GET',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.jwt}`
              }
            })
    
            const response = await res.json()
    
            if (res.ok){
              alert(response.message)
              return {
                academy_id : response.academy_id,
                name : response.name,
                main_teacher_rfc:response.main_teacher_rfc
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
      async createSubject(subject_name,academy_id,group_id,teacher_id){
        try {
          const res = await fetch('http://192.168.1.68:5000/subject/create-subject',{
            method : 'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            },
            body:JSON.stringify({
                subject_name:subject_name,
                academy_id: academy_id,
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
        try {
          const res = await fetch('http://192.168.1.68:5000/subject/subjects',{
            method : 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
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
      //duda AQUI
      async getSubjectGroup(group_id){
        try {
          const res = await fetch('http://192.168.1.68:5000/subject/subject-by-group/<int:group_id>',{
            method : 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
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
      //duda tambien en obtener contenedor swift_scope
      
      async addUserSubject(subject_id,user_id){
        try {
          const res = await fetch('http://192.168.1.68:5000/enrollment/enroll',{
            method : 'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            },
            body:JSON.stringify({
                user_id:user_id,
                subject_id:subject_id
            })
          })
  
          const response = await res.json()
  
          if (res.ok){
            alert(response.message)
            //actualizar vista de usuarios de la materia
          }
          else{
            alert(response.error)
          }
  
        } catch (error) {
            console.error(error)
            alert("Error en la conexión con la API")
        }
      },
      async getStudents(){
        try {
          const res = await fetch('http://192.168.1.68:5000/enrollment/get-enrolled-students',{
            method : 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            }
          })
  
          const response = await res.json()
  
          if (res.ok){
            alert(response.message)
            return response.students.students   //verificar respuesta
          }
          else{
            alert(response.error)
          }
  
        } catch (error) {
            console.error(error)
            alert("Error en la conexión con la API")
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
  