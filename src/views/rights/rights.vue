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
          <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

     <!-- 表格 -->
    <el-table v-loading='loading' :data="getrightlist" stripe class="margin-20" border style="width: 100%">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180">
      </el-table-column>
      <el-table-column prop="path" label="路径" width="180">
      </el-table-column>
      <el-table-column  label="层级" width="180" > 
        <template slot-scope="scope">
        <span >{{scope.row.level | showlv}}</span>
      </template>
        
      </el-table-column>

  
    </el-table>

  </div>
</template>
<script>

import {getrightlist} from '../../../api/index.js'

export default {
  data() {
    return {
      loading:false,
      getrightlist:[]
    };
  },
  created(){
      this.loading = true;
      getrightlist('list').then(res=>{
        this.getrightlist = res.data;
      });
      this.loading = false;
  },
  filters: {
    showlv(level){
       if(level === '0'){
         return '一级'
       }else if(level === '1'){
         return '二级'
       }else{
         return '三级'
       }
    }
  }
}
</script>
<style lang="css" scoped>
  
</style>