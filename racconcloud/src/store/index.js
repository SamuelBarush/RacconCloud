import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth',{
  state: () => ({
    authUser: null,
    role: null,
    jwt: null,
    path: null
  }),
  getters: {
    isAuthenticated: (state) => state.authUser,
    getRole: (state) => state.role,
    getJwt: (state) => state.jwt,
    getPath: (state) => state.path
  },
  actions: {
    async login(id, password){
      try {
        const res = await fetch('http://192.168.1.68:5000/auth/login',{
            method: 'POST',
            headers:{
              'Content-Type':'application/json'
            },
            //credentials:'include',
            body:JSON.stringify({
              boleta:id,
              password:password
            })
        })

        const response = await res.json()

        if(res.ok){
            this.authUser = true
            this.role = response.user_type
            this.jwt = response.access_token
            alert(response.message)
        } else {
            alert(response.message || response.error)
            this.authUser = false
        }

      } catch (error) {
          console.error(error)
          this.authUser = false
      }
    },
    async logout(){
      this.authUser = null
      this.role = null
      this.jwt = null
      alert('Sesión cerrada')
      console.log('Adios Tonoto')
    },
    async isAuth(){
      try {
        const res = await fetch('http://192.168.1.68:5000/auth/verify-session',{
            method: 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            }
        })

        const response = await res.json()

        if(res.ok){
            alert(response.authenticated)
        } else {
            alert(response.authenticated || response.error)
        }

      } catch (error) {
          console.error(error)
      }
    },
    async info(){
      try {
        const res = await fetch('http://192.168.1.68:5000/users/info',{
            method: 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            }
        })

        const response = await res.json()

        if(res.ok){
          return {
            boleta: response.boleta,
            name: response.name,
            email: response.email
          }
        } else {
            alert(response.error)
        }

      } catch (error) {
          console.error(error)
      }
    },
    async uploadFile(file,filename,path){

      try {
        const res = await fetch('http://192.168.1.68:5000/file/upload/single',{
            method: 'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            },
            body:JSON.stringify({
              file:file,
              filename:filename,
              path:path
            })
        })

        if(res.ok){
          console.log("Se subio archivo")
        } else {
            console.log("No se pudo subir el archivo")
        }

      } catch (error) {
          console.error(error)
      }
    },
    async getFiles(){
      try {
        const res = await fetch('http://192.168.1.68:5000/file/list',{
            method: 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            }
        })
        const data = await res.json()

        if(res.ok){
          console.log(data.structure)
          return data.structure
        } else {
            res.error
        }

      } catch (error) {
          console.error(error)
      }
    },
    async createFolder(path_name){

      try {
        const res = await fetch('http://192.168.1.68:5000/file/new_path',{
            method: 'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            },
            body:JSON.stringify({
              path:this.path,
              path_name: path_name
            })
        })

        if(res.ok){
          console.log("Se creo la Carpeta")
        } else {
            console.log("No se creo la Carpeta")
        }

      } catch (error) {
          console.error(error)
      }

    }
    //async downloadFile(filename,path){
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
