<template>
  <div class="user">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">用户管理</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-input placeholder="请输入内容" class="search-input" v-model="query" @keydown.native.enter="initList">
        </el-input>
        <el-button type="success" plain @click="initList">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
     :data="userData" 
      class="margin-20"
     border 
     style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="电话">
      </el-table-column>

      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="value3"></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" plain type="primary"></el-button>
          <el-button size="mini" icon="el-icon-delete" plain type="danger"></el-button>
          <el-button size="mini" icon="el-icon-check" plain type="warning"></el-button>
        </template>
      </el-table-column>
    </el-table>

   



    <div class="page">
      <el-pagination 
      @size-change="handleSizeChange"
       @current-change="handleCurrentChange" 
       :current-page="1" 
       :page-sizes="[100, 200, 300, 400]" 
       :page-size="100" 
       layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { userList } from '../../../api/index.js'

export default {
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    initList() {
      userList({ params: { query: this.query, pagenum: 1, pagesize: 3 } }).then(res => {
        this.userData = res.data.users;

      })
    }
  },
  data() {
    return {
      userData: [],
      value3: '',
      query:''
    };
  },
  mounted() {

    //初始化列表
    this.initList();
  }

}
</script>

<style lang="scss" scoped>
.user {
  .search-input {
    width: 300px;
  }
  .page {
    padding: 5px 0;
    background-color: #d3dce6;
  }
  .margin-20 {
    margin: 20px 0;
  }
}

</style>


