import { ref } from "vue";
import { useAuthStore } from "@/store";

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
                    'Content-Type':'application/json'
                },
                credentials:'include',
                body:JSON.stringify({
                    boleta:ID,
                    password:password
                })
            })

            const response = await res.json()

            if(res.ok){
                const store = useAuthStore()
                store.setAuth(true)
                store.setRole(response.user_type)
                return true
            }

            alert(response.message || response.error)
            return false

        } catch (error) {
            console.log(error)
            return false
        }
    }
}