import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth',{
  state: () => ({
    flag: null,
    authUser: null,
    role: null,
    jwt: null,
  }),
  getters: {
    isAuthenticated: (state) => state.authUser,
    getRole: (state) => state.role,
    getJwt: (state) => state.jwt,
    getFlag: (state) => state.flag,
  },
  actions: {
    async login(id, password){
      try {
        const res = await fetch('https://5548a8b14105.ngrok.app/auth/login',{
            method: 'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              identifier:id,
              password:password
            })
        })

        const response = await res.json()

        if(res.ok){
            this.authUser = true
            this.role = response.user_type
            this.jwt = response.access_token 
            this.flag = response.active
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
      this.flag = null
      alert('Sesión cerrada')
    },
    async newPassword(newPassword){

      const id = await this.info()

      try {
        const res = await fetch(`https://5548a8b14105.ngrok.app/users/${id.boleta}`,{
            method: 'PUT',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            },
            body:JSON.stringify({
              password: newPassword
            })
        })

        const response = await res.json()

        if(res.ok){
            alert("Contraseña actualizada\nPor favor inicia sesión de nuevo")
        } else {
            alert(response.error || response.message)
        }

      } catch (error) {
          console.error(error)
      }
    },
    async isAuth(){
      try {
        const res = await fetch('https://5548a8b14105.ngrok.app/auth/verify-session',{
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
    async ForgetPassword(id){
      try {
        const res = await fetch('https://5548a8b14105.ngrok.app/auth/forget_password',{
            method: 'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              boleta:id
            })
        })

        const response = await res.json()

        if(res.ok){
          alert(response.message)
          return response.email
        } else {
            alert(response.message || response.error)
        }

      } catch (error) {
          console.error(error)
      }
    },
    async info(){
      try {
        const res = await fetch('https://5548a8b14105.ngrok.app/users/info',{
            method: 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            }
        })

        const response = await res.json()

        if(res.ok){

          if (this.role == '2'){
            return {
              boleta: response.rfc,
              name: response.username,
              email: response.email
            }
          } else if (this.role == '3'){
            return {
              boleta: response.boleta,
              name: response.username,
              email: response.email
            }
          }
        } else {
            alert(response.error)
        }

      } catch (error) {
          console.error(error)
      }
    },
    async getNotices(){
      try {
        const res = await fetch('https://5548a8b14105.ngrok.app/notices/get-notices',{
            method: 'GET',
            headers:{
              'Content-Type':'application/json',
            }
        })

        const response = await res.json()

        if(res.ok){
          return response
        } else {
            alert(response.error)
        }

      } catch (error) {
          console.error(error)
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
