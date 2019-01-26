<template>
  <div>
    <!-- 面包屑导航 -->
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">权限管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <!-- 权限列表表格 -->
    <el-table
      v-loading="loading"
      :data="dataList"
      height="500"
      border
      style="width: 100%;line-height:0px"
    >
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="level"
        label="层级"
      >
      <template slot-scope="scope">
        <span v-if="scope.row.level === '0' ">一级</span>
        <span v-else-if="scope.row.level === '1'">二级</span>
        <span v-else-if="scope.row.level === '2'">三级</span>
      </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="numChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 20]"
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
      dataList:[],
      token: window.localStorage.getItem("token"),
      pagenum: 1,
      pagesize: 10,
      total: 0,
      loading: true
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
        url: 'rights/list',
        method: 'get',
        headers: { Authorization: this.token }
      })
      .then( res => {
        var {meta ,data} = res.data;
        if( meta.status ===200 ){
          this.dataList= data;
          //console.log(this.dataList.length)
          this.loading = false;
          this.total = this.dataList.length;
        }else{
          this.$message.error(meta.msg)
        };
      })
    }
  },
  mounted() {
    
  },
  created() {
    this.getDataList();
  },
};
</script>

<style scoped>
</style>