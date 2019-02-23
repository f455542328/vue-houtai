<template>
  <div>
    <!-- 面包屑导航 -->
    <myBreadcrumb
      level1="商品管理"
      level2="分类参数"
    ></myBreadcrumb>
    <!-- 提示信息 -->
    <el-alert
      class="alertM"
      title="注意:只允许为第三级分类设置相关参数"
      type="info"
      center
      show-icon
    >
    </el-alert>
    <!-- 级联框 -->
    <el-card>
      <span>请选择商品分类</span>
      <span>
        <!-- 添加级联框 -->
        <el-cascader
          placeholder="请选择商品分类"
          :options="options"
          :props="obj"
          clearable
          v-model="selectedOptions"
          @change="change"
        >
        </el-cascader>
      </span>
    </el-card>
    <el-card>
      <!-- tab标签 -->
      <el-tabs
        v-model="active"
        @tab-click="tabClick"
      >
        <el-tab-pane
          label="动态参数"
          name="many"
        >
          <el-button
            size="middle"
            type="primary"
            class="btnM"
            :disabled="disabled"
          >添加动态参数</el-button>
          <!-- 动态参数表格 -->
          <el-table
            :data="dongTai"
            border
            style="width: 100%"
          >
            <el-table-column
              type="expand"
              width="50"
            >
              <template slot-scope="">
                <el-tag>变浅1</el-tag>
                <el-tag>变浅1</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              width="50"
            >
            </el-table-column>
            <el-table-column
              prop="username"
              label="属性名称"
              width="350"
            >
            </el-table-column>
            <el-table-column
              prop="email"
              label="属性值"
            >
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="">
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
        </el-tab-pane>
        <el-tab-pane
          label="静态参数"
          name="only"
        >
          <el-button
            size="middle"
            type="primary"
            class="btnM"
            :disabled="disabled"
          >添加静态参数</el-button>

          <!-- 静态参数表格 -->
          <el-table
            :data="jingTai"
            border
            style="width: 100%"
          >

            <el-table-column
              type="index"
              width="50"
            >
            </el-table-column>
            <el-table-column
              prop="username"
              label="属性名称"
              width="350"
            >
            </el-table-column>
            <el-table-column
              prop="email"
              label="属性值"
              width="250"
            >
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="">
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
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "many",
      options: [],
      obj: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      selectedOptions: [],
      jingTai: [],
      dongTai: [],
      disabled: true
    };
  },
  methods: {
    // 获取级联数据
    getOptions() {
      this.$http({
        url: "categories",
        method: "get",
        params: {
          type: 3
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
    tabClick(e) {},
    change() {
      if (this.selectedOptions.length == 3) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  },
  created() {
    this.getOptions();
  },
};
</script>

<style >
.alertM {
  margin-top: 10px;
  margin-bottom: 10px;
}
.btnM {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>