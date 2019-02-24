<template>
  <div>
    <!-- 面包屑导航 -->
    <myBreadcrumb
      level1="订单管理"
      level2="订单列表"
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
      </el-col>
    </el-row>
        <!-- 商品表格 -->
        <el-table
          v-loading="loading"
          :data="orderList"
          border
          style="width: 100%;line-height:0px"
        >
          <el-table-column
            type="index"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="order_number"
            label="订单编号"
            width="350"
          >
          </el-table-column>
          <el-table-column
            prop="order_price"
            label="订单价格(元)"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="order_pay"
            label="是否付款"
            width="100"
          >
           <template slot-scope="scope">
              <el-tag
                type="danger"
                v-if="scope.row.order_pay==='0'"
              >未付款</el-tag>
              <el-tag v-else
                type="danger"
              >已付款</el-tag>

            </template>
          </el-table-column>
          <el-table-column
            prop="is_send"
            label="是否发货"
            width="100"
          >
          </el-table-column>
          
          <el-table-column
            label="create_time"
            width="160"
          >
   <template slot-scope="scope">{{scope.row.create_time | myTime}}</template>
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

      <!-- 分页组件 -->
  <el-pagination @size-change="handleSizeChange" @current-change="numChange" :current-page="pagenum" :page-sizes="[10, 20, 30, 40]"
    :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
  </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderList: [],
      loading: true,
      query: "",
      pagenum: 1,
      pagesize: 10,
      total: 0,
    };
  },
  methods: {
        // 分页方法
    handleSizeChange(val) {
      this.pagesize = val;
      this.getOrderList();
    },
    numChange(val) {
      this.pagenum = val;
      this.getOrderList();
    },
        search() {
      this.getOrderList();
    },
    getOrderList() {
      this.$http({
        url: "orders",
        method: "get",
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          user_id:'',
          pay_status:'',
          is_send:'',
          order_fapiao_title:'',
          order_fapiao_company:'',
          order_fapiao_content:'',
          consignee_addr:''
        }
      }).then(res => {
        var { data, meta } = res.data;
        if (meta.status === 200) {
          
          setTimeout(() => {
            this.loading = false;
           this.orderList = data.goods;
            this.total = data.total;
            this.pagenum = data.pagenum * 1;
          }, 1000);
        } else {
          this.$message.error(meta.msg);
        }
      });
    }
  },
  created() {
    this.getOrderList();
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