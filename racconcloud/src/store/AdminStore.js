import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'

export const useAdminStore = defineStore('admin',{
    state: () => ({
        jwt: useAuthStore().getJwt,
    }),
    getters: {  
    },
    actions: {
      async createUser(typeuser,id,name,email){
        let body = {}

        if (typeuser == 'alumno'){
          body = {
            boleta:id,
            email:email,
            username:name,
            role_id:'3'
          }
        } else if (typeuser == 'profesor'){
          body = {
            rfc:id,
            email:email,
            username:name,
            role_id:'2'
          }
        } else if (typeuser == 'academia'){
          body = {
            name:name,
            main_teacher_rfc:id,
          }
        }

        try {
          const res = await fetch('http://192.168.1.68:5000/users/',{
            method : 'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            },
            body:JSON.stringify(body)
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
      async getAcademys(){
        try {
          const res = await fetch('http://192.168.1.68:5000/academy',{
            method : 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            }
          })
  
          const response = await res.json()
  
          if (res.ok){
            alert(response.message)
            return response.academies_data
          }
          else{
            alert(response.error)
          }
  
        } catch (error) {
            console.error(error)
            alert("Error en la conexión con la API")
        }
      },
      async getAcademy(academy_id){
        try {
          const res = await fetch('http://192.168.1.68:5000/academy/<int:academy_id>',{
            method : 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            }
          })
  
          const response = await res.json()
  
          if (res.ok){
            alert(response.message)
            return response.academy_data
          }
          else{
            alert(response.error)
          }
  
        } catch (error) {
            console.error(error)
            alert("Error en la conexión con la API")
        }
      },
      async deleteAcademy(academy_id){
        try {
          const res = await fetch('http://192.168.1.68:5000/academy/$<int:academy_id>',{
            method : 'DELETE',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            }
          })
  
          const response = await res.json()
  
          if (res.ok){
            alert(response.message)
            //recargar pagina de usuarios
          }
          else{
            alert(response.error)
          }
  
        } catch (error) {
            console.error(error)
            alert("Error en la conexión con la API")
        }
      },
      async actuAcademy(academy_id,name,description,main_teacher){
        try {
          const res = await fetch('http://192.168.1.68:5000/academy/$<int:academy_id>',{
            method : 'PUT',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            },
            body:{
              name:name,
              description:description,
              main_teacher_rfc:main_teacher
            }
          })
  
          const response = await res.json()
  
          if (res.ok){
            alert(response.message)
            //recargar pagina de usuarios
          }
          else{
            alert(response.error)
          }
  
        } catch (error) {
            console.error(error)
            alert("Error en la conexión con la API")
        }
      },
      async getUsers(){
        try {
          const res = await fetch('http://192.168.1.68:5000/users',{
            method : 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            }
          })
  
          const response = await res.json()
  
          if (res.ok){
            alert(response.message)
            return response.users_data
          }
          else{
            alert(response.error)
          }
  
        } catch (error) {
            console.error(error)
            alert("Error en la conexión con la API")
        }
      },
      async getUser(user_id){
        try {
          const res = await fetch('http://192.168.1.68:5000/academy/<int:user_id>',{
            method : 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            }
          })
  
          const response = await res.json()
  
          if (res.ok){
            alert(response.message)
            return response.user_info
          }
          else{
            alert(response.error)
          }
  
        } catch (error) {
            console.error(error)
            alert("Error en la conexión con la API")
        }
      },
      async actuUser(user_id,name,email,password){
        try {
          const res = await fetch('http://192.168.1.68:5000/academy/$<int:user_id>',{
            method : 'PUT',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            },
            body:{
              username:name,
              email:email,
              password:password
            }
          })
  
          const response = await res.json()
  
          if (res.ok){
            alert(response.message)
            //recargar pagina de usuarios
          }
          else{
            alert(response.error)
          }
  
        } catch (error) {
            console.error(error)
            alert("Error en la conexión con la API")
        }
      },
      async deleteUser(user_id){
        try {
          const res = await fetch('http://192.168.1.68:5000/academy/$<int:user_id>',{
            method : 'DELETE',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            }
          })
  
          const response = await res.json()
  
          if (res.ok){
            alert(response.message)
            //recargar pagina de usuarios
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
  