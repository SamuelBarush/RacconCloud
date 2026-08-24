import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'

export const useFileStore = defineStore('file',{
    state: () => ({
      structure: {},
      currentPath: '',
      selectedFile: null,
      selectedFolder: null,
      searchQuery: '',
      searchResults: [],
    }),
    getters: {
      getJwt: () => {
        return useAuthStore().getJwt
      },
      getSelectedFile: (state) => state.selectedFile,
      getSelectedFolder: (state) => state.selectedFolder,
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
        const jwt = this.getJwt;
        try {
          const xhr = new XMLHttpRequest();
      
          xhr.open('POST', 'https://5548a8b14105.ngrok.app/file/upload/single', true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.setRequestHeader('Authorization', `Bearer ${jwt}`);
      
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
      async getSize() {
        const jwt = this.getJwt;
        try {
          const res = await fetch('https://5548a8b14105.ngrok.app/file/space', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwt}`
            }
          })
          const data = await res.json();
  
          if (res.ok) {
            return{
              total_space : data.total_space,
              used_space : data.used_space,
              free_space : data.free_space
            }
          } else {
            throw new Error(res.error);
          }
        } catch (error) {
          console.error(error);
        }
      },
      async getFiles() {
        const jwt = this.getJwt;
        try {
          const res = await fetch('https://5548a8b14105.ngrok.app/file/full-list', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwt}`
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
        const jwt = this.getJwt;
        try {
          const res = await fetch('https://5548a8b14105.ngrok.app/file/create-folder',{
              method: 'POST',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${jwt}`
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
        const jwt = this.getJwt;
        try {
          const res = await fetch(`https://5548a8b14105.ngrok.app/file/download`,{
              method: 'POST',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${jwt}`
              },
              body: JSON.stringify({
                file_path: this.selectedFile
              })
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
        const jwt = this.getJwt;
        try {
          const res = await fetch(`https://5548a8b14105.ngrok.app/file/download-folder`,{
              method: 'POST',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${jwt}`
              },
              body: JSON.stringify({
                folder_path: this.selectedFolder
                })
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
      async deleteFolder(){
        const jwt = this.getJwt;
        try {
          const res = await fetch('https://5548a8b14105.ngrok.app/file/delete',{
              method: 'POST',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${jwt}`
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
        const jwt = this.getJwt;
        try {
          const res = await fetch('https://5548a8b14105.ngrok.app/file/delete',{
              method: 'POST',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${jwt}`
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
        const jwt = this.getJwt;

        if(this.selectedFile === this.selectedFolder){
          alert('No puedes mover un archivo a la misma carpeta')
        }
        else{
          try {
            const res = await fetch('https://5548a8b14105.ngrok.app/file/move',{
                method: 'POST',
                headers:{
                  'Content-Type':'application/json',
                  'Authorization': `Bearer ${jwt}`
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
      },
      setSearchQuery(query) {
        this.searchQuery = query;
      },
      resetSearch(){
        this.searchResults = [];
      },
      resetStrucuture(){
        this.structure = {};
      },
      resetJWT(){
        this.jwt = null
      },
      // Función para obtener los 5 archivos más recientes
      getRecentFiles() {
        const allFiles = [];

        // Función recursiva para obtener todos los archivos en la estructura
        const collectFiles = (path, structure) => {
          const files = structure[path]?.files || [];
          files.forEach((file) => {
            allFiles.push({
              ...file,
              path: file.path,
              date: new Date(file.date), // Convertimos la fecha a objeto Date para ordenarlos
            });
          });

          // Recursión para obtener archivos de las subcarpetas
          const folders = structure[path]?.folders || [];
          folders.forEach((folderPath) => {
            collectFiles(folderPath, structure);
          });
        };

        // Recopilamos todos los archivos desde la raíz
        collectFiles('', this.structure);

        // Ordenamos los archivos por fecha (de más reciente a más antiguo)
        allFiles.sort((a, b) => b.date - a.date);

        // Devolvemos solo los 5 más recientes
        return allFiles.slice(0, 5);
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
  