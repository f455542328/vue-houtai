<template>
  <el-col :span="24">
    <el-menu
      default-active="2"
      unique-opened
      class="el-menu-vertical-demo"
      router
    >
      <el-submenu
        class="position"
        index="1"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/users">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span>用户列表</span>
          </template></el-menu-item>
      </el-submenu>
      <el-submenu
        class="position"
        index="2"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/roles">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span>角色列表</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/rights">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span>权限列表</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-submenu
        class="position"
        index="3"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="1-1">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span>商品列表</span>
          </template>
        </el-menu-item>
        <el-menu-item index="1-1">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span>分类列表</span>
          </template>
        </el-menu-item>
        <el-menu-item index="1-1">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span>商品分类</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-submenu
        class="position"
        index="4"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item index="1-1">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span>订单列表</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-submenu
        class="position"
        index="5"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item index="1-1">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span>数据报表</span>
          </template>
        </el-menu-item>
      </el-submenu>

    </el-menu>
  </el-col>
</template>

<script>
export default {};
</script>

<style scoped>
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100%;
}
</style>