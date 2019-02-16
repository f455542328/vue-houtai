<template>
  <div>
    <!-- 面包屑导航 -->
    <myBreadcrumb level1="商品管理" level2="商品分类"></myBreadcrumb>
    <!-- 新增按钮 -->
      <el-row>
    <el-col class="el_rowH">
      <el-button type="success" plain >添加角色</el-button>
    </el-col>
  </el-row>
  <!-- 表格区域 -->
  <el-table :data="dataList" border max-height="250">
    <el-table-tree-column 
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        file-icon="icon icon-file" 
        folder-icon="icon icon-folder" 
        prop="cat_name" label="分类名称" width="500"
        ></el-table-tree-column>
    <el-table-column label="级别"   width="180">
      <template slot-scope="scope">
        <span v-if="scope.row.cat_level === 0">一级</span>
        <span v-else-if="scope.row.cat_level===1">二级</span>
        <span v-else-if="scope.row.cat_level===2">三级</span>
      </template>
    </el-table-column>
    <el-table-column label="是否有效"   width="180">
      <template slot-scope="scope">
        {{scope.row.cat_deleted === false ? "有效" : "无效"}}
      </template>
    </el-table-column> 
        <el-table-column label="是否有效"   width="180">
      <template slot-scope="scope">
       <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
      </template>
    </el-table-column> 
</el-table>
  </div>
</template>

<script>
import ElTreeGrid from 'element-tree-grid';
import Vue from 'vue';
Vue.component(ElTreeGrid.name,ElTreeGrid)

  export default {
    data() {
      return {
        dataList: [],
      }
    },
    methods: {
      getDataList() {
        this.$http({
          url: 'categories',
          type: 'get'
        }).then( res => {
          var {data,meta} = res.data;
          if(meta.status ===200 ){
            this.dataList=data;
          }else{
            this.$message.error('meta.msg')
          };
        });
      }
    },
    created() {
      this.getDataList();
    },

  }
</script>

<style scoped>

</style>