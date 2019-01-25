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
          v-model="query"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search"
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
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="用户状态"
        width="80"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="sChange(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="280"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
          ></el-button>
          <el-button
            @click="del(scope.row.id)"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="numChange"
      :current-page="pagenum"
      :page-sizes="[1, 5, 10, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: window.localStorage.getItem('token'),
      dataList: [],
      query: "",
      pagenum: 1,
      pagesize: 5,
      total: 0
    };
  },
  methods: {
    // 分页方法
    handleSizeChange(val) {
      this.pagesize = val;
      this.getDataList();
    },
    numChange(val) {
      this.pagenum = val;
      this.getDataList();
    },
    getDataList() {
      this.$http({
        url: "users",
        method: "get",
        headers: { 'Authorization': this.token },
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          query: this.query
        }
      }).then(res => {
        //console.log(res);
        var { data, meta } = res.data;
        if (meta.status === 200) {
          this.dataList = data.users;
          this.total = data.total;
        } else {
          this.error('meta.msg')
        }
      });
    },
    search() {
      this.getDataList();
    },
    sChange(row) {
      this.$http({
        url: `users/${row.id}/state/${row.mg_state}`,
        method: "put",
        headers: { Authorization: this.token }
      }).then(res => {
        //console.log(res);
        var { meta } = res.data;
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: "success"
          });
        } else {
          this.error("修改状态失败!!");
        }
      });
    },
    del(id) {
      this.$http({
        url: 'users/' + id,
        method: 'delete',
        headers: { 'Authorization': this.token },
        // params: {
        //   id: row.id,
        // }
      }).then( res=> {
        var { data, meta} =res.data;
        if (meta.status ===200 ){
          this.$message({
            message: meta.msg,
            type: 'success'
          });
           this.getDataList();
        }else{
          this.error(meta.msg)
        }
        
      });
    }
  },
  mounted() {
    this.getDataList();
  }
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