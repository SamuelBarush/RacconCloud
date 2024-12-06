import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'

export const useAdminStore = defineStore('admin',{
    state: () => ({
        //jwt: useAuthStore().getJwt,
        selectedUser: null,
        Logs : {},
        Users: {}
    }),
    getters: {  
      getSelectedUser: (state) => state.selectedUser,
      getJwt: () => {
        return useAuthStore().getJwt;
      },
    },
    actions: {
      async createUser(typeuser,id,name,email){
        let body = {}
        const jwt = this.getJwt;

        if (typeuser === 'alumno'){
          body = {
            boleta:id,
            email:email,
            username:name,
            password:id,
            role_id: 3
          }

          console.log("alumno")

          try {
            const res = await fetch('http://localhost:5000/users/',{
              method : 'POST',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${jwt}`
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
        } else if (typeuser === 'profesor'){
          body = {
            rfc:id,
            email:email,
            username:name,
            password:id,
            role_id: 2
          }

          console.log("profesor")

          try {
            const res = await fetch('http://localhost:5000/users/',{
              method : 'POST',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${jwt}`
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
        } else if (typeuser === 'academia'){
          body = {
            name:name,
            main_teacher_rfc:id,
          }

          console.log("academia")

          try {
            const res = await fetch('http://localhost:5000/academy/',{
              method : 'POST',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${jwt}`
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
      async getAcademys(){
        const jwt = this.getJwt;
        try {
          const res = await fetch('http://localhost:5000/academy',{
            method : 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${jwt}`
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
        const jwt = this.getJwt;
        try {
          const res = await fetch(`http://localhost:5000/academy/${academy_id}`,{
            method : 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${jwt}`
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
        const jwt = this.getJwt;
        try {
          const res = await fetch(`http://localhost:5000/academy/${academy_id}`,{
            method : 'DELETE',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${jwt}`
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
        const jwt = this.getJwt;
        try {
          const res = await fetch(`http://localhost:5000/academy/${academy_id}`,{
            method : 'PUT',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${jwt}`
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
        const jwt = this.getJwt;
        try {
          const res = await fetch('http://localhost:5000/users/',{
            method : 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${jwt}`
            }
          })
  
          const response = await res.json()
          console.log(response)
  
          if (res.ok){
            this.Users = response
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
        const jwt = this.getJwt;
        try {
          const res = await fetch(`http://localhost:5000/academy/${user_id}`,{
            method : 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${jwt}`
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
        const jwt = this.getJwt;
        try {
          const res = await fetch(`http://localhost:5000/academy/${user_id}`,{
            method : 'PUT',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${jwt}`
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
      setSelectUser(user){
        this.selectedUser = user
      },
      async deleteUser(user_id){
        const jwt = this.getJwt;
        try {
          const res = await fetch(`http://localhost:5000/academy/${user_id}`,{
            method : 'DELETE',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${jwt}`
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
      async getLogs(){
        const jwt = this.getJwt;
        try {
            const res = await fetch('http://localhost:5000/logs/',{
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
  