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
      <el-tabs v-model="active">
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
            :data="dongtaiParams"
            border
            style="width: 100%"
          >
            <el-table-column
              type="expand"
              width="50"
            >
              <template slot-scope="scope">
                <p>{{scope.row}}</p>
                <el-tag
                  closable
                  @close="handleClose(scope.row,item)"
                  class="tagM"
                  v-for="(item,index) in scope.row.attr_vals"
                  :key="index"
                >
                  {{item}}
                </el-tag>

                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                >+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              width="50"
            >
            </el-table-column>
            <el-table-column
              prop="attr_name"
              label="商品参数"
              width="350"
            >
            </el-table-column>
            <el-table-column label="操作">
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
            :data="jingtaiParams"
            border
            style="width: 100%"
          >

            <el-table-column
              type="index"
              width="50"
            >
            </el-table-column>
            <el-table-column
              prop="attr_name"
              label="属性名称"
              width="350"
            >
            </el-table-column>
            <el-table-column
              prop="attr_vals"
              label="属性值"
              width="250"
            >
            </el-table-column>
            <el-table-column label="操作">
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
      jingtaiParams: [],
      dongtaiParams: [],
      disabled: true,
      inputValue: "",
      inputVisible: false
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
    change() {
      if (this.selectedOptions.length == 3) {
        this.disabled = false;
        this.$http({
          url: `categories/${this.selectedOptions[2]}/attributes`,
          method: "get",
          params: {
            sel: "many"
          }
        }).then(res => {
          let { data, meta } = res.data;
          if (meta.status === 200) {
            this.dongtaiParams = data;
            //将获取的数据对象中的attr.vals进行分割为数组
            for (let i = 0; i < this.dongtaiParams.length; i++) {
              if (this.dongtaiParams.length !== 0) {
                this.dongtaiParams[i].attr_vals = this.dongtaiParams[
                  i
                ].attr_vals.split(",");
              }
            }
            // console.log(data)
          } else {
            this.$message.error(meta.msg);
          }
        });

        //获取静态参数
        if (this.selectedOptions.length > 0) {
          this.$http({
            url: `categories/${
              this.selectedOptions[this.selectedOptions.length - 1]
            }/attributes`,
            method: "get",
            params: {
              sel: "only"
            }
          }).then(res => {
            let { data, meta } = res.data;
            if (meta.status === 200) {
              this.jingtaiParams = data;
              // console.log(data);
            } else {
              this.$message.error(meta.msg);
            }
          });
        } else {
          this.$message.error("请选择分类");
        }
      } else {
        this.disabled = true;
      }
    },
    handleClose(row, item) {
      console.log(item);
      row.attr_vals.splice(row.attr_vals.indexOf(item), 1);
      this.updateAttrVal(row);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //更新属性
    updateAttrVal(row) {
      this.$http({
        url: `categories/${this.selectedOptions[2]}/attributes/${row.attr_id}`,
        method: "put",
        data: {
          attr_name: row.attr_name,
          attr_sel: "many",
          attr_vals: row.attr_vals.join(",")
        }
      }).then(res => {
        let { meta } = res.data;
        if (meta.status === 200) {
          this.$message({
            type: "success",
            message: meta.msg
          });
        } else {
          this.$message.error(meta.msg);
        }
      });
    },

    handleInputConfirm(row) {
      let inputValue = this.inputValue;
      if (inputValue) {
        row.attr_vals.push(inputValue);
        this.updateAttrVal(row);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  },
  created() {
    this.getOptions();
  }
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

.el-tag + .el-tag {
  margin-bottom: 10px;
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>