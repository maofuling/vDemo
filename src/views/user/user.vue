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
          <el-button slot="append" icon="el-icon-search" @click="initList"></el-button>
        </el-input>

        <el-button type="success" plain @click="adduserDlgVisible=true">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table v-loading='loading' :data="userData" class="margin-20" border style="width: 100%">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="电话">
      </el-table-column>

      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="changeState(scope.row)"></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" plain type="primary" @click="openeditdlg(scope.row)"></el-button>
          <el-button size="mini" icon="el-icon-delete" plain type="danger" @click="deletedlg(scope.row)"></el-button>
          <el-button size="mini" icon="el-icon-check" plain type="warning" @click="granddlg(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[1, 2, 3, 4, 5]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="adduserDlgVisible">
      <el-form :model="userInfo" :rules="rules" ref="userRuleForm">
        <el-form-item label="用户名:" label-width="80px" prop='username'>
          <el-input v-model="userInfo.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:" label-width="80px" prop='password'>
          <el-input v-model="userInfo.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" label-width="80px" prop='email'>
          <el-input v-model="userInfo.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话:" label-width="80px" prop='mobile'>
          <el-input v-model="userInfo.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adduserDlgVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('userRuleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="edituserDlgVisible">
      <el-form :model="edituserInfo" :rules="rules" ref="editForm">
        <el-form-item label="用户名:" label-width="80px" prop='username'>
          <el-input v-model="edituserInfo.username" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" label-width="80px" prop='email'>
          <el-input v-model="edituserInfo.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话:" label-width="80px" prop='mobile'>
          <el-input v-model="edituserInfo.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edituserDlgVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditUser('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配用户角色对话框 -->
    <el-dialog title="分配用户角色" :visible.sync="grandroleDlgVisible">
      <el-form :model="grandInfo">
        <el-form-item label="当前的用户:" label-width="120px">
          <el-input v-model="grandInfo.username" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="请选择角色" label-width="120px">
          <el-select v-model="grandInfo.roleid" :placeholder="grandplaceholder">
            <el-option 
            v-for="(role,index) in roleList"
            :key="index"
            :label="role.roleName" 
            :value="role.id"></el-option>

          </el-select>
        </el-form-item>
          {{grandInfo.roleName}}
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grandroleDlgVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmgrand()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {  userList, userState, addUser, editUser, miteditUser, deleteUser,
  getUserRole, grandUserRole} from '../../../api/index.js'

export default {
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.initList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.initList();
    },
    initList() {
      this.loading = true;
      userList({ params: { query: this.query, pagenum: this.pagenum, pagesize: this.pagesize } }).then(res => {
        this.userData = res.data.users;
        this.total = res.data.total;
      })
      this.loading = false;
    },

    //修改用户状态
    changeState(row) {
      userState({ uid: row.id, type: row.mg_state }).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            showClose: true,
            message: res.meta.msg,
            type: 'success'
          })
        } else {
          this.$message({
            message: res.meta.msg,
            type: 'warning'
          })
        }
      })
    },
    submitForm(userRuleForm) {
      this.$refs[userRuleForm].validate(valid => {
        if (valid) {

          addUser(this.userInfo).then(res => {
            if (res.meta.status === 201) {
              this.$message({
                showClose: true,
                message: '创建用户成功',
                type: 'success'
              })
              this.adduserDlgVisible = false;
              this.initList();
            }

          })
        }
      });

    },

    openeditdlg(row) {
      this.edituserDlgVisible = true;
      editUser(row.id).then(res => {
        this.edituserInfo.username = res.data.username;
        this.edituserInfo.email = res.data.email;
        this.edituserInfo.mobile = res.data.mobile;
        this.edituserInfo.id = res.data.id;

      })
    },

    //提交编辑表单
    submitEditUser(editForm) {
      this.$refs[editForm].validate(valide => {
        if (valide) {
          miteditUser(this.edituserInfo).then(res => {
            // console.log(res)
            if (res.meta.status === 200) {
              this.$message({
                showClose: true,
                message: res.meta.msg,
                type: 'success'
              });
              this.edituserDlgVisible = false;
              this.initList();

            }
          })

        }
      })
    },

    //删除用户
    deletedlg(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(123)
        deleteUser(row.id).then(res => {
          // console.log(res)
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
          this.initList();
        })
        //  this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    //打开分配角色对话框
    granddlg(row) {
      this.grandroleDlgVisible = true;
      this.grandInfo.username = row.username;
      this.grandInfo.userid = row.id;
      // console.log(row.id);


      if(this.grandInfo.roleName){
        // console.log(1111)
        // console.log(this.grandInfo.roleid)
        this.grandplaceholder = this.grandInfo.roleName;
      }else{
         this.grandplaceholder = '请选择角色';
      }

      getUserRole().then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          this.roleList = res.data;
      
        }
      })
    },

    //确定分配角色
    confirmgrand(){
      // console.log(this.grandInfo.roleid)
      // console.log(this.grandInfo.userid)
      grandUserRole({id:this.grandInfo.userid,rid:this.grandInfo.roleid }).then(res=>{
          // console.log(res)
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.meta.msg
            });
          this.grandroleDlgVisible = false;
          
          }else{
             this.$message({
              type: 'error',
              message: res.meta.msg
            });
            this.grandroleDlgVisible = false;
          }
      })
    }

  },
  data() {
    return {
      loading:false,
      grandplaceholder:'请选择角色',
      userData: [],
      roleList: [],
      value3: '',
      query: '',
      total: 0,
      pagesize: 5,
      pagenum: 1,
      adduserDlgVisible: false,
      edituserDlgVisible: false,
      grandroleDlgVisible: false,
      userInfo: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      edituserInfo: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      grandInfo: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        mobile: [
          { required: true, message: '电话不能为空' }
        ]
      }

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


