<template>
  <div class="login-wrap">

    <el-form
      label-position="top"
      :model="user"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm login-from"
    >
      <h1>用户登录</h1>
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input
          type="text"
          v-model="user.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
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
          @click="login('ruleForm')"
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
      },
      rules: {
        username: [
          { required: true, message: "请输入用户账号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login(refname) {
      //第一次前端验证规则
      this.$refs[refname].validate(vali => {
        if (vali) {
          this.$http.post("login", this.user).then(res => {
            var { data, meta } = res.data;
            if (meta.status === 200) {
              this.$message({
                message: "登陆成功!!!",
                type: "success"
              });
              window.localStorage.setItem('token',data.token)
              this.$router.push("index");
            } else {
              this.$message.error("登陆失败,请重试!!!");
            }
          });
        } else {
          this.$message.error("数据不合法!!");
        }
      });
    }
  }
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
h1 {
  text-align: center;
}

.login-wrap .login-from .login-btn {
  width: 100%;
}
</style>