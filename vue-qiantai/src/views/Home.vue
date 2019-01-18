<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <Header></Header>
    </el-header>

    <!-- 主要区域 -->
    <el-container>
      <!-- 导航菜单 -->
      <el-aside width="200px">
          <Aside></Aside>
      </el-aside>

      <!-- 更换区域主界面 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "../components/Header";
import Aside from "../components/Aside";
export default {
  data() {
    return {};
  },
  beforeCreate() {
    let token = window.localStorage.getItem('token');
    if(!token){
      this.$message.error('对不起,请重新登录!!!');
      this.$router.push({name:'login'});
    }else{
      //  this.$message({
      //    message:'欢迎回来!',
      //    type: 'success'
      //  });
    }
  },
  methods: {},
  components: {
    Header,
    Aside,
  },

};
</script>

<style scoped>
.el-container {
  height: 100%; 
}
.el-container .el-row {
  height: 100%;
}


.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
}


.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>