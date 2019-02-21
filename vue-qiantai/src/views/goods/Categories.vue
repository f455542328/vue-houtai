<template>
  <div>
    <!-- 面包屑导航 -->
    <myBreadcrumb
      level1="商品管理"
      level2="商品分类"
    ></myBreadcrumb>
    <!-- 新增按钮 -->
    <el-row>
      <el-col class="el_rowH">
        <el-button
          type="success"
          plain
          @click="add"
        >添加商品分类</el-button>
      </el-col>
    </el-row>
    <!-- 表格区域 -->
    <el-table
      :data="pageData"
      border
      max-height="350"
    >
      <el-table-tree-column
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        file-icon="icon icon-file"
        folder-icon="icon icon-folder"
        prop="cat_name"
        label="分类名称"
        width="300"
      ></el-table-tree-column>
      <el-table-column
        label="级别"
        width="180"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-else-if="scope.row.cat_level===1">二级</span>
          <span v-else-if="scope.row.cat_level===2">三级</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否有效"
        width="180"
      >
        <template slot-scope="scope">
          {{scope.row.cat_deleted === false ? "有效" : "无效"}}
        </template>
      </el-table-column>
      <el-table-column
        label="是否有效"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加浏览器分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加商品分类对话框 -->
    <el-dialog
      title="商品分类"
      :visible.sync="dialogCateVisible"
    >
      <el-form :model="formCateData">
        <el-form-item
          label="分类名称"
          :label-width="formCateWidth"
        >
          <el-input autocomplete="off" v-model="formCateData.name"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="分类名称"
          :label-width="formCateWidth"
        >{{selectedOptions}}
          <!-- 添加级联框 -->
          <el-cascader
          placeholder="默认选择一级分类"
            :options="options"
            :props="obj"
            :change-on-select="true"
            clearable
            v-model="selectedOptions"
          >
          
          </el-cascader>

        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogCateVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitAdd"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ElTreeGrid from "element-tree-grid";
import Vue from "vue";
Vue.component(ElTreeGrid.name, ElTreeGrid);

export default {
  data() {
    return {
      dataList: [],
      pageData: [],
      currentPage: 1,
      pageSizes: [5, 10, 15, 30],
      pageSize: 5,
      total: 0,
      dialogCateVisible: false,
      formCateWidth: "120",
      formCateData: {},
      options: [],
      obj: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      selectedOptions: []
    };
  },
  methods: {
    getDataList() {
      this.$http({
        url: "categories",
        method: "get"
      }).then(res => {
        var { data, meta } = res.data;
        if (meta.status === 200) {
          this.dataList = data;
          this.total = data.length;
          this.getPage();
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
    getPage() {
      let startIndex = (this.currentPage - 1) * this.pageSize;
      let endIndex = this.currentPage * this.pageSize;
      this.pageData = this.dataList.slice(startIndex, endIndex);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPage();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPage();
    },
    handleChange() {},
    add() {
      this.dialogCateVisible = true;
      this.getOptions();
    },
    getOptions() {
      this.$http({
        url: "categories",
        method: "get",
        params: {
          type: 2
        }
      }).then(res => {
        var { data, meta } = res.data;
        if (meta.status === 200) {
          this.options = data; 
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
    submitAdd() {
      var pid = this.selectedOptions.length > 0 ? this.selectedOptions[this.selectedOptions.length - 1] : 0;
      var level = this.selectedOptions.length;
            this.$http({
        url: "categories",
        method: 'post',
        data: {
          cat_pid: pid,
          cat_name: this.formCateData.name,
          cat_level: level
        }
      }).then(res => {
        var { meta } = res.data;
        if (meta.status === 201) {
          this.$message({
            type: 'success',
            message: meta.msg
          });
        } else {
          this.$message.error(meta.msg);
        }
      });
      this.dialogCateVisible = false;
      this.getDataList();
      this.formCateData.name = '';
    },
  },
  created() {
    this.getDataList();
  }
};
</script>

<style scoped>
</style>