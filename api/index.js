import axios from 'axios'


const baseURL = 'http://localhost:8888/api/private/v1/';
axios.defaults.baseURL = baseURL;


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = localStorage.getItem('mytoken');
    if(token){
        config.headers['Authorization']=token;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });


//登录
export const checkUser = params =>{
    return axios.post('login',params).then(res => res.data);
}

//获取用户列表
export const userList = params =>{
    return axios.get('users',params).then(res => res.data);
}

//用户状态
export const userState = params =>{
    return axios.put(`users/${params.uid}/state/${params.type}`).then(res => res.data);
}


//添加用户
export const addUser = params =>{
    return axios.post('users',params).then(res => res.data);
}

//编辑用户
export const editUser = params =>{
    return axios.get(`users/${params}`).then(res => res.data);
}


//编辑用户提交
export const miteditUser = params =>{
    return axios.put(`users/${params.id}`,params).then(res => res.data);
}


//删除用户
export const deleteUser = params =>{
    return axios.delete(`users/${params}`).then(res => res.data);
}


//查询角色列表
export const getUserRole = () =>{
    return axios.get('roles').then(res => res.data);
}


//分配用户角色
export const grandUserRole = (params) =>{
    return axios.put(`users/${params.id}/role`,params).then(res => res.data);
}


//获取权限列表
export const getrightlist = params =>{
    return axios.get(`rights/${params}`).then(res => res.data);
}

// 删除角色指定权限
export const deleteRoleRights = params =>{
    return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`).then(res => res.data);
}