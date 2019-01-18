<template>
  <div>
    <!-- 面包屑导航 -->
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">用户管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <!-- 搜索区域 -->
    <el-row>
      <el-col class="el_rowH">
        <el-input
          placeholder="请输入内容"
          v-model="input"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button
          type="success"
          plain
        >成功按钮</el-button>
      </el-col>

    </el-row>

    <!-- 用户列表区域 -->
    <el-table
      :data="dataList"
      border
      style="width: 100%;line-height=0px"
    >
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
      >
      </el-table-column>
            <el-table-column
        prop="mg_state"
        label="用户状态"
      >
      </el-table-column>
            <el-table-column
        label="操作"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      dataList:{},
      query:'',
      pagenum: 1,
      pagesize: 10,
    };
  },
  methods: {
    getDataList() {
      let token = window.localStorage.getItem('token');
      this.$http({
        url: `users?pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
        method: 'get',
        headers: {'Authorization': token}
      }).then( res =>{
        console.log(res)
        var {data,meta} =res.data;
        if( meta.status ===200 ){
          this.dataList=data.users;
        }else{}
      });
    }
  },
  mounted() {
    this.getDataList();
  },
};
</script>

<style scoped>
.el-input {
  width: 200px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el_rowH {
  line-height: 0px;
}
</style>