import Vue from 'vue'


import Router from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import welcome from '../views/welcome/welcome.vue'
import user from '../views/user/user.vue'
import rights from '../views/rights/rights.vue'
import roles from '../views/rights/roles.vue'


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
                {name:'users',path:'/users',component:user},
                {name:'rights',path:'/rights',component:rights},
                {name:'roles',path:'/roles',component:roles}
            ]
           
        }
    ]
})