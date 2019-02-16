<template>
  <el-card>
      <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        {{level1}}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
    </el-breadcrumb>
    </el-card>
</template>

<script>
  export default {
    name: 'myBreadcrumb',
    props: ['level1','level2'],
  }
</script>

<style scoped>

</style>