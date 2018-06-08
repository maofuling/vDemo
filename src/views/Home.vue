<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <!-- 侧边栏 -->
        <el-menu default-active="1" class="el-menu-admin" @open="handleOpen" @close="handleClose" background-color="#545c64"
          text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">用户列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- header部分 -->
        <el-header>
          <i class="myicon myicon-menu toggle-btn" @click="toggleshow"></i>
          <div class="system-title">电商后台管理系统</div>
          <div>
            <span class="welcome">
              您好,xxx
            </span>
            <el-button type='text' @click="exit">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>
<script>
import { userList} from '../../api/index.js'

export default {
  data() {
    return {
        isCollapse: true   
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //隐藏显示侧边栏
    toggleshow(){
      this.isCollapse = !this.isCollapse
    },
    //退出登录
    exit(){
      localStorage.removeItem('mytoken');
      this.$router.push({name:'/login'})
    }
  },
  mounted() {

    var params = {
      params: {
        query: '',
        pagenum: 1,
        pagesize: 1
      }
    }
    userList(params).then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  background-color: #e5e5e5;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #545c64;
  }
  .toggle-btn {
    padding: 0 10px;
    margin-left: -20px;
    font-size: 36px;
    line-height: 60px;
    color: #989898;
    cursor: pointer;
    &:hover {
      background-color: #00635a;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>