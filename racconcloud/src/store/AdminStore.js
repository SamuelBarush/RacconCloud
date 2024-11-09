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
      }
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
  