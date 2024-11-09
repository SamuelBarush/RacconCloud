import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'

export const useFileStore = defineStore('file',{
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
      async uploadFile(file, filename,updateProgressCallback) {
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
            path: this.currentPath
          });
      
          xhr.send(body);
      
        } catch (error) {
          console.error(error);
        }
      },
      async getFiles() {
        try {
          const res = await fetch('http://192.168.1.68:5000/file/list', {
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
          const res = await fetch('http://192.168.1.68:5000/file/create-folder',{
              method: 'POST',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.jwt}`
              },
              body:JSON.stringify({
                parent_dir:'/' + this.currentPath,
                folder_name: path_name
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
      },
      setSelectedFile(fileName) {
        this.selectedFile = fileName
      },
      async downloadFile(){
        try {
          const res = await fetch(`http://192.168.1.68:5000/file/download?file_path=${encodeURIComponent('/' + this.currentPath +  '/' + this.selectedFile)}`,{
              method: 'GET',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.jwt}`
              }
          })
  
          if(res.ok){
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url
            a.download = this.selectedFile.split('/').pop()
            a.click()
            a.remove()
          } else {
             const errorData = res.json
             alert(errorData.error || 'Error al descargar el archivo')
          }
  
        } catch (error) {
            console.error(error)
        }
      },
      async downloadFolder(){
        try {
          const res = await fetch(`http://192.168.1.68:5000/file/download-folder?folder_path=${encodeURIComponent(this.currentPath +  '/' + this.selectedFile)}`,{
              method: 'GET',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.jwt}`
              }
          })
  
          if(res.ok){
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url
            a.download = this.selectedFile.split('/').pop()
            a.click()
            a.remove()
          } else {
             const errorData = res.json
             alert(errorData.error || 'Error al descargar el archivo')
          }
  
        } catch (error) {
            console.error(error)
        }
      },
      async createUser(id,email,name,role){
        try {
          const res = await fetch('http://192.168.1.68:5000/users/',{
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
  