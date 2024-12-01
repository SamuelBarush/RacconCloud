import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'

export const useFileStore = defineStore('file',{
    state: () => ({
      jwt: useAuthStore().getJwt,
      structure: {},
      currentPath: '',
      selectedFile: null,
      selectedFolder: null,
      currentProject: null,
      searchQuery: '',
      searchResults: [],
    }),
    getters: {
      getSelectedFile: (state) => state.selectedFile,
      getSelectedFolder: (state) => state.selectedFolder,
      getCurrentProject: (state) => state.currentProject,
      getPath: (state) => state.currentPath,
      getCurrentFolderContent: (state) => {
        return state.structure?.[state.currentPath] || { files: [], folders: [] };  
      },
      getBreadcrumbs: (state) => {
        const pathArray = state.currentPath ? state.currentPath.split('/').filter(Boolean) : [];
        return pathArray;
      },
      getSearchResults: (state) => state.searchResults,
    },
    actions: {
      async uploadFile(file, filename,updateProgressCallback) {
        try {
          const xhr = new XMLHttpRequest();
      
          xhr.open('POST', 'http://192.168.1.199:5000/file/upload/single', true);
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
            path: this.currentPath,
            flag: true
          });
      
          xhr.send(body);
      
        } catch (error) {
          console.error(error);
        }
      },
      async uploadFileProject(file, filename,updateProgressCallback) {
        try {
          const xhr = new XMLHttpRequest();
      
          xhr.open('POST', 'http://192.168.1.199:5000/file/upload/single', true);
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
            path: this.currentPath,
            flag: false,
            project_id: this.currentProject
          });
      
          xhr.send(body);
      
        } catch (error) {
          console.error(error);
        }
      },
      async getFiles() {
        try {
          const res = await fetch('http://192.168.1.199:5000/file/full-list', {
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
        this.currentPath = newPath;
      },
      async createFolder(path_name){
        try {
          const res = await fetch('http://192.168.1.199:5000/file/create-folder',{
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

          const response = await res.json()
  
          if(res.ok){
            alert(response.message)
          } else {
            alert(response.error)
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
      setSelectedFolder(folderName) {
        this.selectedFolder = folderName
      },
      async downloadFile(){
        try {
          const res = await fetch(`http://192.168.1.199:5000/file/download?file_path=${encodeURIComponent('/' + this.selectedFile)}`,{
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
          const res = await fetch(`http://192.168.1.199:5000/file/download-folder?folder_path=${encodeURIComponent(this.selectedFolder)}`,{
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
            a.download = this.selectedFolder.split('/').pop()
            a.click()
            a.remove()
          } else {
             const errorData = res.json|
             alert(errorData.error || 'Error al descargar el archivo')
          }
  
        } catch (error) {
            console.error(error)
        }
      },
      //Probar
      async getSubjects() {
        try {
          const res = await fetch('http://192.168.1.199:5000/enrollment/get-enrolled-subjects', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.jwt}`
            }
          })
          const data = await res.json();
  
          if (res.ok) {
            return data.subjects
          } else {
            throw new Error(res.error);
          }
        } catch (error) {
          console.error(error);
        }
      },
      async deleteFolder(){
        try {
          const res = await fetch('http://192.168.1.199:5000/file/delete',{
              method: 'POST',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.jwt}`
              },
              body:JSON.stringify({
                target_path: '/' + this.selectedFolder
              })
          })

          const response = await res.json()
  
          if(res.ok){
            alert(response.message)
          } else {
            alert(response.error)
          }
  
        } catch (error) {
            console.error(error)
        }
      },
      async deleteFile(){
        try {
          const res = await fetch('http://192.168.1.199:5000/file/delete',{
              method: 'POST',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.jwt}`
              },
              body:JSON.stringify({
                target_path: '/' + this.selectedFile
              })
          })

          const response = await res.json()
  
          if(res.ok){
            alert(response.message)
          } else {
            alert(response.error)
          }
  
        } catch (error) {
            console.error(error)
        }
      },
      async moveFile(){


        if(this.selectedFile === this.selectedFolder){
          alert('No puedes mover un archivo a la misma carpeta')
        }
        else{
          try {
            const res = await fetch('http://192.168.1.199:5000/file/move',{
                method: 'POST',
                headers:{
                  'Content-Type':'application/json',
                  'Authorization': `Bearer ${this.jwt}`
                },
                body:JSON.stringify({
                  source_path: '/' + this.selectedFile,
                  destination_path: '/' + this.selectedFolder
                })
            })
  
            const response = await res.json()
    
            if(res.ok){
              alert(response.message)
            } else {
              alert(response.error)
            }
    
          } catch (error) {
              console.error(error)
          }
        }     
      },
      searchFiles(query) {
        this.searchResults = []; // Clear previous results
        if (!query) {
          this.searchQuery = ''; // Reset query
          return;
        }
      
        this.searchQuery = query.toLowerCase(); // Normalize query for case-insensitivity
      
        const recursiveSearch = (path, structure) => {
          // Search for files in the current folder
          const files = structure[path]?.files || [];
          files.forEach((file) => {
            if (file.path.toLowerCase().includes(this.searchQuery)) {
              this.searchResults.push({
                name: file.path.split('/').pop(),
                path: file.path,
                type: 'file',
                size: file.size,
                date: file.date,
              });
            }
          });
      
          // Recursively search folders
          const folders = structure[path]?.folders || [];
          folders.forEach((folderPath) => {
            const folderName = folderPath.split('/').pop();
            if (folderName.toLowerCase().includes(this.searchQuery)) {
              this.searchResults.push({
                name: folderName,
                path: folderPath,
                type: 'folder',
              });
            }
            // Recurse into the folder
            recursiveSearch(folderPath, structure);
          });
        };
      
        // Start search from the root path
        recursiveSearch('', this.structure);
      
        console.log('Search Results:', this.searchResults); // Debugging output
      },
      setSearchQuery(query) {
        this.searchQuery = query;
      },
      resetSearch(){
        this.searchResults = [];
      },
      resetStrucuture(){
        this.structure = {};
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
  