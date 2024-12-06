import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'

export const useSubjectsStore = defineStore('subjects',{
    state: () => ({
        subjects : {},
        structure:{},
        breadcrumbs: ['Materias'],
        currentPath : '',
        currentSubject : '',
        isViewingSubjects: true,
        isViewingFolders: false,
        subject_id : null,
        selectedFile: '',
        selectedFolder: '',
    }),
    getters: {
      getJwt: () => {
        return useAuthStore().getJwt;
      },
      getPath: (state) => state.currentPath,
      getCurrentSubject: (state) => state.currentSubject,
      getCurrentFoldersContent: (state) => {
        const content = state.structure?.[state.currentPath];
        return {
          folders: content?.folders || [],
          files: content?.files || [],
        }
      },
      getBreadcrumbs: (state) => state.breadcrumbs,
    },
    actions: {
      async getSubjects() {
        const jwt = this.getJwt;
        try {
          const res = await fetch('http://localhost:5000/enrollment/get-enrolled-subjects', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwt}`
            }
          })
          const response = await res.json();
          console.log(response)
  
          if (res.ok) {
            this.subjects = response
            this.currentPath = ''
            this.currentSubject = ''
            this.isViewingSubjects = true
            this.isViewingFolders = false
            this.breadcrumbs = ['Materias']
          } else {
            alert(response.error)
          }
        } catch (error) {
          console.error(error)
          alert("Error en la conexión con la API")
        }
      },
      async getFolders(subject_name){
        const jwt = this.getJwt;
        this.structure = {}
        this.currentPath = ''
        try {
          const res = await fetch('http://localhost:5000/file/list-subject',{
            method : 'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${jwt}`
            },
            body:JSON.stringify({
              project_id: subject_name
            })
          })
  
          const response = await res.json()

          if (res.ok){
            this.structure = response.structure
            this.currentSubject = subject_name
            this.isViewingSubjects = false
            this.isViewingFolders = true
            this.breadcrumbs = ['Materias',subject_name]
          }
          else{
            alert(response.error)
          }
  
        } catch (error) {
            console.error(error)
            alert("Error al obtener los archivos del alumno")
        }
      },
      async createFolder(path_name){
        const jwt = this.getJwt;
        try {
          const res = await fetch('http://localhost:5000/file/create-folder',{
              method: 'POST',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${jwt}`
              },
              body:JSON.stringify({
                project_id: this.currentSubject,
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
      async uploadFile(file, filename,updateProgressCallback) {
        const jwt = this.getJwt;
        try {
          const xhr = new XMLHttpRequest();
      
          xhr.open('POST', 'http://localhost:5000/file/upload/single', true);
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
            project_id: this.currentSubject
          });
      
          xhr.send(body);
      
        } catch (error) {
          console.error(error);
        }
      },
      async deleteFolder(){
        const jwt = this.getJwt;
        try {
          const res = await fetch('http://localhost:5000/file/delete',{
              method: 'POST',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${jwt}`
              },
              body:JSON.stringify({
                project_id: this.currentSubject,
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
        console.log(jwt)
        try {
          const res = await fetch('http://localhost:5000/file/delete',{
              method: 'POST',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${jwt}`
              },
              body:JSON.stringify({
                project_id: this.currentSubject,
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
            const res = await fetch('http://localhost:5000/file/move',{
                method: 'POST',
                headers:{
                  'Content-Type':'application/json',
                  'Authorization': `Bearer ${jwt}`
                },
                body:JSON.stringify({
                  project_id: this.currentSubject,
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
      async downloadFile(){
        const jwt = this.getJwt;
        try {
          const res = await fetch(`http://localhost:5000/file/download`,{
              method: 'POST',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${jwt}`
              },
              body:JSON.stringify({
                project_id: this.currentSubject,
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
          const res = await fetch(`http://localhost:5000/file/download-folder`,{
              method: 'POST',
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${jwt}`
              },
              body: JSON.stringify({
                  project_id: this.currentSubject,
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
      setSelectedFile(fileName) {
        this.selectedFile = fileName
      },
      setSelectedFolder(folderName) {
        this.selectedFolder = folderName
      },
      changeDirectory(newPath) {
        // Cambiar la ruta actual
        this.currentPath = newPath
        if (!this.breadcrumbs.includes(newPath)) {
          this.breadcrumbs.push(newPath)
        }
      },
      navigateToBreadcrumb(index) {
        if (index === 0) {
          this.getSubjects() // Si navegamos a "Academia", mostrar las materias
        } else if(index === 1){
          console.log(this.breadcrumbs[index])
          this.getFolders(this.breadcrumbs[index]) // Si navegamos a un alumno, mostrar sus archivos
        } else{
          const folder = this.breadcrumbs[index]
          this.currentPath = folder
          if (index < this.breadcrumbs.length - 1) {
            this.breadcrumbs = this.breadcrumbs.slice(0, index + 1)
          }
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
  