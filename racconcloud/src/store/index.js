//import router from '@/router';
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth',{
  state: () => ({
    authUser: null,
    role: null,
    jwt: null,
    structure: null,
    currentPath: '',
  }),
  getters: {
    isAuthenticated: (state) => state.authUser,
    getRole: (state) => state.role,
    getJwt: (state) => state.jwt,
    getPath: (state) => state.currentPath,
    getCurrentFolderContent: (state) => {
      return state.structure[state.currentPath] || {files: [], folders: []}
    },
    getBreadcrumbs: (state) => {
      const pathArray = state.currentPath ? state.currentPath.split('/').filter(Boolean) : [];
      /*if (router.currentRoute.value.name === '/folders-student-subjects') {
        return ['Materias', ...pathArray];
      }
      if (router.currentRoute.value.name === '/folders-student-personal') {
        return ['Personal', ...pathArray];
      }*/
      return ['Materias', ...pathArray];  // Devuelve al menos ['Personal'] para evitar undefined
    }    
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
    async uploadFile(file, filename, path, updateProgressCallback) {
      try {
        const xhr = new XMLHttpRequest();
    
        xhr.open('POST', 'http://192.168.1.68:5000/file/upload/single', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${this.jwt}`);
    
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progressPercentage = (event.loaded / event.total) * 100;
            updateProgressCallback(progressPercentage); // Llamada al callback para actualizar el progreso en la vista
          }
        };
    
        xhr.onload = () => {
          if (xhr.status === 200) {
            updateProgressCallback(100, 'completed'); // Marca el archivo como completado al 100%
            console.log("Se subió el archivo correctamente");
          } else {
            updateProgressCallback(0, 'error-upload'); // Marca el archivo como error de subida
            console.log("No se pudo subir el archivo");
          }
        };
    
        xhr.onerror = () => {
          updateProgressCallback(0, 'error-connection'); // Marca el archivo como error de conexión
          console.error("Error en la conexión");
        };
    
        const body = JSON.stringify({
          file: file,
          filename: filename,
          path: path
        });
    
        xhr.send(body);
    
      } catch (error) {
        console.error(error);
      }
    },
    async getFiles() {
      try {
        const res = await fetch('http://192.168.1.68:5000/file/full-list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.jwt}`
          }
        })
        const data = await res.json();

        if (res.ok) {
          this.structure = data.structure;
          this.currentPath = '';  // Inicializamos en la raíz
        } else {
          throw new Error(res.error);
        }
      } catch (error) {
        console.error(error);
      }
    },
    changeDirectory(newPath) {
      // Cambiar la ruta actual
      this.currentPath = newPath;
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

    },
    async setPath (path){
      this.currentPath = path
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
