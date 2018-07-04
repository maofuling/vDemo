<template>
  <div>
      <!-- 面包屑 -->
     <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">权限管理</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-button type="primary" plain >添加用户</el-button>

    <!-- 表格 -->
    <el-table
    class="mt-20"
    :data="rolelist"
    border
    stripe
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>展开</span>
          </el-form-item>
         
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="角色名称"
      prop="roleName">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="roleDesc">
    </el-table-column>
    <el-table-column
      label="操作">
       <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" plain type="primary" @click="openeditdlg(scope.row)"></el-button>
          <el-button size="mini" icon="el-icon-delete" plain type="danger" @click="deletedlg(scope.row)"></el-button>
          <el-button size="mini" icon="el-icon-check" plain type="warning" @click="granddlg(scope.row)"></el-button>
        </template>
    </el-table-column>
  </el-table>


  </div>
</template>
<script>
import {getUserRole} from '../../../api/index.js'

export default {
  data() {
    return {
      rolelist:[]
    };
  },
  created(){
    getUserRole().then(res =>{
      console.log(res)
      this.rolelist = res.data;
    })
  }
}
</script>
<style lang="css" scoped>
  
</style>