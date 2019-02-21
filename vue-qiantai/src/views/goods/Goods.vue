<template>
  <div>
    <!-- 面包屑导航 -->
    <myBreadcrumb
      level1="商品管理"
      level2="商品列表"
    ></myBreadcrumb>

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
          ></el-button>
        </el-input>
        <el-button
          type="success"
          plain
        >添加商品</el-button>
        <!-- 商品表格 -->
        <el-table
          v-loading="loading"
          :data="dataList"
          border
          style="width: 100%;line-height:0px"
        >
          <el-table-column
            type="index"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="商品名称"
            width="350"
          >
          </el-table-column>
          <el-table-column
            prop="goods_price"
            label="商品价格(元)"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="goods_weight"
            label="商品重量"
            width="100"
          >
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="160"
          >
   <template slot-scope="scope">{{scope.row.add_time | myTime}}</template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="130"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                plain
                @click="edit(scope.row)"
              ></el-button>
              <el-button
                @click="del(scope.row.id)"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                plain
              ></el-button>

            </template>
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      loading: true,
      query: "",
      pagenum: 1,
      pagesize: 10
    };
  },
  methods: {
    getGoodsList() {
      this.$http({
        url: "goods",
        method: "get",
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      }).then(res => {
        var { data, meta } = res.data;
        if (meta.status === 200) {
          
          setTimeout(() => {
            this.loading = false;
           this.dataList = data.goods;
            this.total = data.total;
          }, 1000);
        } else {
          this.$message.error(meta.msg);
        }
      });
    }
  },
  created() {
    this.getGoodsList();
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