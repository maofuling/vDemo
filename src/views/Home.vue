<template>
  <div>
    登录成功
  </div>
</template>
<script>

import {userList} from '../../api/index.js'

export default {
  data() {
    return {
      
    };
  },
  mounted () {
      console.log(123)
      var params = {params:{query:'',pagenum:1,pagesize:1}}
      userList(params).then(res=>{
          console.log(res)
      })
  }
}
</script>

<style lang="css" scoped>
  
</style>