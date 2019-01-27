<template>
  <div>
      <!-- 面包屑导航 -->
  <el-card>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
  </el-card>
  <!-- 添加角色按钮 -->
  <el-row>
    <el-col class="el_rowH">
      <el-button type="success" plain @click="addRoles">添加角色</el-button>
    </el-col>
  </el-row>

  <!-- 表格区域 -->
    <el-table :data="rolesList" border style="width: 100%;line-height:0px">
    <el-table-column type="expand" width="50">
      <template slot-scope="scope">
        <!-- 遍历一级权限 -->
        <el-row class="sRow" v-for="(item1, index1) in scope.row.children" :key="item1.id">
          <el-col :span="4">
            <el-tag   @close="handleClose(scope.row,index1,scope.row.id, item1.id)" type="success" closable>{{item1.authName}}</el-tag>
          </el-col>
          <el-col :span="20">
            <!-- 遍历二级权限 -->
            <el-row v-for="(item2, index2) in item1.children" :key="item2.id">
              <el-col :span="4">
                <el-tag  @close="handleClose(item1,index2,scope.row.id, item2.id)"  closable>{{item2.authName}}</el-tag>
              </el-col>
              <el-col :span="20">
                <el-tag @close="handleClose(item2,index3,scope.row.id, item3.id)" type="danger" class="sTag" closable v-for="(item3, index3) in item2.children" :key="item3.id">{{item3.authName}}</el-tag>
                </el-col>
            </el-row>
          </el-col>
        </el-row>     
        <el-row v-if="scope.row.children.length <=0">
           <template><h5>您还没有给当前角色设置权限</h5></template>
        </el-row>
      </template>    
    </el-table-column>
    <el-table-column type="index" width="50">
    </el-table-column>
    <el-table-column prop="roleName" label="角色名称" width="280">
    </el-table-column>
    <el-table-column prop="roleDesc" label="角色描述" width="280">
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" size="mini" plain ></el-button>
        <el-button  type="danger" icon="el-icon-delete" size="mini" plain></el-button>
        <el-button  type="success" icon="el-icon-check" size="mini" plain></el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  export default {
        data() {
      return {
        rolesList: [],

      }
    },
    methods: {
      getRolesList() {
        this.$http({
          url: 'roles',
          method: 'get'
        })
        .then(res =>{
          var {data, meta} = res.data;
          if( meta.status === 200){
            this.rolesList = data;
            //console.log(data)
          }else{
            this.$message.error(meta.msg)
          };
        });
      },
      handleClose(item,index,rid,rightId) {
        item.children.splice(index,1);
        this.$http({
          url: `roles/${rid}/rights/${rightId}`,
          method: 'delete'
        }).then(res => {
          var {meta} = res.data;
          if(meta.status ===200 ){
            this.$message({
              type: 'success',
              message: meta.msg
            })
          }else{
            this.$message.error(meta.msg)
          }
        });
      },

      addRoles() {},
    },
    created() {
      this.getRolesList();
    },
  }
</script>

<style scoped>
  .sRow{
    margin: 0px 10px 5px 5px;
  }
  .sTag{
     margin: 0px 10px 5px 5px;
  }
</style>