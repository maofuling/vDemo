import Vue from 'vue'


import Router from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import welcome from '../views/welcome/welcome.vue'
import user from '../views/user/user.vue'

Vue.use(Router)


export default new Router({
    routes: [
        {
            path:'/login',
            name:'Login',
            component:Login
        },
        {
            path:'/',
            name:'Home',
            component:Home,
            redirect:{path:'/welcome'},
            children:[
                {name:'welcome',path:'/welcome',component:welcome},
                {name:'user',path:'/user',component:user}
            ]
           
        }
    ]
})