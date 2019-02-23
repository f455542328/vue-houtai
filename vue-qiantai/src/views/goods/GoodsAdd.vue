<template>
  <div>
    <!-- 面包屑导航 -->
    <myBreadcrumb
      level1="商品管理"
      level2="商品添加"
    ></myBreadcrumb>
    <!-- 提示信息 -->
    <el-alert
      class="alertM"
      title="添加商品信息"
      type="info"
      center
      show-icon
    >
    </el-alert>
    <!-- 步骤条 -->
    <el-steps
      :active="active"
      align-center
      finish-status="success"
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>

    <!-- tab标签页 -->
    <el-tabs
      tab-position="left"
      @tab-click="tabclick"
    >
      <el-tab-pane label="基本信息">
        <!-- 基本信息表单 -->
        <el-form
          label-position="top"
          label-width="80px"
          :model="goodsInfo"
        >
          <el-form-item label="商品名称">
            <el-input v-model="goodsInfo.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="goodsInfo.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="goodsInfo.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="goodsInfo.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品类别">
            <!-- 添加级联框 -->
            <el-cascader
              placeholder="默认选择一级分类"
              :options="options"
              :props="obj"
              clearable
              v-model="selectedOptions"
            >
            </el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数">
        <div
          v-for="item in dongtaiParams"
          :key="item.attr_id"
        >
          <p>{{ item.attr_name }}</p>
          <div v-if="item.attr_vals.length !==0">
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox
                v-for="(item1,index) in item.attr_vals"
                :key="index"
                :label="item1"
              ></el-checkbox>
            </el-checkbox-group>

          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品属性">
        <el-form
          label-position="top"
          label-width="80px"
          :model="goodsInfo"
        >
          <el-form-item
            :label="item.attr_name"
            v-for="item in jingtaiParams"
            :key="item.attr_id"
          >
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片">
        <!-- 上传图片代码 -->
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          :headers="headerObj"
          :on-success="uploadSuccess"
          :on-preview="preview"
          :on-remove="remove"
          list-type="picture"
        >
          <el-button
            size="small"
            type="primary"
          >点击上传</el-button>
        </el-upload>
        <!-- 点击图片时打开对话框 -->
        <el-dialog
          title="提示"
          :visible.sync="dialogImgVisible"
        >
          <h2>图片详情</h2>
          <p>图片名称:{{imgInfo.name}}</p>
          <p>图片大小:{{imgInfo.size}}Kb</p>
          <!-- <p>图片类型:{{imgInfo.raw.type}}</p> -->
          <!-- <p>拍摄时间:{{imgInfo.raw.lastModifiedDate}}</p> -->
          <!-- <p>图片网络地址:{{imgInfo.res.data.url}}</p> -->
          <img
            id="goodsImg"
            src=""
            alt=""
          >
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="dialogImgVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="dialogImgVisible = false"
            >确 定</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="商品内容">
        <!-- 富文本编辑器 -->
        <quill-editor
          v-model="goodsInfo.goods_introduce"
          ref="myQuillEditor"
          :options="editorOption"
        >
        </quill-editor>
        <el-button
          size="big"
          type="success"
          @click="addObj"
        >点击提交所有商品数据</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
//引入富文本编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      active: 1,
      goodsInfo: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: [],
        attrs: []
      },
      options: [],
      obj: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      selectedOptions: [],
      dongtaiParams: {},
      jingtaiParams: {},
      headerObj: {
        Authorization: window.localStorage.getItem("token")
      },
      dialogImgVisible: false,
      imgInfo: {},
      editorOption: {}
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
    // 标签点击事件
    tabclick(e) {
      this.active = e.index * 1;
      //获取商品动态参数
      if (e.index === "1") {
        if (this.selectedOptions.length > 0) {
          this.$http({
            url: `categories/${
              this.selectedOptions[this.selectedOptions.length - 1]
            }/attributes`,
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
        } else {
          this.$message.error("请选择分类");
        }
      }
      //获取商品静态参数
      if (e.index === "2") {
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
      }
    },
    uploadSuccess(res, file, fileList) {
      let { data, meta } = res;
      // console.log(res);
      if (meta.status === 200) {
        this.goodsInfo.pics.push({
          'pic': data.tmp_path
        });
        console.log(this.goodsInfo.pics);
      } else {
        this.$message.error(meta.msg);
      }
    },
    preview(file) {
      // console.log(file);
      this.imgInfo = file;
      this.imgInfo.raw = file.raw;
      // console.log(file.raw);
      // console.log(this.imgInfo.raw.name);
      this.imgInfo.res = file.response;
      this.dialogImgVisible = true;
      document.querySelector("#goodsImg").src = file.response.data.url;
    },
    remove(file) {
      let index = this.goodsInfo.pics.findIndex(item => {
        return item.pic === file.response.data.tem_path;
      });
      this.goodsInfo.pics.splice(index, 1);
    },
    addObj() {
      // 将分类id数组进行以逗号分隔的字符串转换
      this.goodsInfo.goods_cat = this.selectedOptions.join(",");

      let newDongtai = [];
      for (var i = 0; i < this.dongtaiParams.length; i++) {
        newDongtai.push({
          attr_id: this.dongtaiParams[i].attr_id,
          attr_vals:
            this.dongtaiParams[i].attr_vals.length > 0
              ? this.dongtaiParams[i].attr_vals.join(',')
              : ''
        });
      }
      let newJingtai = [];
      for (var j = 0; j < this.jingtaiParams.length; j++) {
        newJingtai.push({
          attr_id: this.jingtaiParams[j].attr_id,
          attr_vals:
            this.jingtaiParams[j].attr_vals
        });
      };

      this.goodsInfo.attrs = newDongtai.concat(newJingtai);

      this.$http({
        url: 'goods',
        method: 'post',
        data: this.goodsInfo
      }).then( res => {
        let {meta} = res.data;
        if(meta.status ===201 ){
          this.$message({
            type: 'success',
            message: meta.msg
          });
          this.$router.push({name: 'goods'});
        }else{
          this.$message.error(meta.msg);
        };
      });
    },
    // onEditorBlur(quill) {
    //   console.log("editor blur!", quill);
    // },
    // onEditorFocus(quill) {
    //   console.log("editor focus!", quill);
    // },
    // onEditorReady(quill) {
    //   console.log("editor ready!", quill);
    // },
    // onEditorChange({ quill, html, text }) {
    //   console.log("editor change!", quill, html, text);
    //   this.goodsInfo.goods_introduce = html;
    // }
  },
  created() {
    this.getOptions();
  },
  components: {
    quillEditor
  }
};
</script>

<style>
.alertM {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-step__title {
  font-size: 12px;
}
#goodsImg {
  width: 100%;
}
.ql-editor {
  height: 350px;
}
</style>