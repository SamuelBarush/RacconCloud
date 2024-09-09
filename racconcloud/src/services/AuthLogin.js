import { ref } from "vue";

class AuthLogin {

    constructor(){
        this.jwt = ref('')
        this.error = ref('')
    }

    getJwt(){
        return this.jwt
    }

    getError(){
        return this.error
    }

    async login(ID,password){
        try {
            const res = await fetch('Endpoint API-Rest',{
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id:ID,
                    password:password
                })
            })
            const response = await res.json()

            //esperar como Aldrich va a mandar el JSON de respuesta de la API

            if('' in response){
               this.error = "Login Failed"
               return false
            }

            this.jwt = response.data.access_token
            return true

        } catch (error) {
            console.log(error)
        }
    }
}