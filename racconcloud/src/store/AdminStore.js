import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'

export const useAdminStore = defineStore('admin',{
    state: () => ({
        jwt: useAuthStore().getJwt,
        structure: {},
        currentPath: '',
        selectedFile: null
    }),
    getters: {
        getPath: (state) => state.currentPath,
        getCurrentFolderContent: (state) => {
            return state.structure?.[state.currentPath] || { files: [], folders: [] };  // Verificar existencia de currentPath
        },
        getBreadcrumbs: (state) => {
            const pathArray = state.currentPath ? state.currentPath.split('/').filter(Boolean) : [];
            return ['Materias', ...pathArray];  // Devuelve al menos ['Personal'] para evitar undefined
        }    
    },
    actions: {
      async createUser(id,email,name,role){
        try {
          const res = await fetch('http://192.168.1.199:5000/users/',{
            method : 'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${this.jwt}`
            },
            body:JSON.stringify({
              boleta:id,
              email:email,
              password:id,
              nombre:name,
              role_ide:role
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
  