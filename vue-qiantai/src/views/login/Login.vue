<template>
  <div class="login-wrap">
   
    <el-form
      label-position="top"
      :model="user"
      status-icon
     
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm login-from"
    >
     <h1>用户登录</h1>
      <el-form-item
        label="用户名"
        prop="user.username"
      >
        <el-input
          type="text"
          v-model="user.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="user.password"
      >
        <el-input
          type="password"
          v-model="user.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"

          @click="login"
        >提交</el-button>

      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  data() {
    return {
      user: {
        password: "",
        username: ""
      }
    }
  },
  methods: {
    login () {
      this.$http.post('login',this.user).then( res => {
        var {data,meta } = res.data;
        if(meta.status === 200 ){
          alert('成功')
          this.$router.push('./home')
        }else{}
      })
    }
  },
  
};
</script>

<style scoped>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-from {
  background-color: #fff;
  width: 500px;
  padding: 30px;
  border-radius: 5px;
}
h1{
  text-align: center;
}

.login-wrap .login-from .login-btn {
  width: 100%;
}
</style>