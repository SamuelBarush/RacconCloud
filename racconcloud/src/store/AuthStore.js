import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth',{
  state: () => ({
    authUser: null,
    role: null,
    jwt: null
  }),
  getters: {
    isAuthenticated: (state) => state.authUser,
    getRole: (state) => state.role,
    getJwt: (state) => state.jwt,   
  },
  actions: {
    async login(id, password){
      try {
        const res = await fetch('http://192.168.1.68:5000/auth/login',{
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
    async ForgetPassword(id){
      try {
        const res = await fetch('http://192.168.1.68:5000/auth/forget_password',{
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
        const res = await fetch('http://192.168.1.68:5000/users/info',{
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
