import { ref } from "vue";
import store from '@/store'

export default class AuthLogin {

    constructor(){
        this.role = ref('')
    }

    getRole(){
        return this.role
    }

    async login(ID,password){
        try {
            const res = await fetch('http://192.168.1.245:5000/auth/login',{
                method: 'POST',
                headers:{
                    //'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                credentials:'include',
                body:JSON.stringify({
                    boleta:ID,
                    password:password
                })
            })
            const response = await res.json()

            //if('' in response){
            //   this.error = "Login Failed"
            //   return false
            //}

            if(res.ok){
                store.dispatch('login',{role:response.user_type})
                return true
            }

            console.log("No entro")
            alert(response.message || response.error)
            return false

        } catch (error) {
            console.log(error)
        }
    }
}