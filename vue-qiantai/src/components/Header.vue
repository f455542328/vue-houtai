<template>

    <el-row>
      <el-col :span="5">
        <div class="grid-content bg-purple"><img
            class="logo"
            src="../assets/images/794_724540_133955.jpg"
            alt="费德勒"
          ></div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light">
          <h1 class="title">vue-小demo</h1>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple logout"><a href="#">退出</a></div>
      </el-col>
    </el-row>

</template>

<script>
export default {};
</script>

<style scoped>
.grid-content .title {
  margin: 0;
  line-height: center;
}

.logout {
  text-align: right;
}
.logout a {
  font-size: 16px;
  color: aqua;
}

.position {
  text-align: left;
}
.logo {
  width: 200px;
  height: 59px;
  line-height: 0;
}
.position {
  text-align: left;
}
</style>