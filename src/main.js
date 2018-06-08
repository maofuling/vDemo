import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './styles/index.scss'


Vue.use(ElementUI);

Vue.config.productionTip = false


//路由守卫
router.beforeEach((to,from,next)=>{
  let token = localStorage.getItem('mytoken')
  if(token){
    next()
  }else{
    //如果访问其他页面，则调回登录
    if(to.path !== '/login'){
      next({path:'/login'})
    }else{
      //访问登录页面，则正常访问
      next()
    }
  }
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
