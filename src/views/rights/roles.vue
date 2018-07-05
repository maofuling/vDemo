<template>
  <div class="roles">
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

    <el-button type="primary" plain>添加用户</el-button>

    <!-- 表格 -->
    <el-table class="mt-20" :data="rolelist" border stripe style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row v-for="firstsons in props.row.children" :key="firstsons.id">
            <el-col :span="4">
              <el-tag closable @close='deleteright(props.row,firstsons.id)'>{{firstsons.authName}}</el-tag>
              <i class="el-icon-arrow-right" v-if="firstsons.children.length !== 0"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="secondsons in firstsons.children" :key="secondsons.id">
                <el-col :span="3">
                  <el-tag closable type="success" @close='deleteright(props.row,secondsons.id)'>{{secondsons.authName}}</el-tag>
                  <i class="el-icon-arrow-right" v-if="secondsons.children.length !== 0"></i>
                </el-col>
                <el-col :span="21">
                  <el-tag closable type="warning" v-for='thirdsons in secondsons.children' :key="thirdsons.id" @close='deleteright(props.row,thirdsons.id)'>
                    {{thirdsons.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-row v-if="props.row.children.length === 0">
            <el-col>该角色没有分配权限，请前往分配</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" prop="roleName" width='165px'>
      </el-table-column>
      <el-table-column label="描述" prop="roleDesc" width='130px'>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" plain type="primary" @click="openeditdlg(scope.row)"></el-button>
          <el-button size="mini" icon="el-icon-delete" plain type="danger" @click="deletedlg(scope.row)"></el-button>
          <el-button size="mini" icon="el-icon-check" plain type="warning" title="授权角色" @click="granddlg(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 授权角色对话框 -->
    <el-dialog title="授权角色" :visible.sync="granddlgVisible" width="30%">
      <el-tree :data="grandData" show-checkbox node-key="id" ref="tree" :default-expand-all='true' :default-checked-keys="checkedright" :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="granddlgVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitgrand">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { getUserRole, deleteRoleRights, getrightlist,grandRights } from '../../../api/index.js'

export default {
  data() {
    return {
      rolelist: [],
      granddlgVisible: false,
      grandData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      checkedright: [],
      currentRole:{}
    };
  },
  created() {
    this.initList();
  },
  methods: {
    initList() {
      getUserRole().then(res => {
        // console.log(res)
        this.rolelist = res.data;
      })
    },
    //删除权限
    deleteright(row, RightId) {
      // console.log(RightId)
      // console.log(row)

      deleteRoleRights({ roleId: row.id, rightId: RightId }).then(res => {
        // console.log(res)
        row.children = res.data;
      })
    },

    //授权角色
    granddlg(row) {
      this.granddlgVisible = true;
      this.currentRole = row;

      getrightlist('tree').then(res => {
        // console.log(res);
        this.grandData = res.data;
      })

      //清空数组
      this.checkedright.splice(0);
      //默认勾选权限
      //getUserRole()异步获取数据

      row.children.forEach(first => {
        if (first.children && first.children.length !== 0) {
          first.children.forEach(second => {
            if (second.children && second.children.length !== 0) {
              second.children.forEach(third => {
                this.checkedright.push(third.id);
                //  console.log(third.id);
                //  console.log(this.checkedright)                 
              })
            }
          })
        }
      })
      console.log(this.checkedright)

    },

    //提交授权
    submitgrand(){
      var rids = this.$refs.tree.getCheckedKeys().join(',');
      //  console.log(this.$refs.tree.getCheckedKeys());
      //  console.log(rids);
      console.log(this.currentRole.id)
      console.log(rids)

      grandRights(this.currentRole.id,{rids:rids}).then(res=>{
        console.log(res)
        if(res.meta.status ===200){
          this.$message({
            type:'success',
            message:res.meta.msg
          })
        }
        this.granddlgVisible = false;
        this.initList();
      })
    }
  },

}
</script>
<style lang="scss" scoped>
.roles {
  .el-tag {
    margin-bottom: 20px;
  }
}
</style>