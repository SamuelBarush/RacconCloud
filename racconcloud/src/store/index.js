import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth',{
  state: () => ({
    authUser: null,
    role: null,
  }),
  getters: {
    isAuthenticated: (state) => state.authUser,
    getRole: (state) => state.role
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
            alert(response.message)
        } else {
            alert(response.message || response.error)
            this.authUser = false
        }

      } catch (error) {
          console.error(error)
          this.authUser = false
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
