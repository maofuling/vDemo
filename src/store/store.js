import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
    username:''
}
const mutations = {
    setUsername:(state,username)=>{
        state.username = username
        localStorage.setItem('username',state.username)
    }

}
const actions = {}
const getters = {
    username:() => localStorage.getItem('username')
    }

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})