import { createStore } from "vuex";

export default createStore({
    state:{
        //variables en la aplicacion
        role : '',
        auth : false
    },
    getters:{
        //metodos para obtener datos en el state
        isAuthenticated: (state) => state.auth,
        userRole: (state) => state.role
    },
    mutations:{
        //metodos para modificar datos en el state sincrono
        setAuth(state,authStatus){
            state.auth = authStatus
        },
        setRole(state,role){
            state.role = role
        }
    },
    actions:{
        //metodos para modificar datos en el state asincrono
        login({commit}, {role}){
            commit('setRole',role)
            commit('setAuth',true)
        },
        logout({commit}){
            commit('setRole','')
            commit('setAuth',false)
        }
    },
    modules:{
        //subdivir, subelementos
    }
})